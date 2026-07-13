"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  GraduationCap,
} from "@/components/shared/Icons";
import { cn } from "@/lib/utils";
import ActiveLink, { type NavItem } from "@/components/shared/ActiveLink";
import MobileMenu from "@/components/shared/MobileMenu";
import ThemeToggle from "@/components/shared/ThemeToggle";
import ProfileDropdown from "@/components/shared/ProfileDropdown";
import { signOut } from "@/lib/auth-client";
import CustomToast from "@/components/shared/CustomToast";

// ─── Navigation Data ──────────────────────────────────────────────────────────

const PUBLIC_NAV_ITEMS: NavItem[] = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "All Courses", href: "/courses" },
  { id: 3, label: "About", href: "/about" },
  { id: 4, label: "Contact", href: "/contact" },
];

const PRIVATE_NAV_ITEMS: NavItem[] = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "All Courses", href: "/courses" },
  { id: 3, label: "My Learning", href: "/my-learning" },
  { id: 4, label: "About", href: "/about" },
  { id: 5, label: "Contact", href: "/contact" },
];

const AUTH_LINKS = {
  login: { label: "Login", href: "/login" },
  register: { label: "Register", href: "/register" },
};


// ─── UserArea ─────────────────────────────────────────────────────────────────

function UserArea({ user, userLinks }: { user?: any, userLinks: any }) {
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href={AUTH_LINKS.login.href}
          className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold text-text-secondary dark:text-surface/80 hover:text-primary transition-colors"
        >
          {AUTH_LINKS.login.label}
        </Link>
        <Link
          href={AUTH_LINKS.register.href}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-primary text-white transition-all duration-300 shadow-sm hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
        >
          {AUTH_LINKS.register.label}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <ProfileDropdown user={{ 
        name: user?.name || "User", 
        email: user?.email || "", 
        avatarUrl: user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
      }} userLinks={userLinks} />
    </div>
  );
}

// ─── NavigationMenu ───────────────────────────────────────────────────────────

export default function NavigationMenu({ user }: { user?: any }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  const dashboardHref: Record<string, string> = {
    admin: '/dashboard/admin',
    student: '/dashboard/student',
    instructor: '/dashboard/instructor',
  };

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          CustomToast(
            'success',
            'Signed out',
            'You have been signed out successfully.',
          );
          router.push('/login');
          router.refresh();
        },
      },
    });
  };

  const dynamicUserLinks = {
    dashboard: { 
      label: "Dashboard", 
      href: dashboardHref[(user?.role as string)?.toLowerCase()] || '/dashboard' 
    },
    profile: { label: "Profile", href: "/profile" },
    logout: { label: "Logout", onClick: handleSignOut },
  };

  const currentNavItems = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "All Courses", href: "/courses" },
    { id: 3, label: "About", href: "/about" },
    { id: 4, label: "Community Forum", href: "/forum" },
    { id: 5, label: "Contact", href: "/contact" },
    ...(user?.role
      ? [
          {
            id: 6,
            label: "Dashboard",
            href: dashboardHref[(user.role as string)?.toLowerCase()] || "/",
          },
        ]
      : []),
  ];

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white/70 dark:bg-dark-bg/70 backdrop-blur-xl border-b border-border/50 dark:border-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* ── Left: Logo + Brand Name ───────────────────── */}
            <Link
              href="/"
              className="flex items-center gap-2.5 shrink-0 group"
              aria-label="LearnHub — Go to Home"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary transition-all duration-300 group-hover:bg-primary-hover group-hover:scale-105 group-hover:-rotate-3 shadow-sm group-active:scale-95">
                <GraduationCap size={20} className="text-white transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              </div>
              <span className="text-lg font-bold tracking-tight text-text-primary dark:text-surface group-hover:text-primary transition-colors duration-200">
                LearnHub
              </span>
            </Link>

            {/* ── Center: Desktop Navigation Links ─────────── */}
            <nav
              className="hidden lg:flex items-center gap-7"
              aria-label="Primary navigation"
            >
              {currentNavItems.map((item) => (
                <ActiveLink key={item.id} item={item} pathname={pathname} />
              ))}
            </nav>

            {/* ── Right: User + Hamburger ─────────── */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <UserArea user={user} userLinks={dynamicUserLinks} />

              {/* Hamburger — mobile only */}
              <button
                type="button"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isMobileOpen}
                aria-controls="mobile-drawer"
                className="lg:hidden p-2 rounded-xl border border-border dark:border-secondary text-text-secondary hover:text-primary-dark hover:bg-primary-light transition-colors duration-200"
              >
                <Menu size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────── */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        pathname={pathname}
        navItems={currentNavItems}
        authLinks={AUTH_LINKS}
        userLinks={dynamicUserLinks}
        user={user}
      />
    </>
  );
}
