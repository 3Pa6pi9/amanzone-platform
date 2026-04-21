"use client";
import { useState, useEffect } from 'react';
import { Package, X, Edit2, Trash2 } from 'lucide-react';

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the products from your database
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    // Optimistic UI update: instantly remove from screen
    setProducts(products.filter(p => p.id !== id));
    
    // Future step: wire this to your backend delete action
    // await fetch(`/api/products/${id}`, { method: 'DELETE' }); 
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Optimistic UI update: instantly show new values on screen
    setProducts(products.map(p => p.id === editingItem.id ? editingItem : p));
    setEditingItem(null); // Close the modal
    
    // Future step: wire this to your backend update action
    // await fetch(`/api/products/${editingItem.id}`, { 
    //   method: 'PUT', 
    //   body: JSON.stringify(editingItem) 
    // });
  };

  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen bg-slate-950 p-4 md:p-8 text-slate-300 rounded-3xl border border-slate-800 shadow-2xl">
      <div className="mb-8 border-b border-slate-800 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">INVENTORY CONTROL</h1>
          <p className="text-orange-500 font-mono text-xs mt-1">Live Stock Management</p>
        </div>
        <Package className="text-slate-700" size={32} />
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-inner overflow-x-auto">
        {isLoading ? (
          <div className="py-16 text-center text-slate-500 font-mono text-xs">Loading database records...</div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-slate-500 border border-dashed border-slate-700 rounded-xl bg-slate-950/50 font-mono text-xs">No products found in database.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                <th className="py-3 px-2">Item_Name</th>
                <th className="py-3 px-2">Category</th>
                <th className="py-3 px-2">Unit_Price</th>
                <th className="py-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.map((item) => (
                <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-2 font-bold text-white">{item.name}</td>
                  <td className="py-4 px-2 text-slate-400">
                    <span className="bg-slate-950 px-2 py-1 rounded text-xs border border-slate-800">{item.category}</span>
                  </td>
                  <td className="py-4 px-2 font-mono text-emerald-400">{item.price.toLocaleString()} ETB</td>
                  <td className="py-4 px-2 text-right flex justify-end gap-2">
                    
                    {/* EDIT BUTTON */}
                    <button 
                      onClick={() => setEditingItem(item)} 
                      className="bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500 hover:text-white px-3 py-1.5 rounded font-mono text-[10px] uppercase tracking-widest transition-all flex items-center gap-1"
                    >
                      <Edit2 size={12} /> Edit
                    </button>

                    {/* DELETE BUTTON */}
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded font-mono text-[10px] uppercase tracking-widest transition-all flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* THE EDIT MODAL POPUP */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Edit2 className="text-blue-500" size={18} /> Update Product
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-500 hover:text-red-400 transition-colors">
                <X size={24}/>
              </button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">Product Name</label>
                <input 
                  type="text" 
                  value={editingItem.name} 
                  onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white font-medium outline-none focus:border-blue-500 transition-colors" 
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">Category</label>
                  <input 
                    type="text" 
                    value={editingItem.category} 
                    onChange={(e) => setEditingItem({...editingItem, category: e.target.value})} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white font-medium outline-none focus:border-blue-500 transition-colors" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">Price (ETB)</label>
                  <input 
                    type="number" 
                    value={editingItem.price} 
                    onChange={(e) => setEditingItem({...editingItem, price: Number(e.target.value)})} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-emerald-400 font-mono font-bold outline-none focus:border-blue-500 transition-colors" 
                    required
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-black uppercase tracking-widest text-sm mt-2 transition-colors shadow-lg shadow-blue-500/20">
                Save Adjustments
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}