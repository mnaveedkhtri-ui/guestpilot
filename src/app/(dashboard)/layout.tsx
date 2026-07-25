import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Credits ko session se nikalen (default 10 rakhen)
  const credits = (session as any).credits ?? 10;

  return (
    <div className="flex min-h-screen bg-ink">
      {/* Credits prop ko Sidebar mein pass karein */}
      <Sidebar 
        workspaceName={session.workspace?.name ?? "Your workspace"} 
        credits={credits} 
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          userName={session.user.name ?? "Account"}
          userEmail={session.user.email ?? ""}
        />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
