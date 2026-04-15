"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingCart, Menu, X, Globe } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Navbar({ settings }: { settings?: any }) {
  const items = useCartStore((state) => state.items) || []; 
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement({ pageLanguage: 'en', layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
      };
    }
  }, []);

  const cartCount = items.reduce((acc: number, item: any) => acc + (item?.quantity || 0), 0);
  const brandName = settings?.storeName || "AmanZone";

  return (
    <header className="w-full bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm transition-all duration-300">
      
      {/* CSS Injection to make Google Translate beautiful */}
      <style jsx global>{`
        .goog-te-gadget { font-family: inherit !important; color: transparent !important; display: flex !important; align-items: center; }
        .goog-te-gadget .goog-te-combo { margin: 0; padding: 4px 8px; border-radius: 6px; border: 1px solid #e2e8f0; background: #f8fafc; color: #0f172a; font-size: 11px; font-weight: bold; outline: none; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; }
        .goog-logo-link { display: none !important; }
        .goog-te-gadget span { display: none !important; }
        body { top: 0 !important; }
        .skiptranslate iframe { display: none !important; }
      `}</style>

      {/* Top Micro-Bar */}
      <div className="w-full bg-slate-950 text-slate-300 py-2 px-6 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <span className="font-mono text-brand-orange text-[10px] sm:text-xs">+251 911 00 00 00</span>
          <span className="hidden md:inline text-slate-400 text-[10px] uppercase tracking-widest">{settings?.slogan || "Wholesale & B2B Supply"}</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-2 py-0.5 rounded-lg border border-white/10">
          <Globe size={14} className="text-slate-300" />
          <div id="google_translate_element"></div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 z-50">
          {settings?.logoUrl ? <img src={settings.logoUrl} className="h-10 w-10 object-contain" /> : null}
          <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{brandName}</span>
        </Link>

        {/* Desktop Controls */}
        <div className="hidden md:flex flex-1 max-w-xl relative group ml-8">
          <input type="text" placeholder="Search materials..." className="w-full bg-gray-100 border border-gray-200 rounded-l-xl px-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-brand-orange/50 transition-all" />
          <button className="bg-slate-900 text-white px-6 rounded-r-xl hover:bg-brand-orange transition-colors">
            <Search size={18} />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6 text-slate-700">
          <Link href="/admin" className="bg-brand-orange text-white px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 shadow-lg shadow-orange-500/30">Admin</Link>
          <div className="flex flex-col items-center cursor-pointer hover:text-brand-orange relative">
            <ShoppingCart size={22} />
            {mounted && cartCount > 0 && <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>}
            <span className="text-[9px] font-bold uppercase mt-1 tracking-wider">Cart</span>
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center gap-5 z-50">
          <div className="relative">
            <ShoppingCart size={24} className="text-slate-800" />
            {mounted && cartCount > 0 && <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
          </div>
          <button className="text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-OUT DRAWER */}
      <div className={`fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white shadow-2xl transform transition-transform duration-500 ease-in-out z-40 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col pt-24 px-6`}>
        <div className="flex relative shadow-sm mb-8">
          <input type="text" placeholder="Search..." className="w-full bg-gray-50 border border-gray-200 rounded-l-lg px-4 py-3 outline-none" />
          <button className="bg-brand-orange text-white px-4 rounded-r-lg"><Search size={20} /></button>
        </div>
        <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 font-bold text-slate-700 hover:text-brand-orange p-4 bg-gray-50 rounded-xl border border-gray-100">
          <User size={20} /> Access Admin Portal
        </Link>
      </div>
      
      {/* Mobile Dark Overlay */}
      {mobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>}
    </header>
  );
}