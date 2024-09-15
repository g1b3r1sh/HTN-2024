"use client";

import dynamic from "next/dynamic";
import "@mappedin/react-sdk/lib/esm/index.css";
import Map from "./components/Map";

// const Map = dynamic(() => import("@/app/components/Map"), {
//   loading: () => <div />,
//   ssr: false
// });

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center bg-gradient-defang">
      <h1 className="text-4xl font-bold text-white">Title</h1>
      <Map />
    </main>
  );
}
