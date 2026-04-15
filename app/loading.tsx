export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-black to-black z-0"></div>
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 border-t-2 border-orange-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-r-2 border-fuchsia-500 rounded-full animate-spin direction-reverse"></div>
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-fuchsia-600 rounded-lg animate-pulse"></div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-black text-white tracking-widest uppercase mb-1">AmanZone</h2>
          <p className="text-orange-500 font-mono text-[9px] uppercase tracking-[0.3em] animate-pulse">Establishing Secure Uplink...</p>
        </div>
      </div>
    </div>
  );
}