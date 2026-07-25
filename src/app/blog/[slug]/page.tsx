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

        {/* Article Content (Aap yahan apna content likh sakte hain) */}
        <article className="prose prose-invert max-w-none">
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              Yahan aapka blog post content aayega. Jab aap koi naya post banayenge, toh is file mein apna high-quality, SEO-optimized content daal sakte hain.
            </p>
            <p>
              Humne dark theme aur clean typography use ki hai taake aapke readers ko padhne mein maza aaye aur Google ko bhi ye content pasand aaye.
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
