"use client";

import html2canvas from "html2canvas";
import styles from "./ScreenshotButton.module.scss";

export function ScreenshotButton() {
  async function handleScreenshotClick() {
    "use client";
    const encounters = document.getElementById("encounters");
    if (encounters === null) return;
    const canvas = await html2canvas(encounters);
    canvas.toBlob((blob) => {
      if (blob === null) return;
      navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
    });
  }

  return (
    <button className={styles.screenshotButton} onClick={handleScreenshotClick}>
      Copy Full Roster Screenshot
    </button>
  );
}
