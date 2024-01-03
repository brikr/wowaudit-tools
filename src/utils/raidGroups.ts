import { getWindfuryPriority } from "@wowaudit-tools/api/bloodmallet";
import { Character, Raid } from "@wowaudit-tools/api/wowaudit";

export type Groups = Character[][];
interface GroupTransformer {
  encounter?: string;
  fn: (groups: Groups) => Promise<Groups>;
}

function createInitialGroups(raid: Raid, encounterId: number): Groups {
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

// transformers are ran in order
const TRANSFORMERS: GroupTransformer[] = [
  {
    // g4 -> g1: tanks, healers, ranged, melee
    fn: async (groups: Groups) => {
      const roleMap: { [key: string]: Character[] } = {
        Tank: [],
        Heal: [],
        Ranged: [],
        Melee: []
      };
      let currentGroupIdx = 3;

      for (const group of groups) {
        for (const char of group) {
          roleMap[char.role].push(char);
        }
      }

      const newGroups: Groups = [];

      for (const role of ["Tank", "Heal", "Ranged", "Melee"]) {
        // sort characters in this role by class then name
        roleMap[role].sort(
          (a, b) =>
            a.class.localeCompare(b.class) || a.name.localeCompare(b.name)
        );

        for (const char of roleMap[role]) {
          newGroups[currentGroupIdx] ??= [];
          newGroups[currentGroupIdx].push(char);
          if (newGroups[currentGroupIdx].length === 5) {
            currentGroupIdx--;
          }
        }
      }

      return newGroups;
    }
  },
  {
    // windfury
    fn: async (groups: Groups) => {
      const windfuryPriority = await getWindfuryPriority();
      console.log(windfuryPriority);
      // TODO
      return groups;
    }
  },
  {
    // volcoross
    encounter: "Volcoross",
    fn: async (groups: Groups) => {
      // TODO
      return groups;
    }
  }
];

export async function generateGroups(
  raid: Raid,
  encounterId: number
): Promise<Groups> {
  const encounterName = raid.encounters.find(
    (enc) => enc.id === encounterId
  )!.name;

  let groups = createInitialGroups(raid, encounterId);

  for (const transformer of TRANSFORMERS) {
    if (
      transformer.encounter !== undefined &&
      transformer.encounter !== encounterName
    ) {
      // transformer not for this encounter. skip
      continue;
    }

    groups = await transformer.fn(groups);
  }

  return groups;
}
