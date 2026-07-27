"use client";

import { useState } from "react";
import { ShoppingCart, Loader2, Send } from "lucide-react";

export function OrderButton({ siteId, domain, price }: { siteId: string; domain: string; price: number }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Order ko Database mein save karein
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publisherSiteId: siteId,
          buyerName: name,
          buyerEmail: email,
          articleTopic: topic,
          specialInstructions: instructions,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // 2. WhatsApp ka message prepare karein
        const adminWhatsApp = "923323219981"; // Aapka WhatsApp number
        const message = `*New Guest Post Order!*%0A%0A*Order ID:* ${data.orderId}%0A*Website:* ${domain}%0A*Price:* $${price}%0A%0A*Buyer Details:*%0AName: ${name}%0AEmail: ${email}%0A%0A*Article Topic:*%0A${topic}%0A%0A*Special Instructions:*%0A${instructions || "None"}%0A%0AI will process the payment now. Please confirm.`;
        
        // 3. WhatsApp par redirect karein
        window.open(`https://wa.me/${adminWhatsApp}?text=${message}`, "_blank");
        
        setOpen(false);
        // Form reset
        setName("");
        setEmail("");
        setTopic("");
        setInstructions("");
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <ShoppingCart size={16} /> Order Now (${price})
      </button>

      {open && (
        // Background Overlay (Click karne se band ho jayega)
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)} 
        >
          {/* Popup Card (Click karne se band nahi hoga) */}
          <div 
            className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Order Guest Post</h3>
              <span className="text-sm text-gray-400">{domain}</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-gray-400">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-400">Your Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-400">Article Topic / Anchor Text</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Best SEO Tools 2024"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-400">Special Instructions (Optional)</label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any specific URLs or guidelines?"
                ></textarea>
              </div>

              <div className="flex justify-between rounded-lg bg-gray-800 p-3 text-sm text-gray-300">
                <span>Total Price:</span>
                <span className="font-bold text-white">${price}</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-lg border border-gray-600 py-2 text-gray-300 transition-colors hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-green-600 py-2 text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={16} />}
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
