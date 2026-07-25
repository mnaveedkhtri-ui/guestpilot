"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { prospects, prospectStatuses } from "@/db/schema";

const createProspectSchema = z.object({
  domain: z
    .string()
    .trim()
    .min(3, "Enter a domain")
    .transform((value) => value.replace(/^https?:\/\//, "").replace(/\/$/, "")),
  contactEmail: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type CreateProspectState = {
  ok: boolean;
  error?: string;
};

export async function createProspectAction(
  _prevState: CreateProspectState,
  formData: FormData
): Promise<CreateProspectState> {
  const session = await auth();
  const workspaceId = session?.workspace?.id;
  if (!workspaceId) {
    return { ok: false, error: "You must belong to a workspace to add prospects." };
  }

  const parsed = createProspectSchema.safeParse({
    domain: formData.get("domain") ?? "",
    contactEmail: formData.get("contactEmail") ?? "",
    notes: formData.get("notes") ?? "",
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await db.insert(prospects).values({
    workspaceId,
    domain: parsed.data.domain,
    contactEmail: parsed.data.contactEmail || null,
    notes: parsed.data.notes || null,
  });

  revalidatePath("/prospects");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function updateProspectStatusAction(
  prospectId: string,
  status: (typeof prospectStatuses)[number]
) {
  const session = await auth();
  const workspaceId = session?.workspace?.id;
  if (!workspaceId) return;

  await db
    .update(prospects)
    .set({ status })
    .where(and(eq(prospects.id, prospectId), eq(prospects.workspaceId, workspaceId)));

  revalidatePath("/prospects");
  revalidatePath("/dashboard");
}