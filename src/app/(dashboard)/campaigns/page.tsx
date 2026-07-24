import { desc, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { campaigns } from "@/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddCampaignForm } from "./add-campaign-form";

const STATUS_VARIANT = {
  draft: "neutral",
  active: "success",
  paused: "accent",
  archived: "neutral",
} as const;

export default async function CampaignsPage() {
  const session = await auth();
  const workspaceId = session?.workspace?.id;

  const rows = workspaceId
    ? await db
        .select()
        .from(campaigns)
        .where(eq(campaigns.workspaceId, workspaceId))
        .orderBy(desc(campaigns.createdAt))
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-text">Campaigns</h1>
        <p className="text-text-muted mt-1">
          Group your outreach into campaigns to track progress separately.
        </p>
      </div>

      <Card>
        <CardContent>
          <AddCampaignForm />
        </CardContent>
      </Card>

      {rows.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-text font-medium">No campaigns yet</p>
            <p className="text-text-muted text-sm mt-1">
              Create your first campaign above to start organizing outreach.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rows.map((row) => (
            <Card key={row.id}>
              <CardContent>
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-text">{row.name}</p>
                  <Badge variant={STATUS_VARIANT[row.status]}>{row.status}</Badge>
                </div>
                <p className="text-xs text-text-muted mt-2">
                  Created {row.createdAt.toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
