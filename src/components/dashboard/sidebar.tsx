"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe2,
  Megaphone,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  <Link href="/finder" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-text-muted hover:text-text hover:bg-surface transition-colors">
  <Search className="h-4 w-4" />
  Find Prospects
</Link>
  { href: "/prospects", label: "Prospects", icon: Globe2 },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ workspaceName }: { workspaceName: string }) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="h-16 flex items-center px-5 border-b border-border">
        <Link href="/dashboard" className="font-display text-base font-semibold text-text">
          GuestPilot <span className="text-accent">AI</span>
        </Link>
      </div>

      <div className="px-5 py-3 text-xs uppercase tracking-wide text-text-muted">
        {workspaceName}
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
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
      </nav>
    </aside>
  );
}
