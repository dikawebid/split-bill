import React from 'react';
import { PercentIcon, DollarSign } from 'lucide-react';
import { useBillContext } from '../context/BillContext';

const DiscountSection: React.FC = () => {
  const { discount, updateDiscount } = useBillContext();

  const handleTypeChange = (type: 'percentage' | 'fixed') => {
    updateDiscount(type, discount.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    updateDiscount(discount.type, value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800">Discount</h3>
      
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <button
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              discount.type === 'percentage'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            }`}
            onClick={() => handleTypeChange('percentage')}
          >
            <PercentIcon size={16} />
            <span>Percentage</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              discount.type === 'fixed'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            }`}
            onClick={() => handleTypeChange('fixed')}
          >
            <DollarSign size={16} />
            <span>Fixed Amount</span>
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-full max-w-xs">
          <div className="relative">
            {discount.type === 'fixed' && (
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
            )}
            <input
              type="number"
              min="0"
              step={discount.type === 'percentage' ? '1' : '0.01'}
              value={discount.value || ''}
              onChange={handleValueChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                discount.type === 'fixed' ? 'pl-7' : ''
              }`}
            />
            {discount.type === 'percentage' && (
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                %
              </span>
            )}
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          {discount.type === 'percentage'
            ? 'Enter discount percentage'
            : 'Enter discount amount'}
        </div>
      </div>
    </div>
  );
};

export default DiscountSection;