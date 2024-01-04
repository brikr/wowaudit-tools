import { ClassSpec, stringToClassSpec } from "@wowaudit-tools/utils/classSpec";

interface ApiWindfuryResponse {
  // not sure difference between this and sorted_data_keys, but the chart uses this one
  sorted_data_keys_2: string[];
}

const API_URL =
  "https://bloodmallet.com/chart/get/windfury_totem/castingpatchwerk/shaman/enhancement";

export async function getWindfuryPriority(): Promise<ClassSpec[]> {
  const response = await fetch(API_URL, {
    next: {
      // cache for a day
      revalidate: 86400
    }
  });
  const json = (await response.json()) as ApiWindfuryResponse;

  return json.sorted_data_keys_2.map(stringToClassSpec);
}
