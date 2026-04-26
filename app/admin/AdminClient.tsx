'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

    try {
      // 1. Upload Image to Supabase 'products' bucket
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, file);

      if (uploadError) throw new Error("Upload Failed: " + uploadError.message);

      // 2. Get the Public URL
      const { data: publicUrlData } = supabase.storage
        .from('products')
        .getPublicUrl(fileName);
      
      const imageUrl = publicUrlData.publicUrl;

      // 3. Send Data to our API
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: productName,
          price: value,    // Sent as 'price'
          category: type,  // Sent as 'category'
          imageUrl: imageUrl
        })
      });

      if (res.ok) {
        alert("Product Added Successfully!");
        window.location.reload();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save to database");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-slate-900 rounded-xl border border-slate-800">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6 uppercase tracking-wider">Add Entry</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-3 bg-slate-800 text-white rounded border border-slate-700 focus:border-cyan-500 outline-none"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <div className="flex gap-2">
          <select 
            className="p-3 bg-slate-800 text-white rounded border border-slate-700 outline-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Steel">Steel</option>
            <option value="Gypsum">Gypsum</option>
            <option value="MDF">MDF</option>
          </select>
          <input
            type="number"
            placeholder="Value"
            className="flex-1 p-3 bg-slate-800 text-white rounded border border-slate-700 outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
        <input
          type="file"
          accept="image/*"
          className="text-slate-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-900 file:text-cyan-300 hover:file:bg-cyan-800 cursor-pointer"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded transition-colors uppercase"
        >
          {loading ? "Processing..." : "Execute Upload"}
        </button>
      </form>
    </div>
  );
}
