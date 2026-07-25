import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://guests-pilot.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "GuestPilot AI",
  description: "The guest post outreach platform for teams that scale link building.",
  verification: {
    google: "wYFUIXoVNRkPCSeAExJZhbNGbE9pcbuFswY8d8GCIdw",
  },
  // --- Yahan OG Image aur Twitter Card add kiya hai ---
  openGraph: {
    title: "GuestPilot AI",
    description: "Automate your guest post outreach and link building.",
    url: siteUrl,
    siteName: "GuestPilot AI",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "GuestPilot AI",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GuestPilot AI",
    description: "Automate your guest post outreach and link building.",
    images: [`${siteUrl}/og-image.png`],
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
