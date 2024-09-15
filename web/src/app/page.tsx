"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/app/components/Map"), {
  loading: () => <div />,
  ssr: false
});

export default function Home() {
  const ideas = useQuery(api.tasks.getIdeas);
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center bg-gradient-defang">
      <h1 className="text-4xl font-bold text-white">Next.js &times; Defang &times; Convex test</h1>
      <ul>
        {ideas?.map(({_id, idea}) => <li key={_id}>{idea}</li>)}
      </ul>
      <Map />
    </main>
  );
}
