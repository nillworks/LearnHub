'use client';

import React from 'react';
import TopBardDashBoard from '@/components/shared/TopBardDashBoard';
import SidebarContent from '@/components/shared/SidebarContent';
import { useSession } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
    <SidebarProvider>
      <SidebarContent user={user} />
      <SidebarInset className="flex flex-col min-h-screen transition-all duration-300 relative z-10 bg-background dark:bg-dark-bg">
        <TopBardDashBoard user={user} />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto text-text-primary dark:text-surface">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
