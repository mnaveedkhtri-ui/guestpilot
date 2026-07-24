import { auth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-text">Settings</h1>
        <p className="text-text-muted mt-1">Manage your account and workspace.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Name</span>
            <span className="text-text font-medium">{session?.user.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Email</span>
            <span className="text-text font-medium">{session?.user.email}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>The team space you're currently working in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Name</span>
            <span className="text-text font-medium">{session?.workspace?.name}</span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <span className="text-text-muted">Your role</span>
            <Badge variant="primary">{session?.workspace?.role}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
