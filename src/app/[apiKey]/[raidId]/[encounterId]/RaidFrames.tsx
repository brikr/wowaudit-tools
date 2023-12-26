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

export default function RaidFrames() {
  const { raidId, encounterId } = useParams();
  const { data: raid, isLoading } = useRaid(Number(raidId));

  if (isLoading || !raid) return null;

  const groups = generateGroups(raid, Number(encounterId));

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
