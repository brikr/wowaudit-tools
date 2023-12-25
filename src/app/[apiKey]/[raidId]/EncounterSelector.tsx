"use client";

import { useRaid } from "@raid-group-maker/hooks/useRaid";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./EncounterSelector.module.scss";

export default function EncounterSelector() {
  const { apiKey, raidId, encounterId } = useParams();

  const { data, isLoading } = useRaid(Number(raidId));

  if (isLoading || !data) return null;

  return (
    <div className={styles.container}>
      {data.encounters
        .filter((encounter) => encounter.enabled)
        .map((encounter) => (
          <Link href={`/${apiKey}/${raidId}/${encounter.id}`}>
            <div
              className={`${styles.encounter} ${
                Number(encounterId) === encounter.id && styles.selected
              }`}
            >
              {encounter.name}
            </div>
          </Link>
        ))}
    </div>
  );
}
