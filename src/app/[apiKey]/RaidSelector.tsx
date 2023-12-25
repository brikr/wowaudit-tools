"use client";

import { useRaidList } from "@raid-group-maker/hooks/useRaidList";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./RaidSelector.module.scss";

export default function RaidSelector() {
  const { data, isLoading } = useRaidList();
  const { apiKey, raidId } = useParams();

  if (isLoading || !data) return null;

  return (
    <div className={styles.container}>
      {data.raids.slice(0, 4).map((raid) => (
        <Link key={raid.id} href={`/${apiKey}/${raid.id}`}>
          <div
            className={`${styles.raid} ${
              Number(raidId) == raid.id && styles.selected
            }`}
          >
            <span>{raid.date}</span>
            <span className={styles.title}>
              {raid.difficulty} {raid.instance}
            </span>
            <span>
              {raid.present_size}/{raid.total_size}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
