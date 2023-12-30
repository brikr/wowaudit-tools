import { getRaid } from "@wowaudit-tools/api/wowaudit";
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

  return (
    <div>
      <CopyMrtButton raid={raid} encounterId={Number(encounterId)} />
      <RaidFrames raid={raid} encounterId={Number(encounterId)} />
    </div>
  );
}
