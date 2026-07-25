import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, ' ')} | Guest Pilot Blog`,
    description: "Read our latest insights on SEO and link building strategies.",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  
  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <article className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-white mb-4 capitalize">
          {slug.replace(/-/g, ' ')}
        </h1>
        <p className="text-gray-400 mb-8">Published recently</p>
        
        <div className="text-gray-300 space-y-4">
          <p>This is where your high quality blog post content will go. You can easily edit this file in your codebase to add real content later.</p>
          <p>For now, this demonstrates that your dynamic routing is working perfectly. Make sure your content is natural, SEO optimized, and provides real value to SEO professionals looking to improve their link building strategies.</p>
          <p>We avoid em dashes and focus on clean, readable sentences that Google loves to rank.</p>
        </div>
      </article>
    </div>
  );
}
