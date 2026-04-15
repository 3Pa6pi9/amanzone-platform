"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Receipt, Settings, LogOut } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-slate-900/95 backdrop-blur-md flex items-center justify-center z-50 border-b border-slate-800 shadow-md">
         <h1 className="text-xl font-black text-white tracking-wider">AMAN<span className="text-brand-orange">ZONE</span></h1>
      </div>

      <aside className="fixed bottom-0 md:top-0 left-0 w-full md:w-64 bg-slate-900/95 md:bg-slate-900 text-slate-300 md:min-h-screen flex flex-row md:flex-col z-50 backdrop-blur-lg border-t md:border-r border-slate-800 shadow-[0_-20px_40px_rgba(0,0,0,0.4)] md:shadow-none transition-all duration-300">
        
        <div className="hidden md:flex h-20 items-center px-6 bg-slate-950 border-b border-slate-800">
          <h1 className="text-xl font-black text-white tracking-wider">AMAN<span className="text-brand-orange">ZONE</span> <span className="text-[10px] bg-brand-orange/20 text-brand-orange px-2 py-0.5 rounded ml-2">Admin</span></h1>
        </div>

        <nav className="flex-1 flex flex-row md:flex-col justify-around md:justify-start px-2 md:px-4 py-2 md:py-6 md:space-y-2 w-full">
          
          <Link href="/admin" className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 p-2 md:px-4 md:py-3 rounded-xl transition-all duration-300 text-[10px] md:text-sm font-medium ${isActive('/admin') ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20 md:-translate-y-1' : 'hover:bg-slate-800 hover:text-white'}`}>
            <LayoutDashboard size={20} className={isActive('/admin') ? 'scale-110' : ''} />
            <span className="hidden md:inline">Inventory Control</span><span className="md:hidden">Inventory</span>
          </Link>
          
          <Link href="/admin/orders" className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 p-2 md:px-4 md:py-3 rounded-xl transition-all duration-300 text-[10px] md:text-sm font-medium ${isActive('/admin/orders') ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20 md:-translate-y-1' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Receipt size={20} className={isActive('/admin/orders') ? 'scale-110' : ''} />
            <span className="hidden md:inline">Order Ledger</span><span className="md:hidden">Orders</span>
          </Link>
          
          <Link href="/admin/settings" className={`hidden md:flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${isActive('/admin/settings') ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20 md:-translate-y-1' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Settings size={20} className={isActive('/admin/settings') ? 'scale-110' : ''} />System Settings
          </Link>

        </nav>

        <div className="p-2 md:p-4 md:border-t border-slate-800 flex justify-center md:justify-start">
          <Link href="/" className="flex flex-col md:flex-row items-center gap-1 md:gap-3 p-2 md:px-4 md:py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 text-[10px] md:text-sm font-medium">
            <LogOut size={20} />
            <span className="hidden md:inline">Storefront</span><span className="md:hidden">Exit</span>
          </Link>
        </div>
      </aside>
    </>
  );
}