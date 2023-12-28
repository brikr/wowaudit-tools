"use client";

import { useRaid } from "@wowaudit-tools/hooks/useRaid";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./EncounterSelector.module.scss";

export default function EncounterSelector() {
  const { apiKey, raidId, encounterId } = useParams();

  const { data, isLoading } = useRaid(Number(raidId));

  if (isLoading || !data) return null;

  return (
    <div className={styles.container}>
      <Link href={`/${apiKey}/${raidId}`}>
        <div
          className={`${styles.encounter} ${
            !Boolean(encounterId) && styles.selected
          }`}
        >
          All
        </div>
      </Link>
      {data.encounters
        .filter((encounter) => encounter.enabled)
        .map((encounter) => (
          <Link
            href={`/${apiKey}/${raidId}/${encounter.id}`}
            key={encounter.id}
          >
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
