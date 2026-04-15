"use client";
import { PackagePlus, Database, Terminal, Trash2, Settings as SettingsIcon } from 'lucide-react';
import { addInventory, deleteProduct, updateSettings } from './actions';

export default function AdminClient({ products, settings }: { products: any[], settings?: any }) {
  const handleDelete = async (id: string) => {
    if (confirm("WARNING: Are you sure you want to delete this material?")) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen bg-slate-950 p-4 md:p-8 text-slate-300 rounded-3xl border border-slate-800 shadow-2xl">
      <div className="mb-10 border-b border-slate-800 pb-6 flex items-center gap-4">
        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20"><Terminal className="text-emerald-400" size={32} /></div>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">SYSTEM TERMINAL</h1>
          <p className="text-emerald-500 font-mono text-xs mt-1">root@amanzone-warehouse:~# access_granted</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-inner h-fit relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest"><PackagePlus className="text-emerald-400" size={18} /> Add Entry</h2>
          <form action={addInventory} className="flex flex-col gap-5">
            <div>
              <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Product.Name</label>
              <input required name="name" type="text" className="w-full mt-1 p-3 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Type</label>
                <select name="category" className="w-full mt-1 p-3 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white outline-none">
                  <option value="Steel">Steel</option><option value="Roofing">Roofing</option><option value="Timber">Timber</option><option value="MDF">MDF</option>
                </select>
              </div>
              <div>
                <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Value (ETB)</label>
                <input required name="price" type="number" className="w-full mt-1 p-3 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white outline-none" />
              </div>
            </div>
            <div>
              <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1 block">Upload Image</label>
              <input name="imageFile" type="file" accept="image/*" className="w-full p-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-slate-400 outline-none cursor-pointer" />
            </div>
            <div>
              <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Description</label>
              <textarea required name="description" className="w-full mt-1 p-3 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white outline-none resize-none" rows={2}></textarea>
            </div>
            <button type="submit" className="w-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 font-bold py-3 rounded-lg hover:bg-emerald-500 hover:text-slate-900 transition-all text-xs uppercase tracking-widest">Execute Upload</button>
          </form>
        </div>

        <div className="md:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-inner relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-fuchsia-500"></div>
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest"><Database className="text-orange-400" size={18} /> Active Nodes</h2>
          {products.length === 0 ? (
            <div className="py-20 text-center text-slate-600 bg-slate-950/50 rounded-xl"><span className="font-mono text-xs">No active nodes.</span></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead><tr className="border-b border-slate-800 text-[10px] font-mono text-slate-500 uppercase tracking-widest"><th className="py-3 px-2">Image</th><th className="py-3 px-2">Designation</th><th className="py-3 px-2">Value</th><th className="py-3 px-2 text-right">Action</th></tr></thead>
                <tbody className="text-sm">
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                      <td className="py-2 px-2">{p.imageUrl !== '[Image]' ? <img src={p.imageUrl} className="w-10 h-10 object-cover rounded" /> : <div className="w-10 h-10 bg-slate-800 rounded"></div>}</td>
                      <td className="py-3 px-2 font-bold text-white">{p.name}</td><td className="py-3 px-2 font-mono text-emerald-500">{p.price} ETB</td>
                      <td className="py-3 px-2 text-right"><button onClick={() => handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg border border-red-500/20"><Trash2 size={14} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* SETTINGS PANEL (WITH LOGO UPLOAD & PASSWORD RESET) */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-inner relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest"><SettingsIcon className="text-blue-400" size={18} /> Storefront Configuration</h2>
        <form action={updateSettings} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="hidden" name="existingLogoUrl" value={settings?.logoUrl || ''} />
          <div>
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Brand Name</label>
            <input name="storeName" defaultValue={settings?.storeName || 'AmanZone'} type="text" className="w-full mt-1 p-3 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white outline-none" />
          </div>
          <div>
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest text-orange-400">Master Password</label>
            <input name="masterPasscode" defaultValue={settings?.masterPasscode || 'AmanZone2026'} type="password" placeholder="Change password..." className="w-full mt-1 p-3 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-orange-500" />
          </div>
          <div className="md:col-span-2">
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Slogan</label>
            <input name="slogan" defaultValue={settings?.slogan || 'Wholesale & B2B Construction Supply'} type="text" className="w-full mt-1 p-3 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white outline-none" />
          </div>
          <div className="md:col-span-2 bg-slate-950/50 p-4 border border-slate-800 rounded-lg">
            <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-3 block">Upload Brand Logo</label>
            {settings?.logoUrl && (
              <div className="mb-4">
                <span className="text-[9px] text-slate-600 block mb-1">Current Logo:</span>
                <img src={settings.logoUrl} className="h-12 w-auto object-contain bg-white/5 rounded p-1" alt="Current Logo" />
              </div>
            )}
            <input name="logoFile" type="file" accept="image/*" className="w-full p-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-slate-400 outline-none cursor-pointer" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-blue-500/10 text-blue-400 border border-blue-500/50 font-bold py-3 px-8 rounded-lg hover:bg-blue-500 hover:text-white transition-all text-xs uppercase tracking-widest">Save Configuration</button>
          </div>
        </form>
      </div>
    </div>
  );
}
