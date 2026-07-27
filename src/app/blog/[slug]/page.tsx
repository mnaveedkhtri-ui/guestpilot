import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Eye, Folder, List } from "lucide-react";
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

type Heading = { text: string; id: string; level: 2 | 3 };

function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split("\n");
  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.*)$/);
    const h3Match = line.match(/^###\s+(.*)$/);
    if (h2Match) {
      headings.push({ text: h2Match[1].trim(), id: slugify(h2Match[1]), level: 2 });
    } else if (h3Match) {
      headings.push({ text: h3Match[1].trim(), id: slugify(h3Match[1]), level: 3 });
    }
  }
  return headings;
}

// Lightweight markdown to HTML converter, no external dependency required.
// Uses explicit Tailwind classes because Tailwind's preflight reset strips
// default heading font-size/margin and default list bullets/padding.
// Headings get an id attribute so the table of contents can link to them.
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
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');

  // Headings, explicit classes since Tailwind preflight strips default heading styles.
  // Each heading gets an id derived from its text so the TOC can link directly to it.
  html = html.replace(/^### (.*$)/gim, (_m, text) => {
    const id = slugify(text);
    return `<h3 id="${id}" class="text-2xl font-bold text-white mt-8 mb-3 scroll-mt-24">${text}</h3>`;
  });
  html = html.replace(/^## (.*$)/gim, (_m, text) => {
    const id = slugify(text);
    return `<h2 id="${id}" class="text-3xl font-bold text-white mt-10 mb-4 scroll-mt-24">${text}</h2>`;
  });

  // Split into blocks by blank lines
  const blocks = html.split(/\n\s*\n/);

  const renderedBlocks = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";

    // Already a heading or image, leave as-is
    if (/^<h[23]/.test(trimmed) || /^<img/.test(trimmed)) {
      return trimmed;
    }

    // Table block: a line of | cells, a |---|---| separator line, then more | cell lines
    const tableLines = trimmed.split("\n").filter((line) => line.trim().startsWith("|"));
    if (
      tableLines.length >= 2 &&
      /^\|?[\s-:|]+\|?$/.test(tableLines[1].trim())
    ) {
      const parseRow = (line: string) =>
        line
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((cell) => cell.trim());

      const headerCells = parseRow(tableLines[0]);
      const bodyRows = tableLines.slice(2).map(parseRow);

      const theadHtml = `<thead><tr>${headerCells
        .map(
          (cell) =>
            `<th class="text-left text-white font-semibold px-4 py-3 border-b border-gray-700 bg-gray-900/60">${cell}</th>`
        )
        .join("")}</tr></thead>`;

      const tbodyHtml = `<tbody>${bodyRows
        .map(
          (row) =>
            `<tr class="border-b border-gray-800">${row
              .map((cell) => `<td class="px-4 py-3 text-gray-300">${cell}</td>`)
              .join("")}</tr>`
        )
        .join("")}</tbody>`;

      return `<div class="overflow-x-auto my-6"><table class="w-full border-collapse text-sm">${theadHtml}${tbodyHtml}</table></div>`;
    }

    // Unordered list block, explicit classes since Tailwind preflight removes default bullets
    if (/^-\s/.test(trimmed)) {
      const items = trimmed
        .split("\n")
        .filter((line) => line.trim().startsWith("-"))
        .map((line) => `<li class="mb-2">${line.replace(/^-\s*/, "")}</li>`)
        .join("");
      return `<ul class="list-disc list-outside pl-6 space-y-1 my-4 text-gray-300">${items}</ul>`;
    }

    // Ordered list block
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed
        .split("\n")
        .filter((line) => /^\d+\./.test(line.trim()))
        .map((line) => `<li class="mb-2">${line.replace(/^\d+\.\s*/, "")}</li>`)
        .join("");
      return `<ol class="list-decimal list-outside pl-6 space-y-1 my-4 text-gray-300">${items}</ol>`;
    }

    // Regular paragraph
    return `<p class="mb-5 text-gray-300 leading-relaxed">${trimmed.replace(/\n/g, "<br/>")}</p>`;
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
  const headings = extractHeadings(post.content);

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

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent pb-1 leading-[1.2]">
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

        {/* Table of Contents */}
        {headings.length > 0 && (
          <nav className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-10">
            <div className="flex items-center gap-2 text-sm font-bold text-white mb-4">
              <List size={16} className="text-blue-400" />
              Table of Contents
            </div>
            <ul className="space-y-2 text-sm">
              {headings.map((h) => (
                <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
                  <a
                    href={`#${h.id}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Content */}
        <article
          className="max-w-none"
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
