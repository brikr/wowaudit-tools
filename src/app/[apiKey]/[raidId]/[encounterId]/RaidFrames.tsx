"use client";

import {
  Character,
  Encounter,
  Raid,
  useRaid
} from "@wowaudit-tools/hooks/useRaid";
import classColors from "@wowaudit-tools/utils/classColor.module.scss";
import { getCssClassForWowClass } from "@wowaudit-tools/utils/classColor";
import { useParams } from "next/navigation";
import styles from "./RaidFrames.module.scss";
import { generateGroups } from "@wowaudit-tools/utils/generateRaidGroups";
import { useMemo } from "react";

export default function RaidFrames() {
  const { raidId, encounterId } = useParams();
  const { data: raid, isLoading } = useRaid(Number(raidId));

  const groups = useMemo(() => {
    if (raid) {
      return generateGroups(raid, Number(encounterId));
    } else {
      return [];
    }
  }, [raid, encounterId]);

  if (isLoading || !raid) return null;

  return (
    <div className={styles.frames}>
      {groups.map((group, idx) => (
        <div className={styles.group} key={idx}>
          {group.map((char) => (
            <div
              className={`${styles.frame} ${
                classColors[getCssClassForWowClass(char.class)]
              }`}
              key={char.id}
            >
              <span>{char.name}</span>
              <span>{char.role}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
