import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Guest Pilot",
  description: "Review the terms and conditions for using Guest Pilot, our guest post outreach and link building management software.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-white mb-6">Terms and Conditions</h1>
      <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
        <p>Welcome to Guest Pilot. By accessing or using our platform, you agree to be bound by these terms and conditions. Please read them carefully before using our services.</p>
        <h2 className="text-2xl font-semibold text-white mt-6 mb-2">Use of Service</h2>
        <p>You may use Guest Pilot only for lawful purposes. You agree not to use the service to send unsolicited spam emails, engage in illegal link schemes, or violate any applicable laws. You are solely responsible for the outreach campaigns you run through our platform.</p>
        <h2 className="text-2xl font-semibold text-white mt-6 mb-2">Account Responsibility</h2>
        <p>You are responsible for maintaining the security of your account and password. Guest Pilot cannot be liable for any loss or damage from your failure to comply with this security obligation.</p>
        <h2 className="text-2xl font-semibold text-white mt-6 mb-2">Modifications to Service</h2>
        <p>We reserve the right to modify or discontinue the service at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of our services.</p>
        <h2 className="text-2xl font-semibold text-white mt-6 mb-2">Contact Information</h2>
        <p>For any questions regarding these terms, please reach out to us at naveedkhtri7@gmail.com.</p>
      </div>
    </div>
  );
}
