import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://guests-pilot.vercel.app"),
  title: "GuestPilot AI: Outreach Tool",
  description: "Automate guest post outreach and link building.",
  verification: {
    google: "wYFUIXoVNRkPCSeAExJZhbNGbE9pcbuFswY8d8GCIdw",
  },
  openGraph: {
    title: "GuestPilot AI: Outreach Tool",
    description: "Automate guest post outreach and link building.",
    url: "https://guests-pilot.vercel.app",
    siteName: "GuestPilot AI",
    images: [
      {
        url: "https://guests-pilot.vercel.app/og-image.png", // Direct link
        width: 1200,
        height: 630,
        alt: "GuestPilot AI",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GuestPilot AI: Outreach Tool",
    description: "Automate guest post outreach and link building.",
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
