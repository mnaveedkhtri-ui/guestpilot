import { Metadata } from "next";
import { ListSiteForm } from "./list-site-form";

export const metadata: Metadata = {
  title: "List Your Site | Guest Pilot",
};

export default function ListSitePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-text">List Your Website</h1>
        <p className="text-text-muted mt-1">
          Add your website to our Publisher Directory so SEO agencies can buy guest posts from you.
        </p>
      </div>
      <ListSiteForm />
    </div>
  );
}
