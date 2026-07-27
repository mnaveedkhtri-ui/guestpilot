"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteSiteButton({ domain }: { domain: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${domain}?`)) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin-sites/delete?domain=${domain}`);
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete website.");
      }
    } catch (error) {
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading}
      className="text-gray-600 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-500/10"
      title="Delete Site (Admin Only)"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </button>
  );
}
