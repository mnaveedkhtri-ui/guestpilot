"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe2,
  Megaphone,
  Settings,
  Search,
  Zap,
  Store,
  ListChecks,
  ShieldCheck,
  Building2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/finder", label: "Find Prospects", icon: Search },
  { href: "/prospects", label: "Prospects", icon: Globe2 },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/directory", label: "Directory", icon: Building2 },
  { href: "/list-site", label: "List Your Site", icon: Store },
  { href: "/my-sites", label: "My Sites", icon: ListChecks },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ 
  workspaceName, 
  credits, 
  userEmail, 
  isMobileOpen, 
  onMobileClose 
}: { 
  workspaceName: string; 
  credits: number; 
  userEmail?: string | null;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside className={cn(
        "fixed md:sticky top-0 left-0 z-50 h-screen w-64 shrink-0 flex-col border-r border-border bg-surface transition-transform duration-300 md:flex",
        isMobileOpen ? "flex translate-x-0" : "flex -translate-x-full md:translate-x-0"
      )}>
        <div className="flex h-16 items-center justify-between px-5 border-b border-border">
          <Link href="/dashboard" className="font-display text-base font-semibold text-text">
            GuestPilot <span className="text-accent">AI</span>
          </Link>
          {/* Close button for mobile */}
          <button onClick={onMobileClose} className="md:hidden text-text-muted hover:text-text">
            <X size={20} />
          </button>
        </div>

        <div className="px-5 py-3 text-xs uppercase tracking-wide text-text-muted">
          {workspaceName}
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                onClick={onMobileClose} // Mobile par click karte hi menu band ho
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-text-muted hover:text-text hover:bg-surface-2"
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}

          {userEmail === "naveedkhtri7@gmail.com" && (
            <Link
              href="/admin-approvals"
              onClick={onMobileClose}
              className={cn(
                "flex items
