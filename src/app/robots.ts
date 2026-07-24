import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/prospects", "/campaigns", "/settings", "/api"],
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://guestpilot-three.vercel.app";
}
