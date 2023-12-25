import useSWR, { SWRResponse } from "swr";
import { useParams } from "next/navigation";

export function useWowauditSWR<Data>(endpoint: string): SWRResponse<Data> {
  const { apiKey } = useParams();

  return useSWR(`/api/wowaudit/${endpoint}`);
}
