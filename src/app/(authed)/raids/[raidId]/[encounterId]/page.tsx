import { getRaid } from "@wowaudit-tools/api/wowaudit";
import Link from "next/link";
import CopyMrtButton from "./CopyMrtButton";
import RaidFrames from "./RaidFrames";

interface Props {
  params: {
    raidId: string;
    encounterId: string;
  };
}

export default async function Encounter({
  params: { raidId, encounterId }
}: Props) {
  const raid = await getRaid(raidId);

  const encounterName = raid.encounters.find(
    (enc) => enc.id === Number(encounterId)
  )!.name;

  return (
    <div>
      <Link href={`/raids/${raid.id}`}>
        <button>Back to Full Roster</button>
      </Link>
      <h2>
        {raid.date}: {raid.difficulty} {encounterName}
      </h2>
      <CopyMrtButton raid={raid} encounterId={Number(encounterId)} />
      <RaidFrames raid={raid} encounterId={Number(encounterId)} />
    </div>
  );
}
