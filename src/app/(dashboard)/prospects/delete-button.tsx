"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this prospect?")) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/prospects/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete prospect");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
      title="Delete Prospect"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
