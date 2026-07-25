"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// baqi imports...

export function StatusSelect({ prospectId, status }: { prospectId: string, status: string }) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Yeh add karein

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
        router.refresh(); // Yeh add karein taake table turant update ho
      }
    } catch (error) {
      console.error("Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Yahan aapka select tag hoga
  );
}
