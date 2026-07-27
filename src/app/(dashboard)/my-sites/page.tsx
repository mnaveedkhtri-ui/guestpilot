import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { publisherSites } from "@/db/schema";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function MySitesPage() {
  const session = await auth();
  const userId = session?.user?.id;

  // Sirf us user ki websites laayein jo login hai
  const sites = userId
    ? await db.select().from(publisherSites).where(eq(publisherSites.userId, userId))
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-text">My Submitted Sites</h1>
          <p className="text-text-muted mt-1">
            Track the approval status of websites you have listed in the directory.
          </p>
        </div>
        <Link href="/list-site">
          <Button variant="accent">+ Add New Site</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Websites</CardTitle>
          <CardDescription>Websites pending approval will not appear in the public directory yet.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {sites.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-text font-medium">No sites submitted yet</p>
              <p className="text-text-muted text-sm mt-1">
                Click "Add New Site" to list your website for sale.
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-text-muted border-b border-border">
                  <th className="font-medium px-5 py-3">Domain</th>
                  <th className="font-medium px-5 py-3">Niche</th>
                  <th className="font-medium px-5 py-3">Price</th>
                  <th className="font-medium px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {sites.map((site) => (
                  <tr key={site.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 text-text font-medium">{site.domain}</td>
                    <td className="px-5 py-3 text-text-muted">{site.niche}</td>
                    <td className="px-5 py-3 text-text-muted">${site.price}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        site.status === 'approved' ? 'bg-green-500/10 text-green-400' : 
                        site.status === 'rejected' ? 'bg-red-500/10 text-red-400' : 
                        'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {site.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
