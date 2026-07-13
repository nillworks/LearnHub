'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from '@/lib/auth-client';
import CustomToast from '@/shared/CustomToast';
import {
  studentDashboardLinks,
  instructorDashboardLinks,
  adminDashboardLinks,
} from './DashboardNav';

interface SidebarContentProps {
  user: any;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const getNavLinks = (role?: string) => {
  const baseRole = role?.toLowerCase() || 'student';
  if (baseRole === 'admin') return adminDashboardLinks;
  if (baseRole === 'trainer' || baseRole === 'instructor') return instructorDashboardLinks;
  return studentDashboardLinks;
};

const SidebarContent = ({ user, isMobileOpen, setIsMobileOpen }: SidebarContentProps) => {
  const pathname = usePathname();
  const router = useRouter();
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

  const Sidebar = (
    <div className="flex flex-col h-full bg-surface dark:bg-dark-bg text-text-primary dark:text-surface overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.02)] border-r border-border/50">
      {/* Top Section */}
      <div className="px-6 py-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          {/* Add a sleek logo UI or image here. Using text for now if image isn't available, but we can assume /logo.png exists or use a generic styled text */}
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary shadow-sm group-hover:scale-105 transition-transform duration-300">
             <span className="text-white font-bold text-xl leading-none">L</span>
          </div>
          <span className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
            LearnHub
          </span>
        </Link>
        {/* Mobile Close Button */}
        <button
          className="lg:hidden p-2 text-text-secondary hover:text-primary hover:bg-primary-light rounded-xl transition-colors"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User Profile Card */}
      <div className="px-6 mb-8">
        <div className="bg-primary/5 dark:bg-[#1e293b]/50 rounded-2xl p-4 flex items-center gap-4 border border-border/40 hover:border-primary/30 transition-colors group">
          <Image
            width={48}
            height={48}
            unoptimized
            src={user?.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}
            alt={user?.name || 'User Avatar'}
            className="w-12 h-12 rounded-full ring-2 ring-primary/20 object-cover shrink-0 group-hover:ring-primary/40 transition-all"
          />
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold truncate">
              {user?.name || 'LearnHub User'}
            </span>
            <span className="text-[10px] font-bold text-primary bg-primary-light dark:bg-primary-darker/30 px-2 py-0.5 rounded-full w-fit mt-1 uppercase tracking-wider">
              {user?.role || 'Student'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar pb-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          const Icon = link.icon;
          return (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group"
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex items-center gap-3 w-full">
                <Icon 
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-text-secondary group-hover:text-primary"
                  }`} 
                />
                <span 
                  className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-text-secondary group-hover:text-text-primary dark:group-hover:text-surface"
                  }`}
                >
                  {link.title}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-6 mt-auto border-t border-border/50 bg-surface dark:bg-dark-bg">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-danger-dark dark:hover:text-danger hover:bg-danger-light dark:hover:bg-danger-darker/20 transition-all duration-300 group font-semibold text-sm"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-40 w-[280px]">
        {Sidebar}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden"
            >
              {Sidebar}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarContent;
