import { getRaid } from "@wowaudit-tools/api/wowaudit";
import FullRoster from "./FullRoster";

interface Props {
  params: {
    raidId: string;
  };
}

export default async function Content({ params: { raidId } }: Props) {
  const raid = await getRaid(raidId);

  return <FullRoster raid={raid} />;
}
