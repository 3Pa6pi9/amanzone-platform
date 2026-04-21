'use client';
import { useState } from 'react';

export default function CheckoutForm({ total, onComplete }: { total: number, onComplete: (data: any) => void }) {
  const [details, setDetails] = useState({ name: '', phone: '', city: '', address: '' });

  return (
    <div className="bg-[#111] p-6 rounded-lg border border-gray-800 shadow-2xl">
      <h2 className="text-white font-bold text-xl mb-4">DELIVERY DETAILS</h2>
      <div className="space-y-3">
        <input className="w-full bg-black border border-gray-700 p-3 text-white rounded" placeholder="Your Name" onChange={e => setDetails({...details, name: e.target.value})} />
        <input className="w-full bg-black border border-gray-700 p-3 text-white rounded" placeholder="Phone Number" onChange={e => setDetails({...details, phone: e.target.value})} />
        <input className="w-full bg-black border border-gray-700 p-3 text-white rounded" placeholder="City" onChange={e => setDetails({...details, city: e.target.value})} />
        <input className="w-full bg-black border border-gray-700 p-3 text-white rounded" placeholder="Residence Name / Specific Address" onChange={e => setDetails({...details, address: e.target.value})} />
        <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-white">
          <span>Total Deposit:</span>
          <span className="text-green-400 font-bold">{total} ETB</span>
        </div>
        <button onClick={() => onComplete(details)} className="w-full bg-gradient-to-r from-orange-600 to-pink-600 py-3 rounded font-bold text-white uppercase mt-2">
          Confirm Details & Pay
        </button>
      </div>
    </div>
  );
}