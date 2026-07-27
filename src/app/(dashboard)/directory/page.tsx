import { Metadata } from "next";
import { db } from "@/db";
import { publisherSites } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth"; // Admin check ke liye
import { Globe2, Mail, Tag } from "lucide-react";
import { DeleteSiteButton } from "./delete-site-button"; // Naya button import kiya

export const metadata: Metadata = {
  title: "Publisher Directory | Buy Guest Posts | Guest Pilot",
  description: "Browse high authority websites to buy guest posts and backlinks for your SEO clients.",
};

export default async function DirectoryPage() {
  let sites: typeof publisherSites.$inferSelect[] = [];
  
  // Admin check
  const session = await auth();
  const isAdmin = session?.user?.email === "naveedkhtri7@gmail.com";

  try {
    sites = await db.select().from(publisherSites).where(eq(publisherSites.status, "approved"));
  } catch (e) {
    sites = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-text">Publisher Directory</h1>
        <p className="text-text-muted mt-1">
          Browse high authority websites and buy guest posts directly from publishers.
        </p>
      </div>

      {sites.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-xl bg-surface/50">
          <p className="text-text font-medium text-lg">No websites available yet.</p>
          <p className="text-text-muted text-sm mt-2">Publishers can list their sites from the "List Your Site" page.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <div key={site.id} className="bg-surface/50 border border-border rounded-xl p-6 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1 flex flex-col">
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <Globe2 className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold text-text">{site.domain}</h2>
                </div>
                <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Tag size={12} /> {site.linkType}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-ink/50 p-2 rounded-lg">
                  <p className="text-xs text-text-muted">DR</p>
                  <p className="text-lg font-bold text-text">{site.dr}</p>
                </div>
                <div className="bg-ink/50 p-2 rounded-lg">
                  <p className="text-xs text-text-muted">Traffic</p>
                  <p className="text-lg font-bold text-text">{site.traffic.toLocaleString()}</p>
                </div>
                <div className="bg-ink/50 p-2 rounded-lg">
                  <p className="text-xs text-text-muted">Price</p>
                  <p className="text-lg font-bold text-text">${site.price}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                <span>Niche: {site.niche}</span>
              </div>

              <div className="mt-auto">
                <a 
                  href={`mailto:${site.contactEmail}?subject=Guest Post Inquiry for ${site.domain}`}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail size={16} /> Contact Publisher
                </a>
                
                {/* Sirf Admin ko Delete ka button dikhega */}
                {isAdmin && (
                  <DeleteSiteButton domain={site.domain} />
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
