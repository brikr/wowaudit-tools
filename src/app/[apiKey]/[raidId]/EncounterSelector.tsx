"use client";

import { useRaid } from "@raid-group-maker/hooks/useRaid";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EncounterSelector() {
  const { apiKey, raidId } = useParams();

  const { data, isLoading } = useRaid(Number(raidId));

  if (isLoading || !data) return null;

  return (
    <div>
      {data.encounters
        .filter((encounter) => encounter.enabled)
        .map((encounter) => (
          <Link href={`/${apiKey}/${raidId}/${encounter.id}`}>
            {encounter.name}
          </Link>
        ))}
    </div>
  );
}
