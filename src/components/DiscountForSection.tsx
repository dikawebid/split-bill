import React from 'react';
import { User, Container } from 'lucide-react';
import { useBillContext } from '../context/BillContext';

const DiscountForSection: React.FC = () => {
  const { discount, updateDiscount } = useBillContext();

  const handleForChange = (forType: 'person' | 'item') => {
    updateDiscount(discount.type, discount.value, forType);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800">Discount For</h3>
      
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <button
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              discount.forType === 'person'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            }`}
            onClick={() => handleForChange('person')}
          >
            <User size={16} />
            <span>Person</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              discount.forType === 'item'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            }`}
            onClick={() => handleForChange('item')}
          >
            <Container size={16} />
            <span>Item</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountForSection;