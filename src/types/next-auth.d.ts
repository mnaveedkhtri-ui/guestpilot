import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
    workspace: {
      id: string;
      name: string;
      slug: string;
      role: string;
    } | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    workspaceId?: string;
    workspaceName?: string;
    workspaceSlug?: string;
    role?: string;
  }
}
