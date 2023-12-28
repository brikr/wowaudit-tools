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
import styles from "./FullRoster.module.scss";
import React, { useRef } from "react";
import html2canvas from "html2canvas";

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
  const { raidId } = useParams();
  const { data: raid, isLoading } = useRaid(Number(raidId));
  const encountersRef = useRef<HTMLDivElement>(null);

  if (isLoading || !raid) return null;

  async function handleScreenshotClick() {
    if (encountersRef.current === null) return;
    const canvas = await html2canvas(encountersRef.current);
    canvas.toBlob((blob) => {
      if (blob === null) return;
      navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
    });
  }

  const encounters = raid.encounters.filter((encounter) => encounter.enabled);

  return (
    <>
      <button
        className={styles.screenshotButton}
        onClick={handleScreenshotClick}
      >
        Screenshot
      </button>
      <div className={styles.encounterContainer}>
        <div className={styles.encounters} ref={encountersRef}>
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
