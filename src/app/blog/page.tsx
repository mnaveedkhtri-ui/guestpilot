import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, User, Eye, Folder } from "lucide-react";

export const metadata: Metadata = {
  title: "SEO & Link Building Blog | Guest Pilot",
  description: "Learn the latest guest post strategies, link building tactics, and SEO tips to improve your search engine rankings.",
};

// Sample data (Aap ise future mein DB se replace kar sakte hain)
const posts = [
  {
    slug: "guest-post-outreach-guide",
    title: "The Ultimate Guest Post Outreach Guide for SEO Agencies",
    excerpt: "Learn how to craft pitches that actually get replies and build high quality backlinks for your clients in 2024.",
    date: "15 May, 2024",
    author: "Naveed Khatri",
    category: "SEO",
    views: "1.2k"
  },
  {
    slug: "domain-rating-explained",
    title: "Domain Rating vs Domain Authority: Which Metric Matters More?",
    excerpt: "A deep dive into Ahrefs DR and Moz DA. Understand the difference and learn which one you should track.",
    date: "10 May, 2024",
    author: "Naveed Khatri",
    category: "TECHNOLOGY",
    views: "850"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        
        {/* Header */}
        <div className="mb-12 border-b border-gray-800 pb-8">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
            Guest Pilot Blog
          </h1>
          <p className="text-gray-400 mt-3 text-lg">Insights, strategies, and tips for modern SEO and link building.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Blog Posts List (Left Side) */}
          <div className="lg:col-span-2 space-y-10">
            {posts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-gray-800 rounded-xl">
                <p className="text-gray-500">No blog posts published yet. Check back soon!</p>
              </div>
            ) : (
              posts.map((post) => (
                <article key={post.slug} className="group relative bg-gray-900/50 border border-gray-800 rounded-xl p-8 transition-all duration-500 hover:border-blue-500/50 hover:bg-gray-900 hover:-translate-y-1">
                  
                  {/* Meta Info Top */}
                  <div className="flex items-center flex-wrap gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                      <Folder size={14} /> {post.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User size={14} /> By: {post.author}
                    </span>
                    <span className="hidden sm:flex items-center gap-1.5">
                      <Eye size={14} /> {post.views} views
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <h2 className="text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-blue-400">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  {/* Continue Reading Button */}
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition-all duration-300 group-hover:gap-3">
                    Continue Reading 
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </article>
              ))
            )}
          </div>

          {/* Sidebar (Right Side) */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Categories */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:border-gray-700">
              <h3 className="text-lg font-bold mb-4 border-b border-gray-800 pb-3">Categories</h3>
              <ul className="space-y-3 text-sm">
                {["SEO", "TECHNOLOGY", "EDUCATION", "LEARN", "LINK BUILDING"].map((cat) => (
                  <li key={cat}>
                    <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                      <span className="w-2 h-2 bg-gray-700 rounded-full mr-3 transition-all duration-300 group-hover:bg-blue-500 group-hover:scale-125"></span>
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Archives */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:border-gray-700">
              <h3 className="text-lg font-bold mb-4 border-b border-gray-800 pb-3">Archives</h3>
              <ul className="space-y-3 text-sm">
                {["May 2024", "April 2024", "March 2024", "February 2024"].map((month) => (
                  <li key={month}>
                    <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                      <span className="w-2 h-2 bg-gray-700 rounded-full mr-3 transition-all duration-300 group-hover:bg-blue-500 group-hover:scale-125"></span>
                      {month}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
