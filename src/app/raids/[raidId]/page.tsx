import { getRaid } from "@wowaudit-tools/api/wowaudit";
import Link from "next/link";
import FullRoster from "./FullRoster";
import { ScreenshotButton } from "./ScreenshotButton";

interface Props {
  params: {
    raidId: string;
  };
}

export default async function Content({ params: { raidId } }: Props) {
  const raid = await getRaid(raidId);

  return (
    <main>
      <Link href="/raids">
        <button>Back to Raid List</button>
      </Link>
      <h2>
        {raid.date}: {raid.difficulty} {raid.instance}
      </h2>
      <ScreenshotButton />
      <FullRoster raid={raid} />
    </main>
  );
}
