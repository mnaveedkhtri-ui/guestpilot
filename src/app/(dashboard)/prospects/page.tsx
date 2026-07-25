import { desc, eq } from "drizzle-orm";
import { SendEmailButton } from "./send-email-button";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { prospects } from "@/db/schema";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AddProspectForm } from "./add-prospect-form";
import { StatusSelect } from "./status-select";
import { DomainRatingCell } from "./domain-rating-cell";
import { DeleteButton } from "./delete-button"; // Naya import

export default async function ProspectsPage() {
  const session = await auth();
  const workspaceId = session?.workspace?.id;

  const rows = workspaceId
    ? await db
        .select()
        .from(prospects)
        .where(eq(prospects.workspaceId, workspaceId))
        .orderBy(desc(prospects.createdAt))
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-text">Prospects</h1>
        <p className="text-text-muted mt-1">
          Websites you&apos;re researching or actively pitching for a guest post.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add a prospect</CardTitle>
          <CardDescription>Add a website domain to start tracking outreach.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddProspectForm />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-text font-medium">No prospects yet</p>
              <p className="text-text-muted text-sm mt-1">
                Add your first website above to start building your outreach list.
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-text-muted border-b border-border">
                  <th className="font-medium px-5 py-3">Domain</th>
                  <th className="font-medium px-5 py-3">DR</th>
                  <th className="font-medium px-5 py-3">Contact</th>
                  <th className="font-medium px-5 py-3">Status</th>
                  <th className="font-medium px-5 py-3">Added</th>
                  <th className="font-medium px-5 py-3 text-right">Actions</th>
                  <th className="font-medium px-5 py-3 text-right">Email</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 text-text font-medium">{row.domain}</td>
                    <td className="px-5 py-3">
                      <DomainRatingCell
                        prospectId={row.id}
                        domainRating={row.domainRating}
                      />
                    </td>
                    <td className="px-5 py-3 text-text-muted">
                      {row.contactEmail ?? "-"}
                    </td>
                    <td className="px-5 py-3">
                      <StatusSelect prospectId={row.id} status={row.status} />
                    </td>
                    <td className="px-5 py-3 text-text-muted">
                      {row.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <DeleteButton id={row.id} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      {/* Yahan prospectId ki jagah email pass karna hai */}
                      <SendEmailButton email={row.contactEmail ?? ""} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <p className="text-xs text-text-muted">
        Domain Rating by{" "}
        <a
          href="https://ahrefs.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-hover"
        >
          Ahrefs
        </a>
        .
      </p>
    </div>
  );
}
