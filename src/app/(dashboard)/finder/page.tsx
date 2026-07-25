import { Metadata } from "next";
import { AutoProspectFinder } from "./auto-prospect-finder";

export const metadata: Metadata = {
  title: "Find Prospects | Guest Pilot",
};

export default function FinderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-text">Find Prospects</h1>
        <p className="text-text-muted mt-1">
          Enter a niche and let AI automatically find and add 5 high authority websites to your list.
        </p>
      </div>
      <AutoProspectFinder />
    </div>
  );
}
