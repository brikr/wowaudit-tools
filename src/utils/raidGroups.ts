import { getWindfuryPriority } from "@wowaudit-tools/api/bloodmallet";
import { getSpecPriorityForEncounter } from "@wowaudit-tools/api/warcraftlogs";
import { Character, Raid } from "@wowaudit-tools/api/wowaudit";
import { ClassSpec } from "./classSpec";

export type Groups = Character[][];
interface GroupTransformer {
  encounter?: string;
  fn: (groups: Groups, encounter: string) => Promise<Groups>;
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

// swaps two players in-place
function swap(
  groups: Groups,
  firstGroup: number,
  firstSlot: number,
  secondGroup: number,
  secondSlot: number
) {
  const temp = groups[firstGroup][firstSlot];
  groups[firstGroup][firstSlot] = groups[secondGroup][secondSlot];
  groups[secondGroup][secondSlot] = temp;
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
    // windfury group 1
    // TODO: doesn't account for double enhance
    // TODO: doesn't properly separate tans from dps in logic
    fn: async (groups: Groups, encounter: string) => {
      // find the enhance shaman and put them in group 1 slot 1
      let enhanceFound = false;
      groupLoop: for (let groupIdx = 0; groupIdx < groups.length; groupIdx++) {
        for (let slotIdx = 0; slotIdx < groups[groupIdx].length; slotIdx++) {
          const char = groups[groupIdx][slotIdx];
          if (char.class === "Shaman" && char.role === "Melee") {
            enhanceFound = true;
            swap(groups, groupIdx, slotIdx, 0, 0);
            break groupLoop;
          }
        }
      }
      if (!enhanceFound) {
        // no windfury
        return groups;
      }

      function isSpecPlayedOnFight(
        spec: ClassSpec,
        specPrio: ClassSpec[]
      ): boolean {
        // tanks are always played
        if (
          [
            "Protection",
            "Guardian",
            "Brewmaster",
            "Blood",
            "Vengeance"
          ].includes(spec.spec)
        ) {
          return true;
        }

        // find the first class match
        const classMatch = specPrio.find((cs) => cs.class === spec.class);

        // if the spec matches, it's the best spec on the fight for this class
        return classMatch?.spec === spec.spec;
      }

      // the next slot we'll put a windfurier in
      let nextWindfurySlotIdx = 1;

      const [windfuryPriority, specPriority] = await Promise.all([
        getWindfuryPriority(),
        getSpecPriorityForEncounter(encounter)
      ]);

      for (const spec of windfuryPriority) {
        if (spec.spec === "Enhancement") {
          // don't move the shaman
          continue;
        }
        if (isSpecPlayedOnFight(spec, specPriority)) {
          // find any players of this class and put them in windfury group

          for (let groupIdx = 0; groupIdx < groups.length; groupIdx++) {
            // don't search the existing windfuriers for more candidates
            const initialSlotIdx = groupIdx === 0 ? nextWindfurySlotIdx : 0;
            for (
              let slotIdx = initialSlotIdx;
              slotIdx < groups[groupIdx].length;
              slotIdx++
            ) {
              const char = groups[groupIdx][slotIdx];
              if (
                (char.role === "Melee" || char.role === "Tank") &&
                char.class === spec.class
              ) {
                // swap it into wf group
                swap(groups, 0, nextWindfurySlotIdx, groupIdx, slotIdx);
                nextWindfurySlotIdx++;

                if (nextWindfurySlotIdx === 5) {
                  // group is full!
                  return groups;
                }
              }
            }
          }
        }
      }

      // technically shouldn't get here
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

    groups = await transformer.fn(groups, encounterName);
  }

  return groups;
}
