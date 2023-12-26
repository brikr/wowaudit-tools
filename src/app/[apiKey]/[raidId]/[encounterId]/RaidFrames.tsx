"use client";

import {
  Character,
  Encounter,
  Raid,
  useRaid
} from "@raid-group-maker/hooks/useRaid";
import classColors from "@raid-group-maker/utils/classColor.module.scss";
import { getCssClassForWowClass } from "@raid-group-maker/utils/classColor";
import { useParams } from "next/navigation";
import styles from "./RaidFrames.module.scss";
import { generateGroups } from "@raid-group-maker/utils/generateRaidGroups";
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
      {groups.map((group) => (
        <div className={styles.group}>
          {group.map((char) => (
            <div
              className={`${styles.frame} ${
                classColors[getCssClassForWowClass(char.class)]
              }`}
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
