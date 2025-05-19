import React from 'react';
import BillSplitter from './components/BillSplitter';
import { BillProvider } from './context/BillContext';
import { Receipt } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto p-4 flex items-center gap-2">
          <Receipt size={24} />
          <h1 className="text-xl font-bold">DK SplitBill</h1>
        </div>
      </header>
      
      <main className="py-8">
        <BillProvider>
          <BillSplitter />
        </BillProvider>
      </main>
      
      <footer className="bg-gray-100 border-t border-gray-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          DK SplitBill - Split your bills easily with friends
        </div>
      </footer>
    </div>
  );
}

export default App;