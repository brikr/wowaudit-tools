"use client";

import {
  Character,
  Encounter,
  Raid,
  useRaid
} from "@raid-group-maker/hooks/useRaid";
import { useParams } from "next/navigation";
import styles from "./RaidFrames.module.scss";

function generateGroups(raid: Raid, encounterId: number): Character[][] {
  const charMap = new Map<number, Character>();
  for (const signup of raid.signups) {
    charMap.set(signup.character.id, signup.character);
  }

  const groups: Character[][] = [];
  let groupIdx = 0; // idx of the highest group that isn't full

  const encounter = raid.encounters.find((enc) => enc.id == encounterId)!;
  for (const selection of encounter.selections) {
    if (selection.selected) {
      groups[groupIdx] ??= [];
      groups[groupIdx].push(charMap.get(selection.character_id)!);
      if (groups[groupIdx].length === 5) {
        groupIdx++;
      }
    }
  }

  return groups;
}

export default function RaidFrames() {
  const { raidId, encounterId } = useParams();
  const { data, isLoading } = useRaid(Number(raidId));

  if (isLoading || !data) return null;

  const groups = generateGroups(data, Number(encounterId));

  return (
    <div className={styles.frames}>
      {groups.map((group) => (
        <div className={styles.group}>
          {group.map((char) => (
            <div className={styles.frame}>
              <span>{char.name}</span>
              <span>{char.role}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
