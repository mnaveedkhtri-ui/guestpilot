"use client";

import { useTransition } from "react";
import { updateProspectStatusAction } from "@/actions/prospects";
import { prospectStatuses, type ProspectStatus } from "@/db/schema";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<ProspectStatus, string> = {
  new: "New",
  contacted: "Contacted",
  in_discussion: "In discussion",
  accepted: "Accepted",
  rejected: "Rejected",
  published: "Published",
};

const STATUS_COLOR: Record<ProspectStatus, string> = {
  new: "text-text-muted",
  contacted: "text-primary",
  in_discussion: "text-accent",
  accepted: "text-success",
  rejected: "text-danger",
  published: "text-success",
};

export function StatusSelect({
  prospectId,
  status,
}: {
  prospectId: string;
  status: ProspectStatus;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(event) => {
        const next = event.target.value as ProspectStatus;
        startTransition(() => {
          updateProspectStatusAction(prospectId, next);
        });
      }}
      className={cn(
        "bg-surface-2 border border-border rounded-md text-xs font-medium px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary",
        STATUS_COLOR[status]
      )}
    >
      {prospectStatuses.map((value) => (
        <option key={value} value={value} className="text-text bg-surface">
          {STATUS_LABEL[value]}
        </option>
      ))}
    </select>
  );
}
