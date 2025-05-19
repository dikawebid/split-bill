import React from 'react';
import { Plus } from 'lucide-react';
import { useBillContext } from '../context/BillContext';
import { formatCurrency } from '../utils/calculations';

interface ItemSelectorProps {
  personId: string;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({ personId }) => {
  const { items, assignments, assignItem } = useBillContext();
  
  const unassignedItems = items.filter(item => 
    !assignments.some(a => a.itemId === item.id && a.personId === personId)
  );

  if (unassignedItems.length === 0) return null;

  return (
    <div className="mt-2">
      <div className="text-sm text-gray-500 mb-2">Add items:</div>
      <div className="flex flex-wrap gap-2">
        {unassignedItems.map(item => (
          <button
            key={item.id}
            onClick={() => assignItem(item.id, personId, 1)}
            className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition-colors"
          >
            <Plus size={14} />
            <span>{item.name}</span>
            <span className="text-gray-500">({formatCurrency(item.price)})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ItemSelector;