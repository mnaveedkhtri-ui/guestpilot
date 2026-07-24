"use client";

import dynamic from "next/dynamic";

const NetworkScene = dynamic(() => import("./network-scene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function HeroFallback() {
  return (
    <div
      className="h-full w-full rounded-3xl"
      style={{
        background:
          "radial-gradient(circle at 50% 40%, rgba(79,91,213,0.35), transparent 60%)",
      }}
    />
  );
}

export function HeroVisual() {
  return (
    <div className="relative h-[320px] sm:h-[420px] lg:h-[520px] w-full">
      <NetworkScene />
    </div>
  );
}
