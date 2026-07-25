import { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Guest Pilot",
  description: "Read the Guest Pilot privacy policy to understand how we handle your data and protect your privacy while using our outreach tool.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        
        {/* Header */}
        <div className="mb-12 text-center border-b border-gray-800 pb-10">
          <div className="h-14 w-14 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5 mx-auto">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 transition-all duration-500 hover:border-gray-700">
            <p>At Guest Pilot, we take your privacy seriously. This privacy policy explains how we collect, use, and protect your information when you use our guest post outreach platform.</p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Information We Collect</h2>
            <p>We collect information that you provide directly to us, such as your name, email address, and campaign data. We also automatically collect certain technical information, including your IP address, browser type, and usage data through cookies and similar technologies.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-3">How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services. This includes managing your outreach campaigns, displaying domain metrics, communicating with you about updates, and monitoring for fraudulent activity.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or disclosure. Your campaign data is stored securely and is never shared with third parties without your consent.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Contact Us</h2>
            <p>If you have any questions about this privacy policy, please contact us at <a href="mailto:naveedkhtri7@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">naveedkhtri7@gmail.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
