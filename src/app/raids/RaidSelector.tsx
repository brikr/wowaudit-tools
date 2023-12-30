import { RaidWithoutDetails } from "@wowaudit-tools/api/wowaudit";
import Link from "next/link";
import styles from "./RaidSelector.module.scss";

interface Props {
  raids: RaidWithoutDetails[];
}

export default async function RaidSelector({ raids }: Props) {
  return (
    <div className={styles.container}>
      {raids.slice(0, 4).map((raid) => (
        <Link key={raid.id} href={`/raids/${raid.id}`}>
          <div className={styles.raid}>
            <span>{raid.date}</span>
            <span className={styles.title}>
              {raid.difficulty} {raid.instance}
            </span>
            <span>
              {raid.present_size}/{raid.total_size}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
