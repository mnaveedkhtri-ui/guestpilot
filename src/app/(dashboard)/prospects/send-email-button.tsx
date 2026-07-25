"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

export function SendEmailButton({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("Guest Post Proposal");
  const [content, setContent] = useState("Hi there, I would love to write a high quality guest post for your website. Let me know if you are open to this!");

  // Ye function Gmail ko open karega
  const handleSend = () => {
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(content)}`;
    window.open(mailtoLink, "_blank");
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={!email} // Agar email nahi hai toh button disable hoga
        className="text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-30"
        title={email ? "Send Email" : "No email provided"}
      >
        <Mail className="h-4 w-4" />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-xl font-bold text-white">Send Outreach Email</h3>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">To</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm opacity-60"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Message</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 border border-gray-600 text-gray-300 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="h-4 w-4" />
                Open in Gmail
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
