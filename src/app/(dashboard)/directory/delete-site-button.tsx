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
        router.refresh(); // Page refresh hoga aur website gayab ho jayegi
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
      className="w-full mt-4 text-red-400 hover:text-red-300 border border-red-500/30 hover:bg-red-500/10 py-1.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-xs font-medium disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
      {loading ? "Deleting..." : "Delete Site"}
    </button>
  );
}
