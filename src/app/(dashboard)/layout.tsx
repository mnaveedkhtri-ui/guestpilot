import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { LandingNav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Agar user login nahi hai, toh sidebar ki jagah Landing Navbar dikhaye
  if (!session?.user?.id) {
    return (
      <div className="min-h-screen flex flex-col bg-ink text-text">
        <LandingNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    );
  }

  // Agar user login hai, toh normal Sidebar wala dashboard dikhaye
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
