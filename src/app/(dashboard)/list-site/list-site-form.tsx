"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ListSiteForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData(e.currentTarget);
    const data = {
      domain: formData.get("domain"),
      niche: formData.get("niche"),
      dr: Number(formData.get("dr")),
      traffic: Number(formData.get("traffic")),
      price: Number(formData.get("price")),
      linkType: formData.get("linkType"),
    };

    try {
      const res = await fetch("/api/publisher-sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("Website submitted successfully! It will appear in the directory after approval.");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("Failed to submit. Please try again.");
      }
    } catch (error) {
      setStatus("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Details</CardTitle>
        <CardDescription>Provide accurate metrics to attract buyers.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label htmlFor="domain">Domain (e.g., example.com)</Label>
            <Input id="domain" name="domain" placeholder="yoursite.com" required />
          </div>
          <div>
            <Label htmlFor="niche">Niche (e.g., Technology, Health)</Label>
            <Input id="niche" name="niche" placeholder="Technology" required />
          </div>
          <div>
            <Label htmlFor="dr">Domain Rating (DR)</Label>
            <Input id="dr" name="dr" type="number" placeholder="75" required />
          </div>
          <div>
            <Label htmlFor="traffic">Monthly Traffic</Label>
            <Input id="traffic" name="traffic" type="number" placeholder="50000" required />
          </div>
          <div>
            <Label htmlFor="price">Price (in $)</Label>
            <Input id="price" name="price" type="number" placeholder="150" required />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="linkType">Link Type</Label>
            <select id="linkType" name="linkType" className="w-full h-9 rounded-md border border-gray-700 bg-gray-900 px-3 py-1 text-sm text-white">
              <option value="Dofollow">Dofollow</option>
              <option value="Nofollow">Nofollow</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit Website"}
            </Button>
          </div>
          {status && <p className="md:col-span-2 text-sm text-center text-green-400">{status}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
