import { Metadata } from "next";
import { Rocket, Target, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Guest Pilot - Smart Guest Post Outreach Tool",
  description: "Learn how Guest Pilot helps SEO agencies and marketers find high authority websites, automate outreach, and build powerful backlinks.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        
        {/* Header */}
        <div className="mb-16 text-center border-b border-gray-800 pb-10">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent mb-4">
            About Guest Pilot
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We are on a mission to make link building organized, transparent, and effective for SEO professionals worldwide.
          </p>
        </div>

        {/* Main Content Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 transition-all duration-500 hover:border-blue-500/50 hover:-translate-y-1">
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
              <Target size={24} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              Guest Pilot is built for SEO professionals, agencies, and content marketers who want to scale their link building efforts without spending endless hours on manual research. We understand that finding the right websites and tracking outreach campaigns can be messy.
            </p>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 transition-all duration-500 hover:border-blue-500/50 hover:-translate-y-1">
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
              <Rocket size={24} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Our Platform</h2>
            <p className="text-gray-400 leading-relaxed">
              Our platform brings prospecting, domain rating analysis, email outreach, and campaign management into one single dashboard. You can easily identify high authority domains, track your email pitches, and monitor which articles go live. Less spreadsheets, more quality backlinks.
            </p>
          </div>
        </div>

        {/* Commitment Section */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-10 text-center transition-all duration-500 hover:border-gray-700">
          <div className="h-12 w-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5 mx-auto">
            <Users size={24} />
          </div>
          <h2 className="text-2xl font-bold mb-3">Built for Teams</h2>
          <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto">
            We are committed to providing a clean, fast, and reliable tool that helps you grow your search engine rankings effectively. Whether you are building links for a startup or managing multiple client campaigns, Guest Pilot gives you the structure you need to succeed.
          </p>
        </div>

      </div>
    </div>
  );
}
