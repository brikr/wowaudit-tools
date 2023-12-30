import { Raid } from "@wowaudit-tools/api/wowaudit";
import Link from "next/link";
import styles from "./EncounterSelector.module.scss";

interface Props {
  raid: Raid;
  params: {
    encounterId?: string;
  };
}

export default async function EncounterSelector({
  raid,
  params: { encounterId }
}: Props) {
  return (
    <div className={styles.container}>
      <Link href={`/raids/${raid.id}`}>
        <div
          className={`${styles.encounter} ${
            !Boolean(encounterId) && styles.selected
          }`}
        >
          All
        </div>
      </Link>
      {raid.encounters
        .filter((encounter) => encounter.enabled)
        .map((encounter) => (
          <Link href={`/raids/${raid.id}/${encounter.id}`} key={encounter.id}>
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
