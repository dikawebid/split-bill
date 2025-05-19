import React, { useState } from 'react';
import { useBillContext } from '../context/BillContext';
import { formatCurrency } from '../utils/calculations';
import { AlertTriangle, CreditCard } from 'lucide-react';
import PaymentModal from './PaymentModal';

const Summary: React.FC = () => {
  const { items, people, getSummary, togglePaid } = useBillContext();
  const summary = getSummary();
  const [selectedPerson, setSelectedPerson] = useState<{ id: string; name: string; summary: PersonSummary } | null>(null);

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="text-center text-gray-500">
          <p>Add items to see bill summary</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Bill Summary</h3>
        
        <div className="space-y-2 border-b border-gray-100 pb-4 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">{formatCurrency(summary.subtotal)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Discount:</span>
            <span className="font-medium text-emerald-600">-{formatCurrency(summary.discount)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Shipping:</span>
            <span className="font-medium">{formatCurrency(summary.shipping)}</span>
          </div>
          
          <div className="flex justify-between pt-2">
            <span className="font-medium">Total:</span>
            <span className="font-semibold text-lg">{formatCurrency(summary.total)}</span>
          </div>
        </div>

        {people.length === 0 ? (
          <div className="flex items-center gap-2 bg-amber-50 text-amber-800 p-3 rounded-md">
            <AlertTriangle size={18} />
            <span>Add people to see per-person amounts</span>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {people.map((person) => {
              const personSummary = summary.perPersonBreakdown[person.id];
              
              return (
                <div 
                  key={person.id} 
                  className={`bg-white p-4 rounded-lg border ${
                    person.paid ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200'
                  } shadow-sm`}
                >
                  <h4 className="font-medium text-gray-800 mb-2">{person.name}</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-3">
                    {formatCurrency(personSummary.total)}
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-3">
                    {personSummary.items.length} items
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedPerson({
                          id: person.id,
                          name: person.name,
                          summary: personSummary
                        });
                      }}
                      className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <CreditCard size={16} />
                      Pay Now
                    </button>
                    <button
                      onClick={() => togglePaid(person.id)}
                      className={`px-3 py-2 rounded-md transition-colors ${
                        person.paid
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {person.paid ? 'Paid' : 'Mark Paid'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedPerson && (
        <PaymentModal
          isOpen={true}
          onClose={() => setSelectedPerson(null)}
          amount={selectedPerson.summary.total}
          personName={selectedPerson.name}
          items={selectedPerson.summary.items}
          discount={selectedPerson.summary.discount}
          shippingCost={selectedPerson.summary.shipping}
        />
      )}
    </div>
  );
};

export default Summary;