import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Guest Pilot - Smart Guest Post Outreach Tool",
  description: "Learn how Guest Pilot helps SEO agencies and marketers find high authority websites, automate outreach, and build powerful backlinks.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-white mb-6">About Guest Pilot</h1>
      <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
        <p>
          Guest Pilot is built for SEO professionals, agencies, and content marketers who want to scale their link building efforts without spending endless hours on manual research. We understand that finding the right websites for guest posts and tracking outreach campaigns can be messy and time consuming.
        </p>
        <p>
          Our platform brings prospecting, domain rating analysis, email outreach, and campaign management into one single dashboard. You can easily identify high authority domains in your niche, track your email pitches, and monitor which articles go live. This means you spend less time managing spreadsheets and more time building quality backlinks that actually move the needle.
        </p>
        <p>
          We are committed to providing a clean, fast, and reliable tool that helps you grow your search engine rankings effectively. Whether you are building links for a startup or managing multiple client campaigns, Guest Pilot gives you the structure you need to succeed.
        </p>
      </div>
    </div>
  );
}
