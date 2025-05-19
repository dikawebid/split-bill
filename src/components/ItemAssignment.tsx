import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useBillContext } from '../context/BillContext';
import { formatCurrency } from '../utils/calculations';

interface ItemAssignmentProps {
  itemId: string;
  personId: string;
}

const ItemAssignment: React.FC<ItemAssignmentProps> = ({ itemId, personId }) => {
  const { items, assignments, updateQuantity, removeAssignment } = useBillContext();
  
  const item = items.find(i => i.id === itemId);
  const assignment = assignments.find(
    a => a.itemId === itemId && a.personId === personId
  );

  if (!item || !assignment) return null;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, assignment.quantity + delta);
    updateQuantity(itemId, personId, newQuantity);
  };

  return (
    <div className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-100">
      <div className="flex-1">
        <div className="font-medium">{item.name}</div>
        <div className="text-sm text-gray-500">
          {formatCurrency(item.price)} × {assignment.quantity} = {formatCurrency(item.price * assignment.quantity)}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(-1)}
          className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Minus size={16} />
        </button>
        
        <span className="w-8 text-center">{assignment.quantity}</span>
        
        <button
          onClick={() => handleQuantityChange(1)}
          className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Plus size={16} />
        </button>
        
        <button
          onClick={() => removeAssignment(itemId, personId)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ItemAssignment;