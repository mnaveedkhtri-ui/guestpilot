"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Landing page ke hash links
const HASH_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="font-display text-lg font-semibold text-text">
          GuestPilot <span className="text-accent">AI</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {/* Naye Page Links */}
          <Link href="/blog" className="text-sm text-text-muted hover:text-text transition-colors">
            Blog
          </Link>
          <Link href="/directory" className="text-sm text-text-muted hover:text-text transition-colors">
            Directory
         </Link>
          <Link href="/contact" className="text-sm text-text-muted hover:text-text transition-colors">
            Contact
          </Link>
          
          {/* Landing Page Hash Links */}
          {HASH_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="accent" size="sm">
              Start free
            </Button>
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden text-text-muted"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-ink px-5 py-4 space-y-4">
          {/* Naye Page Links for Mobile */}
          <Link href="/blog" className="block text-sm text-text-muted hover:text-text" onClick={() => setOpen(false)}>
            Blog
          </Link>
          <Link href="/contact" className="block text-sm text-text-muted hover:text-text" onClick={() => setOpen(false)}>
            Contact
          </Link>

          {/* Landing Page Hash Links for Mobile */}
          {HASH_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm text-text-muted hover:text-text"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          
          <div className="flex flex-col gap-2 pt-2">
            <Link href="/login">
              <Button variant="secondary" className="w-full" onClick={() => setOpen(false)}>
                Sign in
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="accent" className="w-full" onClick={() => setOpen(false)}>
                Start free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
