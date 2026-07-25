import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black/50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-white font-bold text-lg">Guest Pilot</h3>
            <p className="text-gray-400 text-sm">Your ultimate guest post outreach tool for SEO agencies and marketers.</p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="mailto:naveedkhtri7@gmail.com" className="hover:text-white transition-colors">naveedkhtri7@gmail.com</a></li>
              <li><a href="https://wa.me/92323219981" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+92 3323219981</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Guest Pilot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
