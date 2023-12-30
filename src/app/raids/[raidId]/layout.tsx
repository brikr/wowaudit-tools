import { getRaid } from "@wowaudit-tools/api/wowaudit";
import React from "react";
import EncounterSelector from "./EncounterSelector";

interface Props {
  params: {
    raidId: string;
    encounterId?: string;
  };
  children: React.ReactNode;
}

export default async function Layout({ params, children }: Props) {
  const raid = await getRaid(params.raidId);

  return (
    <>
      <EncounterSelector raid={raid} params={params} />
      {children}
    </>
  );
}
