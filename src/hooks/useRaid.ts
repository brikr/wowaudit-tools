import { useWowauditSWR } from "./useWowauditSWR";

export interface Character {
  id: number;
  name: string;
  realm: string;
  class: string;
  role: string;
}

export interface Signup {
  character: Character;
}

export interface Selection {
  character_id: number;
  selected: boolean;
  class: string;
  role: string;
}

export interface Encounter {
  id: number;
  name: string;
  enabled: boolean;
  selections: Selection[];
}

export interface Raid {
  id: number;
  signups: Signup[];
  encounters: Encounter[];
}

export function useRaid(id: number) {
  return useWowauditSWR<Raid>(`/v1/raids/${id}`);
}
