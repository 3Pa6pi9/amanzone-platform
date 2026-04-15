"use client";
import { useState } from 'react';
import { ShieldAlert, Terminal } from 'lucide-react';
import { authenticateAdmin } from './actions';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await authenticateAdmin(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 selection:bg-orange-500">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-black to-black z-0"></div>
      
      <div className="w-full max-w-md bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(249,115,22,0.2)]">
            <Terminal className="text-orange-500" size={32} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-widest uppercase">System Override</h1>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-2">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2 block">Master Passcode</label>
            <input 
              type="password" 
              name="passcode" 
              required 
              autoFocus
              placeholder="••••••••••••" 
              className="w-full bg-black border border-white/10 text-white px-4 py-4 rounded-xl outline-none focus:border-orange-500 font-mono transition-colors text-center tracking-[0.5em]" 
            />
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 text-red-500 bg-red-500/10 py-3 rounded-lg border border-red-500/20 text-xs font-bold uppercase tracking-widest">
              <ShieldAlert size={16} /> {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-400 text-black font-black py-4 rounded-xl transition-all uppercase tracking-widest text-sm"
          >
            {isLoading ? "Decrypting..." : "Initialize Access"}
          </button>
        </form>
      </div>
    </div>
  );
}