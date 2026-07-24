"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction, type RegisterState } from "@/actions/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: RegisterState = { ok: false };

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="workspaceName">Workspace name</Label>
        <Input
          id="workspaceName"
          name="workspaceName"
          placeholder="Acme Link Building"
          required
        />
        {state.fieldErrors?.workspaceName && (
          <p className="text-xs text-danger mt-1">{state.fieldErrors.workspaceName}</p>
        )}
      </div>

      <div>
        <Label htmlFor="name">Your name</Label>
        <Input id="name" name="name" autoComplete="name" required />
        {state.fieldErrors?.name && (
          <p className="text-xs text-danger mt-1">{state.fieldErrors.name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
        {state.fieldErrors?.email && (
          <p className="text-xs text-danger mt-1">{state.fieldErrors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
        {state.fieldErrors?.password && (
          <p className="text-xs text-danger mt-1">{state.fieldErrors.password}</p>
        )}
        <p className="text-xs text-text-muted mt-1">
          8+ characters, with an uppercase letter, a lowercase letter, and a number.
        </p>
      </div>

      {state.error && (
        <p className="text-sm text-danger" role="alert">
          {state.error}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating your workspace…" : "Create workspace"}
      </Button>

      <p className="text-sm text-text-muted text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:text-primary-hover">
          Sign in
        </Link>
      </p>
    </form>
  );
}
