import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Eye, Folder } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found | Guest Pilot Blog",
    };
  }

  return {
    title: `${post.title} | Guest Pilot Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

// Lightweight markdown to HTML converter, no external dependency required.
function markdownToHtml(markdown: string): string {
  let html = markdown.trim();

  // Images: ![alt](src)
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="rounded-xl my-8 w-full" />'
  );

  // Links: [text](url)
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-400 hover:text-blue-300 underline">$1</a>'
  );

  // Bold: **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Headings
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");

  // Split into blocks by blank lines
  const blocks = html.split(/\n\s*\n/);

  const renderedBlocks = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";

    // Already a heading or image, leave as-is
    if (/^<h[23]>/.test(trimmed) || /^<img/.test(trimmed)) {
      return trimmed;
    }

    // Unordered list block
    if (/^-\s/.test(trimmed)) {
      const items = trimmed
        .split("\n")
        .filter((line) => line.trim().startsWith("-"))
        .map((line) => `<li>${line.replace(/^-\s*/, "")}</li>`)
        .join("");
      return `<ul>${items}</ul>`;
    }

    // Ordered list block
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed
        .split("\n")
        .filter((line) => /^\d+\./.test(line.trim()))
        .map((line) => `<li>${line.replace(/^\d+\.\s*/, "")}</li>`)
        .join("");
      return `<ol>${items}</ol>`;
    }

    // Regular paragraph
    return `<p>${trimmed.replace(/\n/g, "<br/>")}</p>`;
  });

  return renderedBlocks.join("\n");
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const contentHtml = markdownToHtml(post.content);

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

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
            {post.title}
          </h1>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden mb-10">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <article
          className="prose prose-invert max-w-none text-lg text-gray-300 leading-relaxed prose-headings:text-white prose-a:text-blue-400 prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

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
