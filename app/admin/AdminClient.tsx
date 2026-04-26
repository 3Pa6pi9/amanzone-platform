'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';


export default function AdminClient() {
  const [productName, setProductName] = useState('');
  const [type, setType] = useState('Steel');
  const [value, setValue] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");
    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('productName', productName);
    formData.append('type', type);
    formData.append('value', value);

    try {
      const res = await fetch('/api/products', { method: 'POST', body: formData });
      if (res.ok) {
        alert("Product Added!");
        window.location.reload(); // Refresh to show new item
      } else {
        throw new Error("Failed");
      }
    } catch (err) {
      alert("Error uploading product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#0a0a0a] min-h-screen text-white">
      <div className="max-w-md bg-[#111] border border-cyan-900 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-6 text-cyan-400 uppercase">Add Entry</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <input 
            className="w-full bg-[#1a1a1a] border border-gray-800 p-3 rounded" 
            placeholder="Product Name" 
            onChange={(e) => setProductName(e.target.value)}
          />
          <div className="flex gap-4">
            <select className="w-1/2 bg-[#1a1a1a] border border-gray-800 p-3 rounded" onChange={(e) => setType(e.target.value)}>
              <option value="Steel">Steel</option>
              <option value="Roofing">Roofing</option>
              <option value="Timber">Timber</option>
            </select>
            <input className="w-1/2 bg-[#1a1a1a] border border-gray-800 p-3 rounded" placeholder="Value (ETB)" onChange={(e) => setValue(e.target.value)} />
          </div>
          <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-cyan-900 file:text-cyan-300" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <button className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 font-bold rounded uppercase transition-all" disabled={loading}>
            {loading ? "Executing..." : "Execute Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}