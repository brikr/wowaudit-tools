"use client";

import { useRaid } from "@raid-group-maker/hooks/useRaid";
import { generateGroups } from "@raid-group-maker/utils/generateRaidGroups";
import { useParams } from "next/navigation";
import styles from "./CopyMrtButton.module.scss";
import { useMemo, useRef } from "react";

export default function CopyMrtButton() {
  const { raidId, encounterId } = useParams();
  const { data: raid, isLoading } = useRaid(Number(raidId));

  const mrtString = useMemo(() => {
    if (raid) {
      const groups = generateGroups(raid, Number(encounterId));
      return groups
        .map((g) => g.map((char) => char.name).join("\n"))
        .join("\n");
    } else {
      return "";
    }
  }, [raid, encounterId]);

  if (isLoading || !raid) return null;

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
