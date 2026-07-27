import { Metadata } from "next";
import { db } from "@/db";
import { publisherSites } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { Globe2, Tag, TrendingUp, BarChart2 } from "lucide-react";
import { DeleteSiteButton } from "./delete-site-button";
import { OrderButton } from "./order-button";

export const metadata: Metadata = {
  title: "Publisher Directory | Buy Guest Posts | Guest Pilot",
  description: "Browse high authority websites to buy guest posts and backlinks for your SEO clients.",
};

export default async function DirectoryPage() {
  let sites: typeof publisherSites.$inferSelect[] = [];
  
  const session = await auth();
  const isAdmin = session?.user?.email === "naveedkhtri7@gmail.com";

  try {
    sites = await db.select().from(publisherSites).where(eq(publisherSites.status, "approved"));
  } catch (e) {
    sites = [];
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-text">Publisher Directory</h1>
        <p className="text-text-muted mt-2 text-lg">
          Browse high authority websites and buy guest posts directly from publishers.
        </p>
      </div>

      {sites.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-xl bg-surface/50">
          <p className="text-text font-medium text-xl">No websites available yet.</p>
          <p className="text-text-muted text-sm mt-2">Publishers can list their sites from the "List Your Site" page.</p>
        </div>
      ) : (
        // 2 columns rakhe hain taake cards bade aur clean lagain
        <div className="grid md:grid-cols-2 gap-8">
          {sites.map((site) => (
            <div key={site.id} className="bg-surface/50 border border-border rounded-2xl p-8 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1 flex flex-col">
              
              {/* Top Section: Domain, Niche aur Delete Icon */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Globe2 className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-text">{site.domain}</h2>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                      {site.niche}
                    </span>
                    <span className="bg-surface-2 text-text-muted text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                      <Tag size={10} /> {site.linkType}
                    </span>
                  </div>
                </div>
                {/* Admin ko sirf icon dikhega */}
                {isAdmin && (
                  <DeleteSiteButton domain={site.domain} />
                )}
              </div>

              {/* Metrics Section (Clean aur Spacious) */}
              <div className="grid grid-cols-3 gap-4 mb-8 border-y border-border py-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <BarChart2 className="h-5 w-5 text-text-muted mb-2" />
                  <p className="text-xs text-text-muted uppercase tracking-wide">DR</p>
                  <p className="text-xl font-bold text-text mt-1">{site.dr}</p>
                </div>
                <div className="flex flex-col items-center justify-center text-center border-x border-border">
                  <TrendingUp className="h-5 w-5 text-text-muted mb-2" />
                  <p className="text-xs text-text-muted uppercase tracking-wide">Traffic</p>
                  <p className="text-xl font-bold text-text mt-1">{site.traffic.toLocaleString()}</p>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="h-5 w-5 text-green-500 mb-2 font-bold">$</div>
                  <p className="text-xs text-text-muted uppercase tracking-wide">Price</p>
                  <p className="text-xl font-bold text-green-400 mt-1">${site.price}</p>
                </div>
              </div>

              {/* Bottom Section: Order Button */}
              <div className="mt-auto">
                <OrderButton siteId={site.id} domain={site.domain} price={site.price} />
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
