"use client";

import { Groups } from "@wowaudit-tools/utils/raidGroups";
import { useMemo } from "react";
import styles from "./CopyMrtButton.module.scss";

interface Props {
  groups: Groups;
}

export default function CopyMrtButton({ groups }: Props) {
  const mrtString = useMemo(() => {
    return groups.map((g) => g.map((char) => char.name).join("\n")).join("\n");
  }, [groups]);

  function handleCopyClick() {
    navigator.clipboard.writeText(mrtString);
  }

  return (
    <>
      <button className={styles.copyButton} onClick={handleCopyClick}>
        Copy MRT Import String
      </button>
    </>
  );
}
