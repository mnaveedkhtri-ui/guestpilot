import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, User, Eye, Folder } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "SEO & Link Building Blog | Guest Pilot",
  description: "Learn the latest guest post strategies, link building tactics, and SEO tips to improve your search engine rankings.",
};

const posts = blogPosts;

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        
        {/* Header */}
        <div className="mb-12 border-b border-gray-800 pb-8">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent pb-2 leading-[1.2]">
            Guest Pilot Blog
          </h1>
          <p className="text-gray-400 mt-3 text-lg">Insights, strategies, and tips for modern SEO and link building.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Blog Posts List (Left Side) */}
          <div className="lg:col-span-2">
            {posts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-gray-800 rounded-xl bg-gray-900/30">
                <p className="text-gray-500 text-lg">No blog posts published yet.</p>
                <p className="text-gray-600 text-sm mt-2">Check back soon for amazing SEO insights!</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {posts.map((post) => (
                <article key={post.slug} className="group relative bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:bg-gray-900 hover:-translate-y-1 flex flex-col">
                  
                  {/* Hero Image */}
                  <Link href={`/blog/${post.slug}`} className="relative w-full h-44 block overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <div className="p-6 flex flex-col flex-grow">

                  {/* Meta Info Top */}
                  <div className="flex items-center flex-wrap gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                      <Folder size={13} /> {post.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} /> {post.date}
                    </span>
                  </div>

                  <div className="flex items-center flex-wrap gap-3 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <User size={13} /> By: {post.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye size={13} /> {post.views} views
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <h2 className="text-xl font-bold mb-3 leading-snug transition-colors duration-300 group-hover:text-blue-400">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-6 text-sm flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Continue Reading Button */}
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition-all duration-300 group-hover:gap-3">
                    Continue Reading 
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  </div>
                </article>
                ))}
              </div>
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
