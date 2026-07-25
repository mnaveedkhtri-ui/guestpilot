"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");
    const formData = new FormData(e.currentTarget);
    
    try {
      // Yahan aap future mein API ya Email service laga sakte hain
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      setStatus("Message sent successfully! We will get back to you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-white mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="text-gray-300 space-y-4">
          <p>Have a question about Guest Pilot? Need help with your outreach campaigns? We are here to help.</p>
          <div className="space-y-2">
            <p><strong className="text-white">Email:</strong> naveedkhtri7@gmail.com</p>
            <p><strong className="text-white">WhatsApp:</strong> +92 3323219981</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900/50 p-6 rounded-xl border border-gray-800">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
            <input type="text" name="name" required className="w-full bg-gray-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input type="email" name="email" required className="w-full bg-gray-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
            <textarea name="message" rows={4} required className="w-full bg-gray-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
            Send Message
          </button>
          {status && <p className="text-center text-sm text-gray-400">{status}</p>}
        </form>
      </div>
    </div>
  );
}
