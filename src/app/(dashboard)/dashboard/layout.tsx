'use client';

import React, { useState } from 'react';
import TopBardDashBoard from '@/shared/TopBardDashBoard';
import SidebarContent from '@/shared/SidebarContent';
import { useSession } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data, isPending } = useSession();
  const user = data?.user;

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-dark-bg">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg text-text-primary dark:text-surface">
      <SidebarContent 
        user={user} 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
      />
      <div className="lg:ml-[280px] flex flex-col min-h-screen transition-all duration-300 relative z-10">
        <TopBardDashBoard
          user={user} 
          onMenuClick={() => setIsMobileOpen(true)} 
        />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
