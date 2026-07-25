"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl });
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Google Button */}
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-white text-black font-medium py-2.5 px-4 rounded-md hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.7663 12.2764C23.7663 11.4607 23.7001 10.6406 23.559 9.84009H12.2402V14.4591H18.722C18.453 15.9494 17.5888 17.2678 16.3233 18.1056V21.1039H20.1903C22.4611 19.0139 23.7663 15.9273 23.7663 12.2764Z" fill="#4285F4"/>
          <path d="M12.2401 24.0001C15.4766 24.0001 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2516 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.70293 24.0001 12.2401 24.0001Z" fill="#34A853"/>
          <path d="M5.50277 14.3003C5.00011 12.8099 5.00011 11.1961 5.50277 9.70575V6.61481H1.51674C-0.185266 9.90558 -0.185266 14.1005 1.51674 17.3912L5.50277 14.3003Z" fill="#FBBC04"/>
          <path d="M12.2401 4.74966C13.9509 4.74966 15.5044 5.33614 16.7203 6.48221L20.2742 2.92827C18.2014 0.989757 15.4721 -0.0641776 12.2401 0.000325544C7.70293 0.000325544 3.55371 2.55701 1.5166 6.61481L5.50264 9.70575C6.45946 6.8661 9.11388 4.74966 12.2401 4.74966Z" fill="#EA4335"/>
        </svg>
        {loading ? "Redirecting..." : "Continue with Google"}
      </button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-text-muted">Or</span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleCredentialsSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="w-full bg-input border border-border rounded-md px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary" 
            placeholder="you@example.com" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className="w-full bg-input border border-border rounded-md px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary" 
            placeholder="••••••••" 
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full" size="lg" variant="accent">
          {loading ? "Signing in..." : "Sign in with Email"}
        </Button>
      </form>
    </div>
  );
}
