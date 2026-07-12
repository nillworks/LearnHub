"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, LogOut, User } from "@/shared/Icons";

interface ProfileDropdownProps {
  user: {
    name?: string;
    email?: string;
    avatarUrl?: string;
  };
  userLinks: {
    dashboard: { label: string; href: string };
    profile: { label: string; href: string };
    logout: { label: string };
  };
}

export default function ProfileDropdown({ user, userLinks }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Avatar Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/30 ring-offset-2 ring-offset-white dark:ring-offset-dark-bg shrink-0 transition-transform duration-300 hover:scale-105 hover:ring-primary/50 focus:outline-none focus:ring-primary/50 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Open user menu"
      >
        <Image
          src={user.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
          alt="User profile picture"
          fill
          unoptimized
          sizes="36px"
          className="object-cover"
        />
      </button>

      {/* Dropdown Menu Wrapper (provides hover bridge) */}
      <div
        className={`absolute right-0 top-full pt-2 w-56 origin-top-right transition-all duration-300 ease-out z-50 ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="w-full rounded-2xl bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-xl border border-border/50 dark:border-secondary/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] overflow-hidden">
          {/* User Info */}
          <div className="p-4 border-b border-border/30 dark:border-secondary/30 bg-primary/5 dark:bg-black/10">
            <p className="text-sm font-semibold text-text-primary dark:text-surface truncate">
              {user.name || "John Doe"}
            </p>
            <p className="text-xs text-text-secondary truncate mt-0.5">
              {user.email || "john.doe@example.com"}
            </p>
          </div>

          {/* Links */}
          <div className="p-2">
            <Link
              href={userLinks.dashboard.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary dark:text-surface/80 hover:text-primary-dark dark:hover:text-primary-light hover:bg-primary-light dark:hover:bg-secondary/60 transition-all duration-200"
            >
              <LayoutDashboard size={16} />
              {userLinks.dashboard.label}
            </Link>
            <Link
              href={userLinks.profile.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary dark:text-surface/80 hover:text-primary-dark dark:hover:text-primary-light hover:bg-primary-light dark:hover:bg-secondary/60 transition-all duration-200"
            >
              <User size={16} />
              {userLinks.profile.label}
            </Link>
          </div>

          {/* Logout */}
          <div className="p-2 border-t border-border/30 dark:border-secondary/30">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:text-danger-dark dark:hover:text-danger-light hover:bg-danger-light dark:hover:bg-danger-darker transition-all duration-200"
            >
              <LogOut size={16} />
              {userLinks.logout.label}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
