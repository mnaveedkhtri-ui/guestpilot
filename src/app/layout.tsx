import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://guests-pilot.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "GuestPilot: Guest Post Outreach & Link Building Software",
  description: "Streamline link building with GuestPilot. Track guest post prospects, manage outreach campaigns, and organize your SEO pipeline in one workspace.",
  verification: {
    google: "wYFUIXoVNRkPCSeAExJZhbNGbE9pcbuFswY8d8GCIdw",
  },
  openGraph: {
    title: "GuestPilot: Guest Post Outreach & Link Building Software",
    description: "Streamline link building with GuestPilot. Track guest post prospects, manage outreach campaigns, and organize your SEO pipeline in one workspace.",
    url: "https://guests-pilot.vercel.app",
    siteName: "GuestPilot AI",
    images: [
      {
        url: "https://guests-pilot.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GuestPilot AI",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GuestPilot: Guest Post Outreach & Link Building Software",
    description: "Streamline link building with GuestPilot. Track guest post prospects, manage outreach campaigns, and organize your SEO pipeline in one workspace.",
    images: ["https://guests-pilot.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-ink text-text">{children}</body>
    </html>
  );
}
