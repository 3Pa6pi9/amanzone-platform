"use client";
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">System Configuration</h1>
        <p className="text-gray-500 mt-2">Manage store credentials.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm max-w-2xl hover:shadow-md transition-shadow">
        <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2 border-b pb-4">
          <Settings className="text-brand-orange" size={24} /> System Configuration
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Store Name</label>
            <input type="text" defaultValue="AmanZone Trading PLC" disabled className="w-full mt-2 p-3 text-sm border border-gray-200 rounded-xl bg-gray-50 text-slate-600 font-medium cursor-not-allowed" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Admin Email</label>
            <input type="email" defaultValue="admin@amanzone.com" disabled className="w-full mt-2 p-3 text-sm border border-gray-200 rounded-xl bg-gray-50 text-slate-600 font-medium cursor-not-allowed" />
          </div>
          <p className="text-xs text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100 font-medium mt-6">* Contact database administrator to change core settings.</p>
        </div>
      </div>
    </div>
  );
}