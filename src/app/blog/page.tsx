import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO & Link Building Blog | Guest Pilot",
  description: "Learn the latest guest post strategies, link building tactics, and SEO tips to improve your search engine rankings with Guest Pilot.",
};

const posts = [
  {
    slug: "guest-post-outreach-guide",
    title: "The Ultimate Guest Post Outreach Guide for SEO",
    excerpt: "Learn how to craft pitches that actually get replies and build high quality backlinks for your clients.",
    date: "May 15, 2024",
  },
  {
    slug: "domain-rating-vs-domain-authority",
    title: "Domain Rating vs Domain Authority: What Matters More?",
    excerpt: "Understand the difference between DR and DA and which metric you should track for your link building campaigns.",
    date: "May 10, 2024",
  }
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-white mb-2">Guest Pilot Blog</h1>
      <p className="text-gray-400 mb-10">Insights and strategies for modern SEO and link building.</p>
      
      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.slug} className="border-b border-gray-800 pb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:text-blue-400 transition-colors">
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
            <p className="text-gray-400">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="inline-block mt-3 text-blue-400 hover:text-blue-300 transition-colors">
              Read more ->
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
