import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useBillContext } from '../context/BillContext';
import { BillItemForm, BillItemList } from './BillItem';
import { PersonForm, PersonList } from './PersonList';
import DiscountSection from './DiscountSection';
import ShippingSection from './ShippingSection';
import OtherFeeSection from './OtherFeeSection';
import Summary from './Summary';

const BillSplitter: React.FC = () => {
  const { addItem, addPerson, reset } = useBillContext();

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Split Bill</h1>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <RefreshCw size={16} />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Items</h2>
            <BillItemForm onAdd={addItem} />
            <BillItemList className="mt-4" />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">People</h2>
            <PersonForm onAdd={addPerson} />
            <PersonList className="mt-4" />
          </div>
        </div>

        <div>
          <div className="space-y-4">
            <DiscountSection />
            <ShippingSection />
            <OtherFeeSection />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 my-4">Summary</h2>
            <Summary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillSplitter;