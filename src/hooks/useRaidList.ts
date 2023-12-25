import { useWowauditSWR } from "./useWowauditSWR";

interface RaidWithoutDetails {
  id: number;
  date: string;
  instance: string;
  difficulty: string;
  present_size: number;
  total_size: number;
}

interface RaidsResponse {
  raids: RaidWithoutDetails[];
}

export function useRaidList() {
  return useWowauditSWR<RaidsResponse>("/v1/raids");
}
