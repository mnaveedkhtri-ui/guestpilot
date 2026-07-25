import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { memberships, users, workspaces } from "@/db/schema"; // workspaces import kiya
import { loginSchema } from "@/lib/validations";
import { verifyPassword } from "@/lib/password"

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = loginSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;

        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });
        if (!user) return null;

        const valid = await verifyPassword(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.avatarUrl ?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        let dbUser = user.email ? await db.query.users.findFirst({
          where: eq(users.email, user.email),
        }) : null;

        // --- NAYA LOGIC: Google USER KO DB MEIN AUTO-ADD KARNA ---
        if (!dbUser && user.email) {
          // 1. Naya User Banayein
          const [newUser] = await db.insert(users).values({
            name: user.name ?? "Google User",
            email: user.email,
            avatarUrl: user.image ?? null,
            // Agar aapke schema mein passwordHash null nahi ho sakta, toh dummy value daal dein
            passwordHash: crypto.randomUUID() + crypto.randomUUID(), 
          }).returning();

          // 2. Naya Workspace Banayein
          const slug = `${user.email.split('@')[0]}-${Math.random().toString(36).substring(2, 6)}`;
          const [newWorkspace] = await db.insert(workspaces).values({
            name: `${newUser.name}'s Workspace`,
            slug: slug,
          }).returning();

          // 3. User ko Workspace ka Owner banayein
          await db.insert(memberships).values({
            userId: newUser.id,
            workspaceId: newWorkspace.id,
            role: "owner",
          });

          // dbUser ko update kar dein taake niche wala code chale
          dbUser = newUser; 
        }

        token.userId = dbUser?.id ?? user.id;

        const membership = await db.query.memberships.findFirst({
          where: eq(memberships.userId, token.userId as string),
          with: { workspace: true },
        });
        
        if (membership) {
          token.workspaceId = membership.workspace.id;
          token.workspaceName = membership.workspace.name;
          token.workspaceSlug = membership.workspace.slug;
          token.role = membership.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
      }
      session.workspace = token.workspaceId
        ? {
            id: token.workspaceId as string,
            name: token.workspaceName as string,
            slug: token.workspaceSlug as string,
            role: token.role as string,
          }
        : null;
      return session;
    },
  },
});
