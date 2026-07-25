import { Metadata } from "next";
import { CheckCircle2, Sparkles, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Upgrade to Pro | Guest Pilot",
  description: "Upgrade your Guest Pilot account to get unlimited AI credits and scale your guest post outreach.",
};

export default function UpgradePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Premium Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto py-16 px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Sparkles size={14} /> Unlock Premium Features
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-text to-text-muted bg-clip-text text-transparent">
            Scale Your Outreach
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            You have used your free credits. Choose a plan to continue finding high authority websites and generating AI pitches instantly.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
          
          {/* Starter Plan */}
          <div className="group relative bg-surface/50 backdrop-blur-md border border-border rounded-2xl p-8 flex flex-col transition-all duration-500 hover:border-primary/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-text">Starter</h3>
              <p className="text-text-muted text-sm mt-1 mb-6">For freelancers scaling their link building.</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-text">$19</span>
                <span className="text-text-muted ml-1">/mo</span>
                <p className="text-xs text-text-muted mt-2">or Rs. 4,000/mo</p>
              </div>
              <ul className="space-y-4 text-sm text-text-muted mb-8 flex-grow">
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary" /> 100 AI Credits per month</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary" /> 20 Auto-Prospect Searches</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary" /> AI Pitch Generator</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary" /> Domain Rating Tracker</li>
              </ul>
              <a 
                href="https://www.lemonsqueezy.com/checkout" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-surface-2 hover:bg-border text-text text-center font-semibold py-3 rounded-xl transition-colors border border-border"
              >
                Get Starter
              </a>
            </div>
          </div>

          {/* Pro Plan (Featured) */}
          <div className="group relative bg-gradient-to-br from-primary/10 to-surface/50 backdrop-blur-md border-2 border-primary rounded-2xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-primary/30 flex items-center gap-1">
              <Zap size={12} /> MOST POPULAR
            </div>
            
            <div className="relative z-10 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-text flex items-center gap-2">
                Pro <Sparkles size={18} className="text-primary" />
              </h3>
              <p className="text-text-muted text-sm mt-1 mb-6">For agencies managing multiple clients.</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-text">$49</span>
                <span className="text-text-muted ml-1">/mo</span>
                <p className="text-xs text-text-muted mt-2">or Rs. 10,000/mo</p>
              </div>
              <ul className="space-y-4 text-sm text-text-muted mb-8 flex-grow">
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary" /> Unlimited AI Credits</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary" /> Unlimited Auto-Prospects</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary" /> Priority Support</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary" /> Early access to features</li>
              </ul>
              <a 
                href="https://www.lemonsqueezy.com/checkout" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-primary hover:bg-primary-hover text-white text-center font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 flex items-center justify-center gap-2"
              >
                Upgrade to Pro <Sparkles size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="max-w-4xl mx-auto bg-surface/50 backdrop-blur-md border border-border rounded-2xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-text mb-2">Other Payment Methods</h2>
            <p className="text-text-muted mb-8">We support secure international payments and local bank transfers for your convenience.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* International Clients */}
              <div className="bg-ink/50 border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ShieldCheck size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text">International</h3>
                </div>
                <p className="text-sm text-text-muted mb-4">
                  Click the buttons above to pay via Credit Card or PayPal through our secure gateway.
                </p>
                <p className="text-xs text-text-muted">
                  Powered by Lemonsqueezy. Credits are added to your account instantly after payment.
                </p>
              </div>

              {/* Local Clients */}
              <div className="bg-ink/50 border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Zap size={20} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-text">Local Transfer (Pakistan)</h3>
                </div>
                <div className="text-sm text-text-muted space-y-1.5 mb-4 font-mono">
                  <p>Bank: <span className="text-text">Meezan Bank</span></p>
                  <p>Title: <span className="text-text">Naveed Khatri</span></p>
                  <p>Acct: <span className="text-text">0123456789012</span></p>
                  <p>Easypaisa: <span className="text-text">0332-3219981</span></p>
                </div>
                <a 
                  href="https://wa.me/92323219981" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-hover font-medium transition-colors"
                >
                  Send screenshot on WhatsApp <ArrowRight size={14} />
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
