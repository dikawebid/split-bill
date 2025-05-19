import React, { useEffect, useState } from 'react';
import { QrCode } from 'lucide-react';
import { PaymentModalProps } from '../types';
import { formatCurrency } from '../utils/calculations';
import { QRIS, SourceType } from 'modify-qris';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, amount, personName, items }) => {
  if (!isOpen) return null;

  const [qrisBase64, setQrisBase64] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const qris = new QRIS({
        sourceType: SourceType.CODE,
        sourceValue: process.env.REACT_APP_QRIS_CODE,
        amount: amount, 
      });
    
      const qrBase64 = await qris.generateQRBase64();
      setQrisBase64(qrBase64);
      console.log('qrBase64', qrBase64);
    }
    fetchData();
  }, [isOpen]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Payment QR Code</h3>
          <p className="text-gray-600 mb-2">Amount to pay:</p>
          <p className="text-2xl font-bold text-blue-600 mb-4">{formatCurrency(amount)}</p>
          <p className="text-gray-600 mb-4">For: {personName}</p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
            <h4 className="font-medium text-gray-700 mb-2">Items:</h4>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{formatCurrency(item.total)}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-100 p-8 rounded-lg mb-6 flex items-center justify-center">
            {/* <QrCode size={180} className="text-gray-800" /> */}
            {qrisBase64 && <>
              <img src={qrisBase64} size={180} />
            </>}
          </div>
          
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;