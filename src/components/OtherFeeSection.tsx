import React from 'react';
import { HandCoins } from 'lucide-react';
import { useBillContext } from '../context/BillContext';
import { formatCurrency } from '../utils/calculations';

const OtherFeeSection: React.FC = () => {
  const { otherFee, updateOtherFee } = useBillContext();

  const handleOtherFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    updateOtherFee(value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800">Other Fee Cost</h3>
      
      <div className="flex items-center gap-2">
        <div className="w-full max-w-xs">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              Rp
            </span>
            <input
              type="number"
              min="0"
              step="1000"
              value={otherFee.amount || ''}
              onChange={handleOtherFeeChange}
              className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <HandCoins size={20} className="text-gray-500" />
      </div>
    </div>
  );
}

export default OtherFeeSection;