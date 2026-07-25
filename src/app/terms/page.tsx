import { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | Guest Pilot",
  description: "Review the terms and conditions for using Guest Pilot, our guest post outreach and link building management software.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        
        {/* Header */}
        <div className="mb-12 text-center border-b border-gray-800 pb-10">
          <div className="h-14 w-14 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5 mx-auto">
            <FileText size={28} />
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent mb-4">
            Terms and Conditions
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 transition-all duration-500 hover:border-gray-700">
            <p>Welcome to Guest Pilot. By accessing or using our platform, you agree to be bound by these terms and conditions. Please read them carefully before using our services.</p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Use of Service</h2>
            <p>You may use Guest Pilot only for lawful purposes. You agree not to use the service to send unsolicited spam emails, engage in illegal link schemes, or violate any applicable laws. You are solely responsible for the outreach campaigns you run through our platform.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Account Responsibility</h2>
            <p>You are responsible for maintaining the security of your account and password. Guest Pilot cannot be liable for any loss or damage from your failure to comply with this security obligation.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Modifications to Service</h2>
            <p>We reserve the right to modify or discontinue the service at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of our services.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Contact Information</h2>
            <p>For any questions regarding these terms, please reach out to us at <a href="mailto:naveedkhtri7@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">naveedkhtri7@gmail.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
