import { getRaidList } from "@wowaudit-tools/api/wowaudit";
import RaidSelector from "./RaidSelector";

export default async function Content() {
  const { raids } = await getRaidList();

  return (
    <main>
      <RaidSelector raids={raids} />
    </main>
  );
}
