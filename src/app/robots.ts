import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://guests-pilot.vercel.app";
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/prospects", "/campaigns", "/settings", "/api", "/finder", "/upgrade"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
