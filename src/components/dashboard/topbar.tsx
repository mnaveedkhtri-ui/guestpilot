import { LogOut, Menu } from "lucide-react";
import { signOutAction } from "@/actions/sign-out";
import { Button } from "@/components/ui/button";

export function Topbar({
  userName,
  userEmail,
  onMenuClick,
}: {
  userName: string;
  userEmail: string;
  onMenuClick: () => void;
}) {
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="h-16 flex items-center justify-between border-b border-border bg-surface px-4 md:px-6">
      <button 
        onClick={onMenuClick} 
        className="md:hidden text-text-muted hover:text-text transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>
      
      <div className="hidden md:block" />
      
      <div className="flex items-center gap-2 sm:gap-4">
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
            <span className="hidden sm:inline ml-2">Sign out</span>
          </Button>
        </form>
      </div>
    </header>
  );
}
