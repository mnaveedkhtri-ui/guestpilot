"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { prospects, prospectStatuses } from "@/db/schema";
import { fetchDomainRating } from "@/lib/ahrefs";

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

  const [inserted] = await db
    .insert(prospects)
    .values({
      workspaceId,
      domain: parsed.data.domain,
      contactEmail: parsed.data.contactEmail || null,
      notes: parsed.data.notes || null,
    })
    .returning();

  // Best-effort: pull the real Domain Rating right away so it's there the
  // first time the list renders. If Ahrefs is slow, rate-limiting us, or
  // down, the prospect is still saved — DR can be refreshed later with the
  // per-row "Check DR" button.
  try {
    const result = await fetchDomainRating(inserted.domain);
    if (result.ok) {
      await db
        .update(prospects)
        .set({ domainRating: result.domainRating, domainRatingCheckedAt: new Date() })
        .where(eq(prospects.id, inserted.id));
    }
  } catch {
    // Swallow — DR is a nice-to-have enrichment, not a required field.
  }

  revalidatePath("/prospects");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function refreshDomainRatingAction(prospectId: string) {
  const session = await auth();
  const workspaceId = session?.workspace?.id;
  if (!workspaceId) return { ok: false, error: "Not signed in." };

  const prospect = await db.query.prospects.findFirst({
    where: and(eq(prospects.id, prospectId), eq(prospects.workspaceId, workspaceId)),
  });
  if (!prospect) return { ok: false, error: "Prospect not found." };

  const result = await fetchDomainRating(prospect.domain);
  if (!result.ok) return { ok: false, error: result.error };

  await db
    .update(prospects)
    .set({ domainRating: result.domainRating, domainRatingCheckedAt: new Date() })
    .where(eq(prospects.id, prospectId));

  revalidatePath("/prospects");
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
