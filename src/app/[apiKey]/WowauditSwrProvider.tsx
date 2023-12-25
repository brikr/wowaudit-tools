"use client";

import { useParams } from "next/navigation";
import { SWRConfig } from "swr";

export default function WowauditSWRProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { apiKey } = useParams();

  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, { headers: { Authorization: apiKey }, ...init }).then(
            (res) => res.json()
          )
      }}
    >
      {children}
    </SWRConfig>
  );
}
