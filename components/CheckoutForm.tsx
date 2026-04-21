// /components/CheckoutForm.tsx
import { useState } from 'react';

interface CheckoutProps {
  onProceed: (details: any) => void;
}

export default function CheckoutForm({ onProceed }: CheckoutProps) {
  const [customerDetails, setCustomerDetails] = useState({
    name: '', phone: '', city: '', address: ''
  });

  return (
    <div className="bg-[#0f172a] border border-gray-700 p-6 rounded-lg w-full max-w-md mx-auto mt-10">
      <h3 className="text-white text-xl font-bold mb-4 uppercase">Delivery Details</h3>
      
      <div className="flex flex-col gap-4">
        <input 
          className="bg-transparent border border-gray-600 p-3 text-white rounded outline-none focus:border-orange-500"
          placeholder="Full Name (Residence)" 
          onChange={e => setCustomerDetails({...customerDetails, name: e.target.value})} 
        />
        <input 
           className="bg-transparent border border-gray-600 p-3 text-white rounded outline-none focus:border-orange-500"
          placeholder="Phone Number" 
          onChange={e => setCustomerDetails({...customerDetails, phone: e.target.value})} 
        />
        <input 
           className="bg-transparent border border-gray-600 p-3 text-white rounded outline-none focus:border-orange-500"
          placeholder="City" 
          onChange={e => setCustomerDetails({...customerDetails, city: e.target.value})} 
        />
        
        <button 
          className="mt-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-3 px-4 rounded transition-transform active:scale-95"
          onClick={() => onProceed(customerDetails)}
        >
          PROCEED TO SECURE DEPOSIT
        </button>
      </div>
    </div>
  );
}