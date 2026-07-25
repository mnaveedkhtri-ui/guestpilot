"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "in_discussion", label: "In Discussion" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "published", label: "Published" },
];

export function StatusSelect({ prospectId, status }: { prospectId: string, status: string }) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);

    try {
      const res = await fetch("/api/prospects/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prospectId, status: newStatus }),
      });

      if (res.ok) {
        router.refresh(); // Table turant update hoga
      }
    } catch (error) {
      console.error("Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        value={currentStatus}
        onChange={handleChange}
        disabled={isLoading}
        className="appearance-none bg-transparent border border-border rounded-md px-2 py-1 pr-6 text-xs font-medium text-text-muted focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer disabled:opacity-50"
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value} className="bg-surface text-text">
            {s.label}
          </option>
        ))}
      </select>
      {isLoading && (
        <Loader2 className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 animate-spin text-primary" />
      )}
    </div>
  );
}
