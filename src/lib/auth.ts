import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google"; // Google Provider add kiya
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { memberships, users } from "@/db/schema";
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
        // Agar Google se login kiya hai to user.id Google ki ID hoti hai.
        // Hum database mein email se check karenge taake workspace mil sake.
        const dbUser = user.email ? await db.query.users.findFirst({
          where: eq(users.email, user.email),
        }) : null;

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
