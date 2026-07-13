'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, ArrowLeft, Bell } from 'lucide-react';
import ThemeToggle from '@/shared/ThemeToggle';
import ProfileDropdown from '@/shared/ProfileDropdown';

interface TopBardDashBoardProps {
  user: any;
  onMenuClick: () => void;
}

const TopBardDashBoard = ({ user, onMenuClick }: TopBardDashBoardProps) => {
  const pathname = usePathname();
  const roleName = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Student';
  
  // Basic breadcrumb generation based on pathname
  const pathSegments = pathname.split('/').filter(Boolean);
  const pageTitle = pathSegments.length > 1 
    ? pathSegments[pathSegments.length - 1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : 'Overview';

  const userLinks = {
    dashboard: { label: "Dashboard", href: `/dashboard/${user?.role?.toLowerCase() || 'student'}` },
    profile: { label: "Profile", href: "/profile" },
    logout: { label: "Logout", onClick: () => window.location.href = '/login' }, // Handle logout via ProfileDropdown if needed, but sidebar has it. We will redirect to let auth trigger. Better yet, we can omit logout logic here if they use sidebar, but dropdown expects it.
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/70 dark:bg-dark-bg/70 backdrop-blur-xl border-b border-border/50 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between px-6 py-4 lg:py-5">
        
        {/* Left Side: Hamburger & Breadcrumbs */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 text-text-secondary hover:text-primary hover:bg-primary-light rounded-xl transition-colors"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="hidden sm:block">
            <h1 className="text-xl lg:text-2xl font-bold text-text-primary dark:text-surface tracking-tight leading-none mb-1">
              {pageTitle}
            </h1>
            <p className="text-sm font-medium text-text-secondary">
              Welcome back, <span className="text-primary font-bold">{user?.name?.split(' ')[0] || 'User'}</span>
            </p>
          </div>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Back to Website */}
          <Link 
            href="/"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-text-secondary hover:text-primary hover:bg-primary-light transition-all duration-300 group border border-transparent hover:border-primary/20"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Site</span>
          </Link>

          <div className="h-6 w-px bg-border/50 mx-1 hidden sm:block"></div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <button className="relative p-2 text-text-secondary hover:text-primary hover:bg-primary-light rounded-xl transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-danger border border-white dark:border-dark-bg"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="ml-1">
            <ProfileDropdown 
              user={{ 
                name: user?.name || "User", 
                email: user?.email || "", 
                avatarUrl: user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              }} 
              userLinks={userLinks} 
            />
          </div>
        </div>

      </div>
    </header>
  );
};

export default TopBardDashBoard;
