import { Character, Raid } from "@wowaudit-tools/api/wowaudit";
import { getCssClassForWowClass } from "@wowaudit-tools/utils/classColor";
import classColors from "@wowaudit-tools/utils/classColor.module.scss";
import React from "react";
import styles from "./FullRoster.module.scss";
import { ScreenshotButton } from "./ScreenshotButton";

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

interface Props {
  raid: Raid;
}

export default async function FullRoster({ raid }: Props) {
  const encounters = raid.encounters.filter((encounter) => encounter.enabled);

  return (
    <>
      <ScreenshotButton />
      <div className={styles.encounterContainer}>
        <div className={styles.encounters} id="encounters">
          {encounters.map((encounter) => (
            <div className={styles.encounter} key={encounter.id}>
              <span className={styles.encounterHeader}>{encounter.name}</span>
              {["Tank", "Heal", "Melee", "Ranged"].map((role) => (
                <React.Fragment key={role}>
                  <span className={styles.sectionHeader}>{role}</span>
                  {getCharactersByRole(raid, encounter.id, role).map(
                    (character) => (
                      <span
                        className={
                          classColors[getCssClassForWowClass(character.class)]
                        }
                        key={character.id}
                      >
                        {character.name}
                      </span>
                    )
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
