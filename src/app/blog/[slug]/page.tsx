import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Eye, Folder } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${title} | Guest Pilot Blog`,
    description: "Read our latest insights on SEO and link building strategies.",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const formattedTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        
        {/* Back Button with Animation */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors mb-10 group">
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <div className="mb-10">
          <div className="flex items-center flex-wrap gap-4 text-xs text-gray-500 mb-4">
            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
              <Folder size={14} /> SEO
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> May 15, 2024
            </span>
            <span className="flex items-center gap-1.5">
              <User size={14} /> By: Naveed Khatri
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Eye size={14} /> 1.2k views
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
            {formattedTitle}
          </h1>
        </div>

        {/* Article Content */}
        <article className="prose prose-invert max-w-none">
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              This is the high quality content area for your blog post. When you write your actual article, you will replace this text. The design is optimized for readability, featuring a clean, dark interface that makes the text pop.
            </p>
            <p>
              We focus on natural language without em dashes to keep the reading experience smooth. The layout is fully responsive, meaning it looks stunning on both mobile phones and large desktop monitors.
            </p>
            <h2 className="text-2xl font-bold text-white mt-8">Why Link Building Matters</h2>
            <p>
              Link building remains one of the most important ranking factors in SEO. By securing guest posts on high authority domains, you signal to search engines that your site is trustworthy and relevant.
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-400 my-8">
              Good SEO is not about tricking Google. It is about partnering with Google to provide the best search results.
            </blockquote>
            <p>
              Guest Pilot helps you manage this entire process. From finding the right prospects to tracking your published links, everything is organized in one beautiful dashboard.
            </p>
          </div>
        </article>

        {/* Footer CTA */}
        <div className="mt-16 pt-10 border-t border-gray-800 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to scale your outreach?</h3>
          <Link href="/register" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105">
            Create your workspace
          </Link>
        </div>
      </div>
    </div>
  );
}
