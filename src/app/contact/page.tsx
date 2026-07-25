"use client";

import { useState } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");
    const formData = new FormData(e.currentTarget);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      setStatus("Message sent successfully! We will get back to you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        
        {/* Header */}
        <div className="mb-16 text-center border-b border-gray-800 pb-10">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent mb-4">
            Contact Us
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a question about Guest Pilot? Need help with your outreach campaigns? We are here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 transition-all duration-500 hover:border-blue-500/50 flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Email Support</h3>
                <p className="text-gray-400 text-sm mb-2">For general queries and support.</p>
                <a href="mailto:naveedkhtri7@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  naveedkhtri7@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 transition-all duration-500 hover:border-blue-500/50 flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">WhatsApp</h3>
                <p className="text-gray-400 text-sm mb-2">For quick questions and fast responses.</p>
                <a href="https://wa.me/92323219981" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  +92 3323219981
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 bg-gray-900/50 border border-gray-800 rounded-xl p-8">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <input 
                type="email" 
                name="email" 
                required 
                className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea 
                name="message" 
                rows={4} 
                required 
                className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" 
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02]"
            >
              Send Message <Send size={16} />
            </button>
            {status && <p className="text-center text-sm text-gray-400 pt-2">{status}</p>}
          </form>
          
        </div>
      </div>
    </div>
  );
}
