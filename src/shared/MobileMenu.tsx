"use client";

import Link from "next/link";
import Image from "next/image";
import { X, GraduationCap, LayoutDashboard, LogOut, LogIn } from "@/shared/Icons";
import { cn } from "@/lib/utils";
import ActiveLink, { type NavItem } from "@/shared/ActiveLink";

// ─── Types ────────────────────────────────────────────────────────────────────

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
    logout: { label: string };
  };
  user: boolean;
}

// ─── MobileMenu ───────────────────────────────────────────────────────────────

export default function MobileMenu({
  isOpen,
  onClose,
  pathname,
  navItems,
  authLinks,
  userLinks,
  user,
}: MobileMenuProps) {
  return (
    <>
      {/* Backdrop overlay */}
      <div
        role="presentation"
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer panel */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-72 bg-white dark:bg-[#1e293b] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* ── Drawer Header ─────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border dark:border-secondary">
          <div className="flex items-center gap-2">
            <GraduationCap
              size={22}
              className="text-primary"
              aria-hidden="true"
            />
            <span className="font-bold text-base text-text-primary dark:text-surface">
              LearnHub
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 rounded-full hover:bg-primary-light text-text-secondary hover:text-primary-dark transition-colors duration-200"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* ── Drawer Body ───────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6">

          {/* Navigation Links */}
          <nav aria-label="Mobile navigation links">
            <ul className="flex flex-col gap-1" role="list">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200",
                        isActive
                          ? "bg-primary-light dark:bg-secondary text-primary-dark dark:text-surface font-semibold"
                          : "text-text-secondary hover:bg-primary-light dark:hover:bg-secondary hover:text-primary-dark dark:hover:text-surface"
                      )}
                    >
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="w-1 h-5 rounded-full bg-primary shrink-0"
                        />
                      )}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <hr className="border-border dark:border-secondary" />

          {/* User Section */}
          {user ? (
            <div className="flex flex-col gap-3">
              {/* Profile row */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface dark:bg-secondary">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary shrink-0">
                  <Image
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    alt="User profile picture"
                    fill
                    unoptimized
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary dark:text-surface">
                    John Doe
                  </p>
                  <p className="text-xs text-text-secondary">Student</p>
                </div>
              </div>

              {/* Dashboard link */}
              <Link
                href={userLinks.dashboard.href}
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-primary-light dark:bg-secondary text-primary-dark dark:text-surface hover:bg-primary-light-hover dark:hover:bg-secondary-light transition-colors duration-200"
              >
                <LayoutDashboard size={16} aria-hidden="true" />
                {userLinks.dashboard.label}
              </Link>

              {/* Logout */}
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:bg-danger-light dark:hover:bg-danger-darker hover:text-danger-dark dark:hover:text-danger transition-colors duration-200"
              >
                <LogOut size={16} aria-hidden="true" />
                {userLinks.logout.label}
              </button>
            </div>
          ) : (
          <div className="flex flex-col gap-3">
            <Link
              href={authLinks.login.href}
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary-hover active:bg-primary-active transition-colors duration-200 shadow-sm"
            >
              <LogIn size={16} aria-hidden="true" />
              {authLinks.login.label}
            </Link>
            <Link
              href={authLinks.register.href}
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border border-primary text-primary hover:bg-primary/5 active:bg-primary/10 transition-colors duration-200"
            >
              {authLinks.register.label}
            </Link>
          </div>
          )}
        </div>
      </div>
    </>
  );
}
