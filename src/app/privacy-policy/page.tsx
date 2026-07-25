import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Guest Pilot",
  description: "Read the Guest Pilot privacy policy to understand how we handle your data and protect your privacy while using our outreach tool.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-white mb-6">Privacy Policy</h1>
      <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
        <p>At Guest Pilot, we take your privacy seriously. This privacy policy explains how we collect, use, and protect your information when you use our guest post outreach platform.</p>
        <h2 className="text-2xl font-semibold text-white mt-6 mb-2">Information We Collect</h2>
        <p>We collect information that you provide directly to us, such as your name, email address, and campaign data. We also automatically collect certain technical information, including your IP address, browser type, and usage data through cookies and similar technologies.</p>
        <h2 className="text-2xl font-semibold text-white mt-6 mb-2">How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services. This includes managing your outreach campaigns, displaying domain metrics, communicating with you about updates, and monitoring for fraudulent activity.</p>
        <h2 className="text-2xl font-semibold text-white mt-6 mb-2">Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or disclosure. Your campaign data is stored securely and is never shared with third parties without your consent.</p>
        <h2 className="text-2xl font-semibold text-white mt-6 mb-2">Contact Us</h2>
        <p>If you have any questions about this privacy policy, please contact us at naveedkhtri7@gmail.com.</p>
      </div>
    </div>
  );
}
