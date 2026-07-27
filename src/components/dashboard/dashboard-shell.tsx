"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function DashboardShell({ 
  children, 
  workspaceName, 
  credits, 
  userEmail, 
  userName 
}: { 
  children: React.ReactNode;
  workspaceName: string;
  credits: number;
  userEmail: string;
  userName: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-ink">
      <Sidebar 
        workspaceName={workspaceName} 
        credits={credits} 
        userEmail={userEmail}
        isMobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar 
          userName={userName} 
          userEmail={userEmail} 
          onMenuClick={() => setMobileOpen(true)} 
        />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
