"use client";

import html2canvas from "html2canvas";
import styles from "./ScreenshotButton.module.scss";

export function ScreenshotButton() {
  async function handleScreenshotClick() {
    const encounters = document.getElementById("encounters");
    if (encounters === null) return;
    encounters.classList.add(styles.screenshot);
    const canvas = await html2canvas(encounters, {
      backgroundColor: null
    });
    encounters.classList.remove(styles.screenshot);
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
