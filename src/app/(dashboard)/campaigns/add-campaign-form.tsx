"use client";

import { useActionState, useEffect, useRef } from "react";
import { createCampaignAction, type CreateCampaignState } from "@/actions/campaigns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: CreateCampaignState = { ok: false };

export function AddCampaignForm() {
  const [state, formAction, pending] = useActionState(createCampaignAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="flex gap-3">
      <div className="flex-1">
        <Label htmlFor="name" className="sr-only">
          Campaign name
        </Label>
        <Input id="name" name="name" placeholder="Q3 SaaS blogger outreach" required />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Creating…" : "New campaign"}
      </Button>
      {state.error && <p className="text-sm text-danger self-center">{state.error}</p>}
    </form>
  );
}
