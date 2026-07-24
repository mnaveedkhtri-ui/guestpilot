"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { campaigns } from "@/db/schema";

const createCampaignSchema = z.object({
  name: z.string().trim().min(2, "Give the campaign a name").max(120),
});

export type CreateCampaignState = {
  ok: boolean;
  error?: string;
};

export async function createCampaignAction(
  _prevState: CreateCampaignState,
  formData: FormData
): Promise<CreateCampaignState> {
  const session = await auth();
  const workspaceId = session?.workspace?.id;
  if (!workspaceId) {
    return { ok: false, error: "You must belong to a workspace to create campaigns." };
  }

  const parsed = createCampaignSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await db.insert(campaigns).values({ workspaceId, name: parsed.data.name });

  revalidatePath("/campaigns");
  revalidatePath("/dashboard");
  return { ok: true };
}
