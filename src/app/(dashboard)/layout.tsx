import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Direct Database se user ka current credit check karein
  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });
  const credits = dbUser?.credits ?? 0;

  return (
    <div className="flex min-h-screen bg-ink">
       <Sidebar 
        workspaceName={session.workspace?.name ?? "Your workspace"} 
        credits={credits} 
        userEmail={session.user.email} 
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
