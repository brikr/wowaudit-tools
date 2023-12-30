import { Raid, Character } from "@wowaudit-tools/api/wowaudit";

export function generateGroups(raid: Raid, encounterId: number): Character[][] {
  const charMap = new Map<number, Character>();
  for (const signup of raid.signups) {
    charMap.set(signup.character.id, signup.character);
  }

  const groups: Character[][] = [];
  let groupIdx = 0; // idx of the highest group that isn't full

  const encounter = raid.encounters.find((enc) => enc.id == encounterId)!;
  for (const selection of encounter.selections) {
    if (selection.selected) {
      const character: Character = {
        ...charMap.get(selection.character_id)!,
        class: selection.class,
        role: selection.role
      };

      groups[groupIdx] ??= [];
      groups[groupIdx].push(character);
      if (groups[groupIdx].length === 5) {
        groupIdx++;
      }
    }
  }

  return groups;
}
