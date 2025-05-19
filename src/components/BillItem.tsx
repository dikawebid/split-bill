import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useBillContext } from '../context/BillContext';
import { formatCurrency } from '../utils/calculations';

interface BillItemFormProps {
  onAdd: (name: string, price: number) => void;
}

export const BillItemForm: React.FC<BillItemFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Item name is required');
      return;
    }
    
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      setError('Please enter a valid price');
      return;
    }

    onAdd(name, priceValue);
    setName('');
    setPrice('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-32">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

interface BillItemListProps {
  className?: string;
}

export const BillItemList: React.FC<BillItemListProps> = ({ className = '' }) => {
  const { items, removeItem } = useBillContext();

  if (items.length === 0) {
    return (
      <div className={`text-center py-6 text-gray-500 ${className}`}>
        No items added yet. Add some items to get started.
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm border border-gray-100"
        >
          <span className="font-medium">{item.name}</span>
          <div className="flex items-center gap-4">
            <span>{formatCurrency(item.price)}</span>
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};