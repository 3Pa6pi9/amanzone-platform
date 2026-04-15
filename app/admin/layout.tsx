import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Note the pb-24 here for mobile, and md:pb-0 for desktop!
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row pb-24 md:pb-0 overflow-x-hidden">
      
      {/* The Universal Navigation Component */}
      <AdminSidebar />
      
      {/* The Main Content Area */}
      <div className="flex-1 md:ml-64 p-4 md:p-8 mt-16 md:mt-0 w-full max-w-[100vw]">
        {children}
      </div>
      
    </div>
  );
}