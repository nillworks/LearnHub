"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  id: number;
  label: string;
  href: string;
}

export interface ActiveLinkProps {
  item: NavItem;
  pathname: string;
  onClick?: () => void;
}

// ─── ActiveLink ───────────────────────────────────────────────────────────────

export default function ActiveLink({ item, pathname, onClick }: ActiveLinkProps) {
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-out",
        isActive
          ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light shadow-sm shadow-primary/5"
          : "text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary dark:hover:text-surface"
      )}
    >
      {item.label}
    </Link>
  );
}
