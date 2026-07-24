"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { memberships, users, workspaces } from "@/db/schema";
import { registerSchema } from "@/lib/validations";
import { hashPassword } from "@/lib/password";
import { slugify } from "@/lib/slug";
import { signIn } from "@/lib/auth";

export type RegisterState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "password" | "workspaceName", string>>;
};

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    workspaceName: formData.get("workspaceName"),
  });

  if (!parsed.success) {
    const fieldErrors: RegisterState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<RegisterState["fieldErrors"]>;
      if (key) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Please fix the errors below.", fieldErrors };
  }

  const { name, email, password, workspaceName } = parsed.data;

  const existing = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (existing) {
    return {
      ok: false,
      error: "An account with this email already exists.",
      fieldErrors: { email: "Already registered" },
    };
  }

  const passwordHash = await hashPassword(password);

  // Ensure the workspace slug is unique by appending a short suffix on
  // collision rather than failing the whole signup.
  const baseSlug = slugify(workspaceName) || "workspace";
  let slug = baseSlug;
  let attempt = 0;
  while (
    await db.query.workspaces.findFirst({ where: eq(workspaces.slug, slug) })
  ) {
    attempt += 1;
    slug = `${baseSlug}-${attempt}`;
  }

  const [user] = await db
    .insert(users)
    .values({ name, email, passwordHash })
    .returning();

  const [workspace] = await db
    .insert(workspaces)
    .values({ name: workspaceName, slug })
    .returning();

  await db.insert(memberships).values({
    userId: user.id,
    workspaceId: workspace.id,
    role: "owner",
  });

  // signIn() redirects on success by throwing Next.js's internal
  // NEXT_REDIRECT signal — that's expected and is allowed to propagate so
  // the browser navigates straight to /dashboard already authenticated.
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });

  return { ok: true };
}
