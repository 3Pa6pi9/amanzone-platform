"use client";
import { useState } from 'react';
import { Truck, Store } from 'lucide-react';

const ETHIOPIAN_CITIES = [
  "Addis Ababa", "Adama", "Bahir Dar", "Dessie", 
  "Dire Dawa", "Gondar", "Hawassa", "Jimma", "Mekelle"
];

const DELIVERY_OPTIONS: Record<string, { label: string, price: number, icon: any }> = {
  "Pickup": { label: "Store Pickup (Addis Ababa)", price: 0, icon: Store },
  "Standard": { label: "Standard Delivery", price: 500, icon: Truck },
  "Heavy": { label: "Heavy Truck Freight", price: 2500, icon: Truck }
};

export default function CheckoutForm({ item, onCancel }: { item: any, onCancel: () => void }) {
  const [quantity, setQuantity] = useState(1);
  const [city, setCity] = useState("Addis Ababa");
  const [subcity, setSubcity] = useState("");
  const [residence, setResidence] = useState("");
  const [phone, setPhone] = useState("");
  const [delivery, setDelivery] = useState("Standard");

  // Auto-Calculator
  const itemTotal = quantity * item.price;
  const deliveryFee = DELIVERY_OPTIONS[delivery].price;
  const grandTotal = itemTotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderData = {
      amount: grandTotal,
      items: [item],
      quantity: quantity,
      city: city,
      subcity: subcity,
      residence: residence,
      phone: phone,
      deliveryMethod: delivery,
      transactionId: "PENDING_VERIFICATION", 
    };

    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });

    if (res.ok) {
      alert("Order Placed Successfully!");
      onCancel(); 
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 max-w-lg w-full text-white mx-auto shadow-2xl">
      <h2 className="text-xl font-black mb-4 border-b border-slate-800 pb-3 text-orange-500 uppercase tracking-tight">Order: {item.name}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Quantity & Auto-Calculator */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex justify-between items-center">
          <div>
            <label className="block text-xs text-slate-500 uppercase tracking-widest mb-1">Quantity</label>
            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-20 bg-slate-800 border border-slate-700 rounded p-2 text-white font-mono text-lg text-center outline-none" required />
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Total (Inc. Delivery)</p>
            <p className="text-3xl font-black text-emerald-400">{grandTotal.toLocaleString()} <span className="text-sm">ETB</span></p>
          </div>
        </div>

        {/* Delivery Options */}
        <div>
          <label className="block text-sm font-bold mb-2 text-slate-300 uppercase tracking-widest">Delivery Method</label>
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(DELIVERY_OPTIONS).map((key) => {
              const OptionIcon = DELIVERY_OPTIONS[key].icon;
              return (
                <label key={key} className={`flex items-center justify-between p-3 rounded cursor-pointer border transition-all ${delivery === key ? 'bg-orange-500/10 border-orange-500' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="delivery" value={key} checked={delivery === key} onChange={(e) => setDelivery(e.target.value)} className="accent-orange-500" />
                    <span className="flex items-center gap-2 text-sm"><OptionIcon size={16} className={delivery === key ? "text-orange-400" : "text-slate-500"}/> {DELIVERY_OPTIONS[key].label}</span>
                  </div>
                  <span className="text-sm font-mono text-emerald-400">+{DELIVERY_OPTIONS[key].price} ETB</span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Phone Number</label>
            <input type="tel" placeholder="+251 9..." value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm outline-none" required />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">City</label>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm outline-none">
              {ETHIOPIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Specific Address */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Subcity (e.g. Bole)</label>
            <input type="text" value={subcity} onChange={(e) => setSubcity(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm outline-none" required />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">House No. / Area</label>
            <input type="text" value={residence} onChange={(e) => setResidence(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm outline-none" required />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t border-slate-800">
          <button type="button" onClick={onCancel} className="w-1/3 bg-slate-800 hover:bg-slate-700 py-3 rounded font-bold text-sm transition">Cancel</button>
          <button type="submit" className="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded font-black tracking-widest text-sm transition uppercase">Confirm Purchase</button>
        </div>
      </form>
    </div>
  );
}