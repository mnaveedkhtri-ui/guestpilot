import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-display text-base font-semibold text-text">
            GuestPilot <span className="text-accent">AI</span>
          </p>
          <p className="text-sm text-text-muted mt-2">
            Guest post outreach, organized in one place.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-3">
            Product
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#features" className="text-text-muted hover:text-text">
                Features
              </a>
            </li>
            <li>
              <Link href="/register" className="text-text-muted hover:text-text">
                Get started
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-3">
            Company
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#faq" className="text-text-muted hover:text-text">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-3">
            Account
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/login" className="text-text-muted hover:text-text">
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/register" className="text-text-muted hover:text-text">
                Create workspace
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-text-muted">
          © {new Date().getFullYear()} GuestPilot AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
