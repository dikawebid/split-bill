import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { BillItem, Person, Discount, CalculationSummary, ShippingCost, ItemAssignment, OtherFeeCost } from '../types';
import { calculateBill } from '../utils/calculations';

interface BillContextType {
  items: BillItem[];
  people: Person[];
  assignments: ItemAssignment[];
  discount: Discount;
  shipping: ShippingCost;
  otherFee: OtherFeeCost;
  addItem: (name: string, price: number) => void;
  removeItem: (id: string) => void;
  addPerson: (name: string) => void;
  removePerson: (id: string) => void;
  updateDiscount: (type: 'percentage' | 'fixed', value: number, forType: 'person' | 'item') => void;
  updateShipping: (amount: number) => void;
  updateOtherFee: (amount: number) => void;
  togglePaid: (id: string) => void;
  assignItem: (itemId: string, personId: string, quantity: number) => void;
  removeAssignment: (itemId: string, personId: string) => void;
  updateQuantity: (itemId: string, personId: string, quantity: number) => void;
  getSummary: () => CalculationSummary;
  reset: () => void;
}

const STORAGE_KEY = 'splitwise_data';

interface StorageData {
  items: BillItem[];
  people: Person[];
  assignments: ItemAssignment[];
  discount: Discount;
  shipping: ShippingCost;
  otherFee: OtherFeeCost;
}

const loadFromStorage = (): StorageData | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

const saveToStorage = (data: StorageData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const BillContext = createContext<BillContextType | undefined>(undefined);

export const useBillContext = () => {
  const context = useContext(BillContext);
  if (!context) {
    throw new Error('useBillContext must be used within a BillProvider');
  }
  return context;
};

export const BillProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storedData = loadFromStorage();
  
  const [items, setItems] = useState<BillItem[]>(storedData?.items || []);
  const [people, setPeople] = useState<Person[]>(storedData?.people || []);
  const [assignments, setAssignments] = useState<ItemAssignment[]>(storedData?.assignments || []);
  const [discount, setDiscount] = useState<Discount>(storedData?.discount || { type: 'percentage', value: 0, forType: 'person' });
  const [shipping, setShipping] = useState<ShippingCost>(storedData?.shipping || { amount: 0 });
  const [otherFee, setOtherFee] = useState<OtherFeeCost>(storedData?.otherFee || { amount: 0 });

  useEffect(() => {
    saveToStorage({ items, people, assignments, discount, shipping, otherFee });
  }, [items, people, assignments, discount, shipping, otherFee]);

  const addItem = (name: string, price: number) => {
    const newItem: BillItem = {
      id: crypto.randomUUID(),
      name,
      price,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    setAssignments(assignments.filter(a => a.itemId !== id));
  };

  const addPerson = (name: string) => {
    const newPerson: Person = {
      id: crypto.randomUUID(),
      name,
      paid: false,
    };
    setPeople([...people, newPerson]);
  };

  const removePerson = (id: string) => {
    setPeople(people.filter(person => person.id !== id));
    setAssignments(assignments.filter(a => a.personId !== id));
  };

  const togglePaid = (id: string) => {
    setPeople(people.map(person => 
      person.id === id ? { ...person, paid: !person.paid } : person
    ));
  };

  const assignItem = (itemId: string, personId: string, quantity: number) => {
    const existingAssignment = assignments.find(
      a => a.itemId === itemId && a.personId === personId
    );

    if (existingAssignment) {
      updateQuantity(itemId, personId, quantity);
    } else {
      setAssignments([...assignments, { itemId, personId, quantity }]);
    }
  };

  const removeAssignment = (itemId: string, personId: string) => {
    setAssignments(assignments.filter(
      a => !(a.itemId === itemId && a.personId === personId)
    ));
  };

  const updateQuantity = (itemId: string, personId: string, quantity: number) => {
    setAssignments(assignments.map(assignment =>
      assignment.itemId === itemId && assignment.personId === personId
        ? { ...assignment, quantity }
        : assignment
    ));
  };

  const updateDiscount = (type: 'percentage' | 'fixed', value: number, forType: 'person' | 'item') => {
    setDiscount({ type, value, forType });
  };

  const updateShipping = (amount: number) => {
    setShipping({ amount });
  };

  const updateOtherFee = (amount: number) => {
    setOtherFee({ amount });
  };

  const getSummary = (): CalculationSummary => {
    return calculateBill(items, assignments, people, discount, shipping, otherFee);
  };

  const reset = () => {
    setItems([]);
    setPeople([]);
    setAssignments([]);
    setDiscount({ type: 'percentage', value: 0, forType: 'person' });
    setShipping({ amount: 0 });
    setOtherFee({ amount: 0 });
    localStorage.removeItem(STORAGE_KEY);
  };

  const value: BillContextType = {
    items,
    people,
    assignments,
    discount,
    shipping,
    otherFee,
    addItem,
    removeItem,
    addPerson,
    removePerson,
    updateDiscount,
    updateShipping,
    updateOtherFee,
    togglePaid,
    assignItem,
    removeAssignment,
    updateQuantity,
    getSummary,
    reset,
  };

  return <BillContext.Provider value={value}>{children}</BillContext.Provider>;
};