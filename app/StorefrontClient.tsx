"use client";
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Zap, ShieldCheck, Trash2, XCircle, FileText, Send, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function StorefrontClient({ initialInventory, settings }: { initialInventory: any[], settings: any }) {
  const cartStore = useCartStore();
  const items = cartStore?.items || [];
  const addItem = cartStore?.addItem || (() => {});
  const removeItem = cartStore?.removeItem || (() => {});
  const clearCart = cartStore?.clearCart || (() => {});

  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showPayment, setShowPayment] = useState(false);
  const [txId, setTxId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  const totalAmount = items.reduce((acc: number, item: any) => acc + ((item?.price || 0) * (item?.quantity || 1)), 0);

  // PDF INVOICE GENERATOR
  const generatePDF = () => {
    const doc = new jsPDF();
    const brandName = settings?.storeName || "AmanZone Trading PLC";
    
    doc.setFontSize(22);
    doc.text("PRO-FORMA INVOICE", 14, 20);
    doc.setFontSize(12);
    doc.text(`Issued By: ${brandName}`, 14, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 38);
    
    const tableData = items.map((item: any) => [item.name, item.category || "N/A", item.quantity.toString(), `${item.price.toLocaleString()} ETB`, `${(item.price * item.quantity).toLocaleString()} ETB`]);
    autoTable(doc, {
      startY: 48,
      head: [['Material / Description', 'Type', 'Qty', 'Unit Price', 'Total']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [249, 115, 22] }, 
      foot: [['', '', '', 'GRAND TOTAL:', `${totalAmount.toLocaleString()} ETB`]],
      footStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold' }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.text("Payment Instructions", 14, finalY);
    doc.setFontSize(11);
    doc.text("Bank: Commercial Bank of Ethiopia (CBE)", 14, finalY + 8);
    doc.text("Account Name: AmanZone Trading PLC", 14, finalY + 16);
    doc.text("Account Number: 1000 1234 5678", 14, finalY + 24);
    doc.save(`AmanZone_Quote_${Date.now()}.pdf`);
  };

  const confirmPayment = async () => {
    if (!txId.trim()) return alert("Please enter the Transaction ID.");
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: totalAmount, items, transactionId: txId }) });
      if (res.ok) { alert("Payment Submitted! Awaiting Admin Verification."); clearCart(); setShowPayment(false); setTxId(""); }
    } catch (error) {}
    setIsSubmitting(false);
  };

  const filteredInventory = activeCategory === 'All' ? initialInventory : initialInventory.filter(item => item?.category === activeCategory);

  return (
    <main className="min-h-screen bg-black pb-32 overflow-hidden relative selection:bg-orange-500 selection:text-white font-sans">
      <Navbar settings={settings} />

      <section className="relative w-full pt-20 pb-16 flex flex-col items-center overflow-hidden bg-black border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black z-0"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>
        <div className="relative z-20 max-w-5xl mx-auto px-6 w-full text-center flex flex-col items-center">
          {/* UPDATED HERO TEXT HERE */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-6 uppercase">
            YOUR RELIABLE<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-fuchsia-500 to-indigo-500">SOURCE OF...</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-light tracking-wide mb-10">{settings?.slogan || "Direct from China to your site in 15 days."}</p>
          <a href="#inventory" className="bg-white text-black font-black px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2"><Zap size={18} className="text-orange-500" /> Access Live Inventory</a>
        </div>
      </section>

      <section id="inventory" className="max-w-7xl mx-auto px-4 sm:px-6 mt-20 relative z-30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <h3 className="text-3xl font-black text-white tracking-tighter">Procurement Nodes</h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar bg-white/5 p-1.5 rounded-full border border-white/10">
            {['All', 'Steel', 'Roofing', 'Timber', 'MDF'].map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all duration-300 ${ activeCategory === cat ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'text-slate-400 hover:text-white' }`}>{cat}</button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredInventory.map((product) => (
            <div key={product.id} className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-orange-500/50 transition-all duration-500 group flex flex-col relative">
              <div className="h-40 md:h-56 bg-black/50 flex justify-center items-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                {product.imageUrl && product.imageUrl !== '[Image]' ? <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" /> : <span className="text-slate-600 font-bold text-[10px] uppercase tracking-widest z-20">No Image</span>}
                <span className="absolute bottom-3 left-4 z-20 text-[9px] font-black text-orange-400 uppercase tracking-widest px-2 py-1 bg-black/50 rounded backdrop-blur-md border border-white/10">{product.category}</span>
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-1 bg-gradient-to-b from-transparent to-black/40 relative z-20">
                <h4 className="text-base md:text-lg font-bold text-white leading-tight">{product.name}</h4>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-end justify-between">
                  <div><p className="text-slate-500 text-[9px] uppercase tracking-widest font-mono">Wholesale Index</p><p className="text-xl font-black text-emerald-400">{product.price.toLocaleString()} ETB</p></div>
                </div>
                <button onClick={() => addItem({ ...product, quantity: 1 })} className="w-full mt-5 bg-white/10 text-white font-bold py-3 rounded-xl border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-[10px] md:text-xs uppercase tracking-widest">Stage to RFQ</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CART & CHECKOUT MODAL */}
      {mounted && items.length > 0 && !showPayment && (
        <div className="fixed bottom-4 md:bottom-8 left-0 w-full z-40 px-4 md:px-0 animate-in slide-in-from-bottom-10 duration-500">
          <div className="max-w-5xl mx-auto bg-slate-900/90 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl p-4 md:p-6 flex justify-between items-center">
            <div><p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Total Payload Value</p><p className="text-white font-black text-xl md:text-2xl">{totalAmount.toLocaleString()} <span className="text-emerald-500">ETB</span></p></div>
            <div className="flex items-center gap-2 md:gap-4">
              <button onClick={clearCart} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all hidden md:block"><Trash2 size={20} /></button>
              <button onClick={() => setShowPayment(true)} className="bg-white text-black font-black py-3 px-6 md:px-10 rounded-xl hover:bg-orange-500 hover:text-white transition-all text-xs md:text-sm uppercase tracking-widest flex items-center gap-2 shadow-lg"><ShieldCheck size={18} /> Review & Request</button>
            </div>
          </div>
        </div>
      )}

      {showPayment && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-white/10 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-[0_0_100px_rgba(249,115,22,0.1)] relative max-h-[90vh] overflow-y-auto hide-scrollbar">
            <button onClick={() => setShowPayment(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24}/></button>
            <h3 className="text-xl md:text-2xl font-black text-white mb-1 tracking-tight">SECURE DEPOSIT</h3>
            
            <div className="mb-6 border border-white/10 rounded-xl p-4 bg-white/5 mt-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                <h4 className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Payload Contents</h4>
                <button onClick={generatePDF} className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-bold text-orange-400 hover:text-orange-300 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20"><FileText size={12} /> Download PDF Quote</button>
              </div>
              <div className="flex flex-col gap-3 max-h-40 overflow-y-auto hide-scrollbar">
                {items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2"><button onClick={() => removeItem(item.id)} className="text-slate-500 hover:text-red-500"><XCircle size={16} /></button><span className="text-white font-bold">{item.quantity}x</span><span className="text-slate-300">{item.name}</span></div>
                    <span className="text-emerald-400 font-mono text-xs">{(item.price * item.quantity).toLocaleString()} ETB</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6"><label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2 block">Transfer Reference ID</label><input type="text" value={txId} onChange={(e) => setTxId(e.target.value)} placeholder="FT2610..." className="w-full bg-black border border-white/20 text-white px-4 py-4 rounded-xl outline-none focus:border-orange-500 font-mono text-sm" /></div>
            <button onClick={confirmPayment} disabled={isSubmitting || items.length === 0} className="w-full bg-gradient-to-r from-orange-500 to-fuchsia-600 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] disabled:opacity-50"><Send size={16} /> {isSubmitting ? "VERIFYING LEDGER..." : "CONFIRM TRANSFER"}</button>
          </div>
        </div>
      )}
    </main>
  );
}