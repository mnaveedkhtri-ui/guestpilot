import { eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { prospects, campaigns } from "@/db/schema";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

async function getStats(workspaceId: string) {
  const [prospectCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(prospects)
    .where(eq(prospects.workspaceId, workspaceId));

  const [contactedCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(prospects)
    .where(
      sql`${prospects.workspaceId} = ${workspaceId} and ${prospects.status} != 'new'`
    );

  const [publishedCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(prospects)
    .where(
      sql`${prospects.workspaceId} = ${workspaceId} and ${prospects.status} = 'published'`
    );

  const [campaignCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(campaigns)
    .where(eq(campaigns.workspaceId, workspaceId));

  return {
    prospects: prospectCount?.count ?? 0,
    contacted: contactedCount?.count ?? 0,
    published: publishedCount?.count ?? 0,
    campaigns: campaignCount?.count ?? 0,
  };
}

export default async function DashboardOverviewPage() {
  const session = await auth();
  const workspaceId = session?.workspace?.id;
  const stats = workspaceId
    ? await getStats(workspaceId)
    : { prospects: 0, contacted: 0, published: 0, campaigns: 0 };

  const cards = [
    { label: "Total prospects", value: stats.prospects },
    { label: "In outreach", value: stats.contacted },
    { label: "Published", value: stats.published },
    { label: "Active campaigns", value: stats.campaigns },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-text">Overview</h1>
        <p className="text-text-muted mt-1">
          Here&apos;s what&apos;s happening in {session?.workspace?.name ?? "your workspace"}.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent>
              <p className="text-sm text-text-muted">{card.label}</p>
              <p className="font-display text-3xl font-semibold text-text mt-2">
                {card.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Get started</CardTitle>
          <CardDescription>
            Your workspace is ready. Add your first prospect to start tracking outreach.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-text-muted">
          Head to <span className="text-text font-medium">Prospects</span> to add a
          website, or <span className="text-text font-medium">Campaigns</span> to start
          organizing outreach.
        </CardContent>
      </Card>
    </div>
  );
}
