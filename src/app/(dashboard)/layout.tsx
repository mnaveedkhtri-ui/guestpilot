import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { DashboardShell } from "@/components/dashboard/dashboard-shell"; // Naya wrapper

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });
  const credits = dbUser?.credits ?? 0;

  return (
    <DashboardShell
      workspaceName={session.workspace?.name ?? "Your workspace"}
      credits={credits}
      userEmail={session.user.email ?? ""}
      userName={session.user.name ?? "Account"}
    >
      {children}
    </DashboardShell>
  );
}
