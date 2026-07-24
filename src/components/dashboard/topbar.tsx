import { LogOut } from "lucide-react";
import { signOutAction } from "@/actions/sign-out";
import { Button } from "@/components/ui/button";

export function Topbar({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="h-16 flex items-center justify-between border-b border-border bg-surface px-6">
      <div />
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-text leading-tight">{userName}</p>
          <p className="text-xs text-text-muted leading-tight">{userEmail}</p>
        </div>
        <div className="h-9 w-9 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">
          {initials}
        </div>
        <form action={signOutAction}>
          <Button type="submit" variant="ghost" size="sm">
            <LogOut size={16} />
            Sign out
          </Button>
        </form>
      </div>
    </header>
  );
}
