import React from "react";
import EncounterSelector from "./EncounterSelector";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EncounterSelector />
      {children}
    </>
  );
}
