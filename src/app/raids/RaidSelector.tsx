import { RaidWithoutDetails } from "@wowaudit-tools/api/wowaudit";
import Link from "next/link";
import styles from "./RaidSelector.module.scss";

interface Props {
  raids: RaidWithoutDetails[];
}

// how many days of past/future raids will be shown
const DAYS_IN_PAST = 14;
const DAYS_IN_FUTURE = 14;

function isDateInRange(date: string, start: string, end: string) {
  return date >= start && date <= end;
}

export default function RaidSelector({ raids }: Props) {
  const start = new Date();
  start.setDate(start.getDate() - DAYS_IN_PAST);
  const end = new Date();
  end.setDate(end.getDate() + DAYS_IN_FUTURE);
  const startStr = start.toISOString().substring(0, 10);
  const endStr = end.toISOString().substring(0, 10);

  // filter raids by start/end
  const filteredRaids = raids.filter((raid) =>
    isDateInRange(raid.date, startStr, endStr)
  );

  return (
    <div className={styles.container}>
      {filteredRaids.map((raid) => (
        <Link key={raid.id} href={`/raids/${raid.id}`}>
          <div className={styles.raid}>
            <span className={styles.date}>{raid.date}</span>
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
