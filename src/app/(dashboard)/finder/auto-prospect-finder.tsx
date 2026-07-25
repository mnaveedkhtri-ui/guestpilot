"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Search, Sparkles } from "lucide-react";

export function AutoProspectFinder() {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleFind = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setError(false);

    try {
      const res = await fetch("/api/auto-prospect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(`Success! AI added ${data.count} new prospects to your list.`);
        setNiche("");
        router.refresh();
      } else {
        setStatus(data.error || "Failed to find prospects.");
        setError(true);
      }
    } catch (err) {
      setStatus("Network error.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Automated Discovery</CardTitle>
        <CardDescription>Find websites in any niche with one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFind} className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="w-full sm:w-2/3">
            <Label htmlFor="niche">Niche / Industry</Label>
            <Input 
              id="niche" 
              value={niche} 
              onChange={(e) => setNiche(e.target.value)} 
              placeholder="e.g. Technology, Health, Finance" 
              required 
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full sm:w-auto" variant="accent">
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Find & Add Prospects
          </Button>
        </form>
        {status && (
          <p className={`mt-4 text-sm ${error ? "text-red-400" : "text-green-400"}`}>
            {status}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
