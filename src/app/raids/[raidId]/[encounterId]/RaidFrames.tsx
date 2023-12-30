import classColors from "@wowaudit-tools/utils/classColor.module.scss";
import { getCssClassForWowClass } from "@wowaudit-tools/utils/classColor";
import styles from "./RaidFrames.module.scss";
import { generateGroups } from "@wowaudit-tools/utils/generateRaidGroups";
import { useMemo } from "react";
import { Raid } from "@wowaudit-tools/api/wowaudit";

interface Props {
  raid: Raid;
  encounterId: number;
}

export default async function RaidFrames({ raid, encounterId }: Props) {
  const groups = useMemo(() => {
    if (raid) {
      return generateGroups(raid, encounterId);
    } else {
      return [];
    }
  }, [raid, encounterId]);

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
