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
import styles from "./FullRoster.module.scss";

function getCharactersByRole(
  raid: Raid,
  encounterId: number,
  role: string
): Character[] {
  const charMap = new Map<number, Character>();
  for (const signup of raid.signups) {
    charMap.set(signup.character.id, signup.character);
  }

  const encounter = raid.encounters.find((e) => e.id === encounterId)!;
  return encounter.selections
    .filter((selection) => selection.selected && selection.role === role)
    .map((selection) => ({
      ...charMap.get(selection.character_id)!,
      class: selection.class,
      role: selection.role
    }))
    .sort((a, b) => a.class.localeCompare(b.class));
}

export default function FullRoster() {
  const { apiKey, raidId } = useParams();

  const { data: raid, isLoading } = useRaid(Number(raidId));

  if (isLoading || !raid) return null;

  const encounters = raid.encounters.filter((encounter) => encounter.enabled);

  return (
    <div className={styles.encounters}>
      {encounters.map((encounter) => (
        <div className={styles.encounter}>
          <span className={styles.encounterHeader}>{encounter.name}</span>
          {["Tank", "Heal", "Melee", "Ranged"].map((role) => (
            <>
              <span className={styles.sectionHeader}>{role}</span>
              {getCharactersByRole(raid, encounter.id, role).map(
                (character) => (
                  <span
                    className={
                      classColors[getCssClassForWowClass(character.class)]
                    }
                  >
                    {character.name}
                  </span>
                )
              )}
            </>
          ))}
        </div>
      ))}
    </div>
  );
}
