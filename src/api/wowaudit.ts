import { cookies } from "next/headers";

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

export interface RaidWithoutDetails {
  id: number;
  date: string;
  instance: string;
  difficulty: string;
  present_size: number;
  total_size: number;
}

export interface Raid extends RaidWithoutDetails {
  id: number;
  signups: Signup[];
  encounters: Encounter[];
}

export interface RaidsResponse {
  raids: RaidWithoutDetails[];
}

const API_BASE = "https://wowaudit.com";

async function fetchWithCookie<T>(
  endpoint: string,
  init?: RequestInit
): Promise<T> {
  const waKey = cookies().get("waKey")?.value;
  if (!waKey) {
    throw new Error("Invalid Wowaudit API Key");
  }

  const waResponse = await fetch(`${API_BASE}${endpoint}`, {
    ...init,
    headers: { ...init?.headers, Authorization: waKey }
  });
  return waResponse.json();
}

export async function getRaidList(): Promise<RaidsResponse> {
  const params = new URLSearchParams();
  params.set("include_past", "true");
  return fetchWithCookie(`/v1/raids?${params}`);
}

export async function getRaid(id: string | number): Promise<Raid> {
  return fetchWithCookie(`/v1/raids/${id}`);
}
