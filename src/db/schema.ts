import {
  sqliteTable,
  text,
  integer,
  real,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Users & Auth
// ---------------------------------------------------------------------------

export const users = sqliteTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    email: text("email").notNull(),
    credits: integer("credits").default(10).notNull(), // <-- YE LINE ADD KI HAI
    passwordHash: text("password_hash").notNull(),
    avatarUrl: text("avatar_url"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    emailIdx: uniqueIndex("users_email_idx").on(table.email),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  memberships: many(memberships),
}));

// ---------------------------------------------------------------------------
// Workspaces (multi-tenant teams)
// ---------------------------------------------------------------------------

export const workspaces = sqliteTable(
  "workspaces",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    slugIdx: uniqueIndex("workspaces_slug_idx").on(table.slug),
  })
);

export const workspacesRelations = relations(workspaces, ({ many }) => ({
  memberships: many(memberships),
  prospects: many(prospects),
  campaigns: many(campaigns),
}));

// Role a user holds inside a workspace.
export const membershipRoles = ["owner", "admin", "member"] as const;
export type MembershipRole = (typeof membershipRoles)[number];

export const memberships = sqliteTable(
  "memberships",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    role: text("role", { enum: membershipRoles }).notNull().default("member"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    userWorkspaceIdx: uniqueIndex("memberships_user_workspace_idx").on(
      table.userId,
      table.workspaceId
    ),
  })
);

export const membershipsRelations = relations(memberships, ({ one }) => ({
  user: one(users, {
    fields: [memberships.userId],
    references: [users.id],
  }),
  workspace: one(workspaces, {
    fields: [memberships.workspaceId],
    references: [workspaces.id],
  }),
}));

// ---------------------------------------------------------------------------
// Prospects (guest-post target websites) — the outreach CRM core
// ---------------------------------------------------------------------------

export const prospectStatuses = [
  "new",
  "contacted",
  "in_discussion",
  "accepted",
  "rejected",
  "published",
] as const;
export type ProspectStatus = (typeof prospectStatuses)[number];

export const prospects = sqliteTable("prospects", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  workspaceId: text("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  domain: text("domain").notNull(),
  contactEmail: text("contact_email"),
  status: text("status", { enum: prospectStatuses })
    .notNull()
    .default("new"),
  notes: text("notes"),
  // Real Domain Rating pulled from Ahrefs' free public endpoint. Null until
  // fetched. See src/lib/ahrefs.ts for the fetch logic.
  domainRating: real("domain_rating"),
  domainRatingCheckedAt: integer("domain_rating_checked_at", {
    mode: "timestamp",
  }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const prospectsRelations = relations(prospects, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [prospects.workspaceId],
    references: [workspaces.id],
  }),
}));

// ---------------------------------------------------------------------------
// Campaigns
// ---------------------------------------------------------------------------

export const campaignStatuses = [
  "draft",
  "active",
  "paused",
  "archived",
] as const;
export type CampaignStatus = (typeof campaignStatuses)[number];

export const campaigns = sqliteTable("campaigns", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  workspaceId: text("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  status: text("status", { enum: campaignStatuses })
    .notNull()
    .default("draft"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const campaignsRelations = relations(campaigns, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [campaigns.workspaceId],
    references: [workspaces.id],
  }),
}));
// ---------------------------------------------------------------------------
// Publisher Directory (Marketplace)
// ---------------------------------------------------------------------------

export const publisherSites = sqliteTable("publisher_sites", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  domain: text("domain").notNull(),
  niche: text("niche").notNull(),
  dr: integer("dr").notNull(),
  traffic: integer("traffic").notNull(),
  price: integer("price").notNull(), // Price in USD
  linkType: text("link_type").notNull().default("Dofollow"),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const publisherSitesRelations = relations(publisherSites, ({ one }) => ({
  user: one(users, {
    fields: [publisherSites.userId],
    references: [users.id],
  }),
}));
