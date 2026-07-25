"use client";

import { useState, useTransition } from "react";
import { RefreshCw } from "lucide-react";
import { refreshDomainRatingAction } from "@/actions/prospects";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function ratingVariant(dr: number): "success" | "accent" | "neutral" {
  if (dr >= 60) return "success";
  if (dr >= 30) return "accent";
  return "neutral";
}

export function DomainRatingCell({
  prospectId,
  domainRating,
}: {
  prospectId: string;
  domainRating: number | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleRefresh() {
    setError(null);
    startTransition(async () => {
      const result = await refreshDomainRatingAction(prospectId);
      if (!result.ok) setError(result.error ?? "Couldn't fetch DR.");
    });
  }

  return (
    <div className="flex items-center gap-2">
      {domainRating !== null ? (
        <Badge variant={ratingVariant(domainRating)}>
          DR {Math.round(domainRating)}
        </Badge>
      ) : (
        <span className="text-xs text-text-muted">Not checked</span>
      )}
      <button
        type="button"
        onClick={handleRefresh}
        disabled={isPending}
        title="Fetch real Domain Rating from Ahrefs"
        className={cn(
          "text-text-muted hover:text-text transition-colors disabled:opacity-40",
          isPending && "animate-spin"
        )}
      >
        <RefreshCw size={14} />
      </button>
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
