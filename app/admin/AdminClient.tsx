import { useState } from 'react';

export default function AddProductForm() {
  const [productName, setProductName] = useState('');
  const [type, setType] = useState('Steel');
  const [value, setValue] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const executeUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image first.");
    if (!productName || !value) return alert("Please fill in all fields.");

    setIsUploading(true);
    
    // CRITICAL: Pack everything into FormData
    const formData = new FormData();
    formData.append('image', file);
    formData.append('productName', productName);
    formData.append('type', type);
    formData.append('value', value);
    
    try {
      const response = await fetch('/api/products', { 
        method: 'POST',
        body: formData, // Sending FormData automatically sets the right headers
      });

      if (!response.ok) throw new Error("Upload failed on the server");
      
      alert("Product added successfully!");
      
      // Reset form fields
      setProductName('');
      setValue('');
      setFile(null);
      // Optional: Trigger a refresh of your Active Nodes list here
      
    } catch (error) {
      console.error("Error executing upload:", error);
      alert("Failed to add product. Check the console.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-[#0f172a] border border-cyan-800 p-6 rounded-lg w-full max-w-sm">
      <h3 className="text-white text-lg font-bold mb-4 uppercase flex items-center gap-2">
        <span className="text-cyan-400">📦</span> ADD ENTRY
      </h3>
      
      <form onSubmit={executeUpload} className="flex flex-col gap-4">
        <div>
          <label className="text-gray-400 text-xs mb-1 block uppercase">Product Name</label>
          <input 
            type="text"
            className="w-full bg-[#1e293b] border border-gray-700 p-2 text-white rounded outline-none focus:border-cyan-500"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="text-gray-400 text-xs mb-1 block uppercase">Type</label>
            <select 
              className="w-full bg-[#1e293b] border border-gray-700 p-2 text-white rounded outline-none focus:border-cyan-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Steel">Steel</option>
              <option value="Roofing">Roofing</option>
              <option value="Timber">Timber</option>
              <option value="MDF">MDF</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="text-gray-400 text-xs mb-1 block uppercase">Value (ETB)</label>
            <input 
              type="number"
              className="w-full bg-[#1e293b] border border-gray-700 p-2 text-white rounded outline-none focus:border-cyan-500"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-gray-400 text-xs mb-1 block uppercase">Upload Image</label>
          <input 
            type="file" 
            onChange={handleFileChange} 
            accept="image/*"
            className="w-full bg-[#1e293b] border border-gray-700 p-2 text-gray-300 rounded text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-900 file:text-cyan-300 hover:file:bg-cyan-800"
          />
        </div>

        <button 
          type="submit" 
          disabled={isUploading} 
          className="mt-2 border border-teal-500 text-teal-400 hover:bg-teal-900 font-bold py-2 px-4 rounded transition-colors uppercase disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? 'Executing...' : 'Execute Upload'}
        </button>
      </form>
    </div>
  );
}