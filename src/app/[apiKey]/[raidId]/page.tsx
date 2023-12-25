interface Props {
  params: {
    raidId: string;
  };
}

export default function Content({ params }: Props) {
  return <div>{params.raidId}</div>;
}
