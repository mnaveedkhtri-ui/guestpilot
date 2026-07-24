import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4 py-12">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="font-display text-lg font-semibold text-text block text-center mb-8"
        >
          GuestPilot <span className="text-accent">AI</span>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Create your workspace</CardTitle>
            <CardDescription>Start finding and managing guest post prospects</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
