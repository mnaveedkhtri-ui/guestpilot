"use client";

import { useActionState, useEffect, useRef } from "react";
import { createProspectAction, type CreateProspectState } from "@/actions/prospects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: CreateProspectState = { ok: false };

export function AddProspectForm({ campaigns }: { campaigns: { id: string; name: string }[] }) {
  const [state, formAction, pending] = useActionState(createProspectAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-3 sm:grid-cols-5">
      <div className="sm:col-span-2">
        <Label htmlFor="domain">Website domain</Label>
        <Input id="domain" name="domain" placeholder="example.com" required />
      </div>
      <div>
        <Label htmlFor="contactEmail">Contact email</Label>
        <Input id="contactEmail" name="contactEmail" type="email" placeholder="editor@domain.com" required />
      </div>
      <div>
        <Label htmlFor="campaignId">Campaign</Label>
        {/* Yahan Dropdown add hua hai */}
        <select 
          id="campaignId" 
          name="campaignId"
          className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-text"
        >
          <option value="">No campaign</option>
          {campaigns.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="flex items-end">
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Adding…" : "Add prospect"}
        </Button>
      </div>
      {state.error && (
        <p className="sm:col-span-5 text-sm text-danger" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
