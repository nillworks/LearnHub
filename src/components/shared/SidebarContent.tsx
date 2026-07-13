'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { signOut } from '@/lib/auth-client';
import CustomToast from '@/components/shared/CustomToast';
import {
  studentDashboardLinks,
  instructorDashboardLinks,
  adminDashboardLinks,
} from './DashboardNav';

import {
  Sidebar,
  SidebarContent as UiSidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';

interface SidebarContentProps {
  user: any;
}

const getNavLinks = (role?: string) => {
  const baseRole = role?.toLowerCase() || 'student';
  if (baseRole === 'admin') return adminDashboardLinks;
  if (baseRole === 'instructor' || baseRole === 'instructor') return instructorDashboardLinks;
  return studentDashboardLinks;
};

const SidebarContent = ({ user }: SidebarContentProps) => {
  const pathname = usePathname();
  const navLinks = getNavLinks(user?.role);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          CustomToast('success', 'Signed out', 'You have been signed out successfully.');
          window.location.href = '/login';
        },
      },
    });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="px-4 py-4 flex items-center justify-center group-data-[collapsible=icon]:p-2 group-data-[collapsible=offcanvas]:justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0">
               <span className="text-white font-bold text-lg leading-none">L</span>
            </div>
            <span className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors group-data-[collapsible=icon]:hidden">
              LearnHub
            </span>
          </Link>
        </div>
      </SidebarHeader>

      <UiSidebarContent>
        <div className="px-4 mb-4 group-data-[collapsible=icon]:hidden">
          <div className="bg-primary/5 dark:bg-[#1e293b]/50 rounded-xl p-3 flex items-center gap-3 border border-border/40 hover:border-primary/30 transition-colors">
            <Image
              width={40}
              height={40}
              unoptimized
              src={user?.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}
              alt={user?.name || 'User Avatar'}
              className="w-10 h-10 rounded-full ring-2 ring-primary/20 object-cover shrink-0 group-hover:ring-primary/40 transition-all"
            />
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold truncate">
                {user?.name || 'LearnHub User'}
              </span>
              <span className="text-[10px] font-bold text-primary bg-primary-light dark:bg-primary-darker/30 px-2 py-0.5 rounded-full w-fit mt-0.5 uppercase tracking-wider">
                {user?.role || 'Student'}
              </span>
            </div>
          </div>
        </div>

        <SidebarGroup className="group-data-[collapsible=icon]:px-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                const Icon = link.icon;
                return (
                  <SidebarMenuItem key={link.id}>
                    <SidebarMenuButton
                      render={<Link href={link.href} />}
                      isActive={isActive}
                      tooltip={link.title}
                      className={isActive 
                        ? 'bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary font-semibold py-3 px-4 h-auto [&_svg]:!w-5 [&_svg]:!h-5 group-data-[collapsible=icon]:!w-10 group-data-[collapsible=icon]:!h-10 group-data-[collapsible=icon]:!p-2.5' 
                        : 'text-text-secondary hover:text-text-primary dark:hover:text-surface font-medium py-3 px-4 h-auto [&_svg]:!w-5 [&_svg]:!h-5 group-data-[collapsible=icon]:!w-10 group-data-[collapsible=icon]:!h-10 group-data-[collapsible=icon]:!p-2.5'}
                    >
                      <div className="flex flex-row items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
                        <Icon className="shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden truncate">{link.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </UiSidebarContent>

      <SidebarFooter>
        <div className="p-4 group-data-[collapsible=icon]:p-1 border-t border-border/50">
          <SidebarMenuButton
            onClick={handleSignOut}
            className="text-text-secondary hover:text-danger-dark dark:hover:text-danger hover:bg-danger-light dark:hover:bg-danger-darker/20 transition-all duration-300 font-semibold text-sm py-3 px-4 h-auto [&_svg]:!w-5 [&_svg]:!h-5 group-data-[collapsible=icon]:!w-10 group-data-[collapsible=icon]:!h-10 group-data-[collapsible=icon]:!p-2.5"
          >
            <div className="flex flex-row items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
              <LogOut className="shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden truncate">Log Out</span>
            </div>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarContent;
