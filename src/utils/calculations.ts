import { BillItem, Discount, CalculationSummary, ShippingCost, ItemAssignment, Person } from '../types';

export const calculateBill = (
  items: BillItem[],
  assignments: ItemAssignment[],
  people: Person[],
  discount: Discount,
  shipping: ShippingCost
): CalculationSummary => {
  const itemMap = new Map(items.map(item => [item.id, item]));
  const perPersonBreakdown: CalculationSummary['perPersonBreakdown'] = {};

  // Initialize person summaries
  people.forEach(person => {
    perPersonBreakdown[person.id] = {
      items: [],
      subtotal: 0,
      discount: 0,
      shipping: 0,
      total: 0
    };
  });

  // Calculate individual items and subtotals
  assignments.forEach(assignment => {
    const item = itemMap.get(assignment.itemId);
    if (!item) return;

    const personSummary = perPersonBreakdown[assignment.personId];
    if (!personSummary) return;

    const itemTotal = item.price * assignment.quantity;
    personSummary.items.push({
      name: item.name,
      price: item.price,
      quantity: assignment.quantity,
      total: itemTotal
    });
    personSummary.subtotal += itemTotal;
  });

  // Calculate totals
  const subtotal = Object.values(perPersonBreakdown).reduce(
    (sum, person) => sum + person.subtotal,
    0
  );

  // Calculate discount
  let totalDiscount = 0;
  if (discount.type === 'percentage') {
    totalDiscount = subtotal * (discount.value / 100);
  } else {
    totalDiscount = discount.value;
  }
  totalDiscount = Math.min(totalDiscount, subtotal);

  // Calculate shipping per person
  const shippingPerPerson = shipping.amount / people.length;

  // Apply discount and shipping to each person proportionally
  Object.values(perPersonBreakdown).forEach(summary => {
    const discountRatio = summary.subtotal / subtotal;
    summary.discount = totalDiscount * discountRatio;
    summary.shipping = shippingPerPerson;
    summary.total = summary.subtotal - summary.discount + summary.shipping;
  });

  return {
    subtotal,
    discount: totalDiscount,
    shipping: shipping.amount,
    total: subtotal - totalDiscount + shipping.amount,
    perPersonBreakdown
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};