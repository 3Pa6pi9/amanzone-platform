"use client";
import { useState, useEffect } from 'react';
import { Receipt, CheckCircle, ShieldAlert, MapPin, Phone } from 'lucide-react';
// import { approveOrder } from '../actions'; 

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/checkout', { headers: { 'ngrok-skip-browser-warning': 'true' }}) 
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setOrders(data) : setOrders([]))
      .catch(() => setOrders([]));
  }, []);

  const handleApprove = async (id: string) => {
    // await approveOrder(id);
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'FUNDS_APPROVED' } : o));
  };

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen bg-slate-950 p-4 md:p-8 text-slate-300 rounded-3xl border border-slate-800 shadow-2xl">
      <div className="mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-black text-white tracking-tight">TRANSACTION LEDGER</h1>
        <p className="text-emerald-500 font-mono text-xs mt-1">Live Financial Verification & Logistics</p>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-inner">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest">
          <Receipt className="text-orange-400" size={18} /> Order History
        </h2>
        {orders.length === 0 ? (
          <div className="py-16 text-center text-slate-500 border border-dashed border-slate-700 rounded-xl bg-slate-950/50 font-mono text-xs">No orders detected.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  <th className="py-3 px-2">Order_ID</th>
                  <th className="py-3 px-2">Customer Info</th>
                  <th className="py-3 px-2">Delivery</th>
                  <th className="py-3 px-2">Total_Value</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-2 font-mono text-xs text-slate-400">{order.id.slice(-8)}</td>
                    
                    {/* NEW CUSTOMER INFO COLUMN */}
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-1 text-white font-bold text-xs"><Phone size={10}/> {order.phoneNumber || 'N/A'}</div>
                      <div className="flex items-center gap-1 text-slate-400 text-[10px] mt-1"><MapPin size={10}/> {order.city}, {order.subcity}</div>
                    </td>

                    {/* NEW DELIVERY METHOD COLUMN */}
                    <td className="py-4 px-2 font-mono text-xs text-orange-400">{order.deliveryMethod || 'Standard'}</td>
                    
                    <td className="py-4 px-2 font-bold text-emerald-400">{order.totalAmount?.toLocaleString()} ETB</td>
                    <td className="py-4 px-2">
                      {order.status === 'FUNDS_APPROVED' ? (
                        <span className="flex items-center gap-1 text-emerald-400 text-[10px] uppercase font-bold tracking-widest"><CheckCircle size={12}/> APPROVED</span>
                      ) : (
                        <span className="flex items-center gap-1 text-orange-400 text-[10px] uppercase font-bold tracking-widest"><ShieldAlert size={12}/> PENDING</span>
                      )}
                    </td>
                    <td className="py-4 px-2 text-right">
                      {order.status !== 'FUNDS_APPROVED' && (
                        <button onClick={() => handleApprove(order.id)} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black px-3 py-1.5 rounded font-mono text-[9px] uppercase tracking-widest transition-all">
                          Verify
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}