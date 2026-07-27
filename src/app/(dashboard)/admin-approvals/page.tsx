"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function AdminApprovalsPage() {
  const [sites, setSites] = useState<any[]>([]);
  const router = useRouter();

  const fetchSites = () => {
    fetch("/api/admin-sites")
      .then(res => res.json())
      .then(data => setSites(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const handleAction = async (id: string, status: string) => {
    await fetch("/api/admin-sites/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ siteId: id, status })
    });
    fetchSites();
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-text">Admin: Pending Approvals</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Website Submissions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {sites.length === 0 ? (
            <div className="p-10 text-center text-text-muted">No pending websites right now.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-text-muted border-b border-border">
                  <th className="font-medium px-5 py-3">Domain</th>
                  <th className="font-medium px-5 py-3">Niche</th>
                  <th className="font-medium px-5 py-3">DR</th>
                  <th className="font-medium px-5 py-3">Price</th>
                  <th className="font-medium px-5 py-3">Email</th>
                  <th className="font-medium px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sites.map((site) => (
                  <tr key={site.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 text-text font-medium">{site.domain}</td>
                    <td className="px-5 py-3 text-text-muted">{site.niche}</td>
                    <td className="px-5 py-3 text-text-muted">{site.dr}</td>
                    <td className="px-5 py-3 text-text-muted">${site.price}</td>
                    <td className="px-5 py-3 text-text-muted">{site.contactEmail}</td>
                    <td className="px-5 py-3 flex gap-2 justify-end">
                      <Button size="sm" variant="accent" onClick={() => handleAction(site.id, "approved")}>
                        <Check size={14} /> Approve
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => handleAction(site.id, "rejected")}>
                        <X size={14} /> Reject
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
