import React from "react";
import RaidSelector from "./RaidSelector";
import { getRaidList } from "@wowaudit-tools/api/wowaudit";

interface Props {
  params: {
    raidId?: string;
    encounterId?: string;
  };
  children: React.ReactNode;
}

export default async function Layout({ params, children }: Props) {
  const data = await getRaidList();

  return (
    <>
      <RaidSelector raids={data.raids} params={params} />
      {children}
    </>
  );
}
