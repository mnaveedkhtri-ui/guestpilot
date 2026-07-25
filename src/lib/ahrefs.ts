const AHREFS_ENDPOINT = "https://api.ahrefs.com/v3/public/domain-rating-free";

export type DomainRatingResult =
  | { ok: true; domainRating: number }
  | { ok: false; error: string };

/**
 * Fetches a domain's real Domain Rating from Ahrefs' free public endpoint.
 * This is genuine third-party data, not an estimate we generate ourselves.
 *
 * As of writing this endpoint is free and unauthenticated. Ahrefs has
 * announced that from August 10, 2026 it will require a (still free) API
 * key. Set AHREFS_API_KEY once you've created one at
 * https://app.ahrefs.com (Account settings -> API keys) and this function
 * will start sending it automatically — no other code changes needed.
 */
export async function fetchDomainRating(domain: string): Promise<DomainRatingResult> {
  const url = new URL(AHREFS_ENDPOINT);
  url.searchParams.set("target", domain);
  url.searchParams.set("output", "json");

  const headers: Record<string, string> = { Accept: "application/json" };
  if (process.env.AHREFS_API_KEY) {
    headers.Authorization = `Bearer ${process.env.AHREFS_API_KEY}`;
  }

  let response: Response;
  try {
    response = await fetch(url.toString(), { headers, cache: "no-store" });
  } catch {
    return { ok: false, error: "Could not reach Ahrefs. Try again in a moment." };
  }

  if (!response.ok) {
    if (response.status === 401) {
      return {
        ok: false,
        error:
          "Ahrefs now requires a free API key for this endpoint. Add AHREFS_API_KEY to your environment variables.",
      };
    }
    if (response.status === 429) {
      return { ok: false, error: "Rate limited by Ahrefs. Try again shortly." };
    }
    return { ok: false, error: `Ahrefs returned an error (${response.status}).` };
  }

  const data = (await response.json()) as {
    domain_rating?: { domain_rating?: number };
  };

  const value = data.domain_rating?.domain_rating;
  if (typeof value !== "number") {
    return { ok: false, error: "Unexpected response from Ahrefs." };
  }

  return { ok: true, domainRating: value };
}
