"use client";

import { useRaidList } from "@raid-group-maker/hooks/useRaidList";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function RaidSelector() {
  const { data, isLoading } = useRaidList();
  const { apiKey } = useParams();

  if (isLoading || !data) return null;

  return (
    <div>
      {data.raids.slice(0, 4).map((raid) => (
        <Link key={raid.id} href={`/${apiKey}/${raid.id}`}>
          {raid.date}: {raid.difficulty} {raid.instance} ({raid.present_size}/
          {raid.total_size})
        </Link>
      ))}
    </div>
  );
}
