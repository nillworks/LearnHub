"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, LogIn, User } from "@/shared/Icons";
import ActiveLink, { type NavItem } from "@/shared/ActiveLink";
import { cn } from "@/lib/utils";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  navItems: NavItem[];
  authLinks: {
    login: { label: string; href: string };
    register: { label: string; href: string };
  };
  userLinks: {
    dashboard: { label: string; href: string };
    profile: { label: string; href: string };
    logout: { label: string; onClick?: () => void };
  };
  user: any; // Ideally replace 'any' with a User type when available
}

export default function MobileMenu({
  isOpen,
  onClose,
  pathname,
  navItems,
  authLinks,
  userLinks,
  user,
}: MobileMenuProps) {
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 lg:hidden transition-all duration-300",
        isOpen ? "visible" : "invisible delay-300"
      )}
    >
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div 
        className={cn(
          "fixed inset-y-0 right-0 w-[280px] sm:w-[320px] bg-white dark:bg-dark-bg shadow-2xl border-l border-border dark:border-secondary flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border dark:border-secondary">
          <span className="text-lg font-bold text-text-primary dark:text-surface">
            Menu
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 flex flex-col gap-8">
          
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <ActiveLink 
                key={item.id} 
                item={item} 
                pathname={pathname}
                onClick={onClose}
              />
            ))}
          </nav>

          {/* Auth / User Section */}
          <div className="mt-auto pt-8 border-t border-border dark:border-secondary">
            {!user ? (
              <div className="flex flex-col gap-3">
                <Link
                  href={authLinks.login.href}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-border dark:border-secondary text-sm font-semibold text-text-primary dark:text-surface hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <LogIn size={18} />
                  {authLinks.login.label}
                </Link>
                <Link
                  href={authLinks.register.href}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors shadow-sm"
                >
                  <User size={18} />
                  {authLinks.register.label}
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href={userLinks.dashboard.href}
                  onClick={onClose}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary dark:hover:text-surface transition-colors"
                >
                  {userLinks.dashboard.label}
                </Link>
                <Link
                  href={userLinks.profile.href}
                  onClick={onClose}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary dark:hover:text-surface transition-colors"
                >
                  {userLinks.profile.label}
                </Link>
                <button
                  onClick={() => {
                    onClose();
                    if (userLinks.logout.onClick) userLinks.logout.onClick();
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                  {userLinks.logout.label}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
