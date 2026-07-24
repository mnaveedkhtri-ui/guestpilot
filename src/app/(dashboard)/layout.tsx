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

  // Middleware already guards these routes, but a Server Component layout
  // re-checks so this shell never renders without a valid session — e.g.
  // if middleware matchers are ever edited without updating this file too.
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-ink">
      <Sidebar workspaceName={session.workspace?.name ?? "Your workspace"} />
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
