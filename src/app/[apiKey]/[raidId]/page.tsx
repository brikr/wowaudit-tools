import FullRoster from "./FullRoster";

interface Props {
  params: {
    raidId: string;
  };
}

export default function Content({ params }: Props) {
  return <FullRoster />;
}
