import { getCssClassForWowClass } from "@wowaudit-tools/utils/classColor";
import classColors from "@wowaudit-tools/utils/classColor.module.scss";
import { Groups } from "@wowaudit-tools/utils/raidGroups";
import styles from "./RaidFrames.module.scss";

interface Props {
  groups: Groups;
}

export default function RaidFrames({ groups }: Props) {
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
