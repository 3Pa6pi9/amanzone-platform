"use client";
import { useState } from 'react';

const ETHIOPIAN_CITIES = [
  "Addis Ababa", "Adama", "Bahir Dar", "Dessie", 
  "Dire Dawa", "Gondar", "Hawassa", "Jimma", "Mekelle"
];

// Pass the clicked item's details into this component
export default function CheckoutForm({ item, onCancel }) {
  const [quantity, setQuantity] = useState(1);
  const [city, setCity] = useState("Addis Ababa");
  const [subcity, setSubcity] = useState("");
  const [residence, setResidence] = useState("");
  const [phone, setPhone] = useState("");

  // The Magic Auto-Calculator
  const totalAmount = quantity * item.price;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      amount: totalAmount,
      items: [item],
      quantity: quantity,
      city: city,
      subcity: subcity,
      residence: residence,
      phone: phone,
      transactionId: "PENDING", // Update this with your actual payment logic later
    };

    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });

    if (res.ok) {
      alert("Order Placed Successfully!");
      onCancel(); // Close the form
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 max-w-md w-full text-white">
      <h2 className="text-xl font-bold mb-4 border-b border-slate-800 pb-2">Purchase: {item.name}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* QUANTITY & AUTO-TOTAL */}
        <div className="flex justify-between items-center bg-slate-950 p-4 rounded-lg border border-slate-800">
          <div>
            <label className="block text-xs text-slate-400 uppercase tracking-widest mb-1">Quantity</label>
            <input 
              type="number" 
              min="1" 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 bg-slate-800 border border-slate-700 rounded p-1 text-white"
              required
            />
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Total Price</p>
            <p className="text-2xl font-bold text-emerald-400">{totalAmount.toLocaleString()} ETB</p>
          </div>
        </div>

        {/* PHONE NUMBER */}
        <div>
          <label className="block text-sm mb-1 text-slate-300">Phone Number</label>
          <input 
            type="tel" 
            placeholder="+251 911..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" 
            required 
          />
        </div>

        {/* CITY DROPDOWN */}
        <div>
          <label className="block text-sm mb-1 text-slate-300">City</label>
          <select 
            value={city} 
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
          >
            {ETHIOPIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* SUBCITY & RESIDENCE */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-slate-300">Subcity</label>
            <input 
              type="text" 
              placeholder="e.g. Bole"
              value={subcity}
              onChange={(e) => setSubcity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-300">Specific Area</label>
            <input 
              type="text" 
              placeholder="House/Block No."
              value={residence}
              onChange={(e) => setResidence(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" 
              required 
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 pt-4">
          <button type="button" onClick={onCancel} className="flex-1 bg-slate-800 hover:bg-slate-700 py-2 rounded text-sm font-bold transition">Cancel</button>
          <button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded text-sm font-bold transition">Confirm Order</button>
        </div>
      </form>
    </div>
  );
}