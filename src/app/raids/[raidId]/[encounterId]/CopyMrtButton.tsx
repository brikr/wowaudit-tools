"use client";

import { Raid } from "@wowaudit-tools/api/wowaudit";
import { generateGroups } from "@wowaudit-tools/utils/generateRaidGroups";
import { useMemo } from "react";
import styles from "./CopyMrtButton.module.scss";

interface Props {
  raid: Raid;
  encounterId: number;
}

export default async function CopyMrtButton({ raid, encounterId }: Props) {
  const mrtString = useMemo(() => {
    if (raid) {
      const groups = generateGroups(raid, encounterId);
      return groups
        .map((g) => g.map((char) => char.name).join("\n"))
        .join("\n");
    } else {
      return "";
    }
  }, [raid, encounterId]);

  function handleCopyClick() {
    navigator.clipboard.writeText(mrtString);
  }

  return (
    <>
      <button className={styles.copyButton} onClick={handleCopyClick}>
        Copy MRT import string
      </button>
    </>
  );
}
