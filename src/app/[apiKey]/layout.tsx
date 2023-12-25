import RaidSelector from "./RaidSelector";
import WowauditSWRProvider from "./WowauditSwrProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WowauditSWRProvider>
      <RaidSelector />
      {children}
    </WowauditSWRProvider>
  );
}
