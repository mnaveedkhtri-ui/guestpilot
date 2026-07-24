import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { memberships, users } from "@/db/schema";
import { loginSchema } from "@/lib/validations";
import { verifyPassword } from "@/lib/password";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
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
        token.userId = user.id;

        // Attach the user's primary workspace so it's available on every
        // request without an extra DB round trip from Server Components.
        const membership = await db.query.memberships.findFirst({
          where: eq(memberships.userId, user.id),
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
