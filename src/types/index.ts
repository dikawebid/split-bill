export interface BillItem {
  id: string;
  name: string;
  price: number;
}

export interface ItemAssignment {
  itemId: string;
  personId: string;
  quantity: number;
}

export interface Person {
  id: string;
  name: string;
  paid: boolean;
}

export interface Discount {
  type: 'percentage' | 'fixed';
  value: number;
}

export interface ShippingCost {
  amount: number;
}

export interface PersonSummary {
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    total: number;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export interface CalculationSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  perPersonBreakdown: Record<string, PersonSummary>;
}

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  personName: string;
  items: PersonSummary['items'];
}