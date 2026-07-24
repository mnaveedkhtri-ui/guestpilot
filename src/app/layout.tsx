import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://guestpilot-three.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "GuestPilot AI",
  description: "The guest post outreach platform for teams that scale link building.",
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
