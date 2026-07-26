import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Globe2,
  Megaphone,
  Users,
  KanbanSquare,
  Sparkles,
  Search,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LandingNav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import { HeroVisual } from "@/components/landing/hero-visual";
import { Reveal } from "@/components/landing/reveal";

export const metadata: Metadata = {
  title: "GuestPilot AI: Guest Post Outreach & Link Building", // 51 Characters
  description: "Automate guest post outreach and link building. Track prospects, generate AI pitches, and manage SEO campaigns in one smart workspace.", // 137 Characters
  keywords: [
    "guest post outreach software",
    "link building tool",
    "guest posting CRM",
    "outreach campaign tracker",
    "blogger outreach platform",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "GuestPilot AI: Guest Post Outreach & Link Building",
    description: "Automate guest post outreach and link building. Track prospects, generate AI pitches, and manage SEO campaigns in one smart workspace.",
    type: "website",
    url: "https://guests-pilot.vercel.app",
    images: [
      {
        url: "https://guests-pilot.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GuestPilot AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GuestPilot AI: Guest Post Outreach & Link Building",
    description: "Automate guest post outreach and link building. Track prospects, generate AI pitches, and manage SEO campaigns in one smart workspace.",
    images: ["https://guests-pilot.vercel.app/og-image.png"],
  },
};

const AVAILABLE_FEATURES = [
  {
    icon: Globe2,
    title: "Prospect tracking",
    description:
      "Add any website you're targeting for a guest post, with a contact email and notes, and see it in one list instead of a spreadsheet.",
  },
  {
    icon: KanbanSquare,
    title: "Status pipeline",
    description:
      "Move each prospect through new, contacted, in discussion, accepted, rejected, or published as the conversation moves forward.",
  },
  {
    icon: Megaphone,
    title: "Campaigns",
    description:
      "Group prospects into campaigns so a Q3 link building push doesn't get mixed up with an ongoing client's monthly outreach.",
  },
  {
    icon: Users,
    title: "Team workspaces",
    description:
      "Every account gets its own workspace, ready for teammates to join with their own role once invitations are built.",
  },
];

const UPCOMING_FEATURES = [
  {
    icon: Sparkles,
    title: "AI-drafted outreach emails",
    description:
      "Generate a first-draft pitch or follow-up based on the prospect's site, then edit before sending.",
  },
  {
    icon: Search,
    title: "Website finder",
    description:
      "Search for guest posting opportunities by niche instead of building your prospect list by hand.",
  },
  {
    icon: BarChart3,
    title: "Reports and exports",
    description:
      "Pull campaign performance and published-link reports as CSV or PDF for clients.",
  },
];

const FAQS = [
  {
    question: "What stage is GuestPilot AI at right now?",
    answer:
      "It's an early product. Prospect tracking, status pipelines, campaigns, and workspaces work today and are backed by a real database, not a demo. Features like AI email drafting and reports are listed above as upcoming because they aren't built yet.",
  },
  {
    question: "Is there a cost to try it?",
    answer:
      "Creating a workspace and using the core prospect and campaign features is free while the product is in this stage.",
  },
  {
    question: "Can more than one person use the same workspace?",
    answer:
      "Every account already gets its own workspace with an owner role in the database. Inviting teammates isn't wired up in the interface yet, but the data model supports it.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. GuestPilot AI runs in the browser. Create a workspace and you're in the dashboard.",
  },
];

export default async function LandingPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GuestPilot AI",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Guest post outreach software for tracking prospects, organizing campaigns, and managing a link building pipeline.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LandingNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-10 lg:pt-24 lg:pb-16 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge variant="primary">Now in early access</Badge>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold text-text mt-5 leading-tight">
                Guest post outreach, organized in one place.
              </h1>
              <p className="text-text-muted text-lg mt-5 max-w-xl">
                Stop tracking prospects in a spreadsheet. Add the sites
                you&apos;re pitching, move them through your pipeline, and
                keep every campaign separate, all in one workspace built for
                agencies and freelancers doing link building.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link href="/register">
                  <Button size="lg" variant="accent" className="w-full sm:w-auto">
                    Create your workspace
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Sign in
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-text-muted mt-4">
                Free to start. No credit card required.
              </p>
            </div>

            <HeroVisual />
          </div>
        </section>

        {/* Available features */}
        <section id="features" className="border-t border-border bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Reveal>
              <p className="text-sm font-medium text-primary">Available now</p>
              <h2 className="font-display text-3xl font-semibold text-text mt-2">
                What you can do today
              </h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {AVAILABLE_FEATURES.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 0.05}>
                  <Card className="h-full">
                    <CardContent className="flex gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
                        <feature.icon size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-text">{feature.title}</p>
                        <p className="text-sm text-text-muted mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming features */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Reveal>
              <p className="text-sm font-medium text-accent">On the roadmap</p>
              <h2 className="font-display text-3xl font-semibold text-text mt-2">
                What&apos;s being built next
              </h2>
              <p className="text-text-muted mt-3 max-w-2xl">
                These aren&apos;t live yet. They&apos;re listed here so it&apos;s
                clear what the product does today versus what&apos;s planned.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-3 gap-5 mt-10">
              {UPCOMING_FEATURES.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 0.05}>
                  <Card className="h-full border-dashed">
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="h-10 w-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                          <feature.icon size={20} />
                        </div>
                        <Badge variant="accent">Coming soon</Badge>
                      </div>
                      <p className="font-medium text-text mt-4">{feature.title}</p>
                      <p className="text-sm text-text-muted mt-1">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-t border-border bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold text-text">
                How it works
              </h2>
            </Reveal>

            <div className="grid sm:grid-cols-3 gap-8 mt-10">
              {[
                {
                  step: "01",
                  title: "Add your prospects",
                  description:
                    "Enter the domain and contact for each site you want to pitch for a guest post.",
                },
                {
                  step: "02",
                  title: "Organize into campaigns",
                  description:
                    "Group prospects by client, niche, or time period so nothing gets mixed up.",
                },
                {
                  step: "03",
                  title: "Track the outcome",
                  description:
                    "Update status as replies come in, right through to published.",
                },
              ].map((item, i) => (
                <Reveal key={item.step} delay={i * 0.05}>
                  <div>
                    <p className="font-display text-3xl font-semibold text-primary">
                      {item.step}
                    </p>
                    <p className="font-medium text-text mt-3">{item.title}</p>
                    <p className="text-sm text-text-muted mt-1">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-5 py-20 text-center">
            <Reveal>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text">
                Start tracking your outreach today
              </h2>
              <p className="text-text-muted mt-4 max-w-xl mx-auto">
                Set up a workspace in under a minute and add your first
                prospect.
              </p>
              <Link href="/register" className="inline-block mt-8">
                <Button size="lg" variant="accent">
                  Create your workspace
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-border bg-surface/40">
          <div className="mx-auto max-w-3xl px-5 py-20">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold text-text text-center">
                Frequently asked questions
              </h2>
            </Reveal>

            <div className="mt-10 space-y-4">
              {FAQS.map((faq, i) => (
                <Reveal key={faq.question} delay={i * 0.05}>
                  <Card>
                    <CardContent>
                      <p className="font-medium text-text">{faq.question}</p>
                      <p className="text-sm text-text-muted mt-2">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
