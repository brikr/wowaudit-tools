const WOW_TO_CSS: { [key: string]: string } = {
  "Death Knight": "death-knight",
  "Demon Hunter": "demon-hunter",
  Druid: "druid",
  Evoker: "evoker",
  Hunter: "hunter",
  Mage: "mage",
  Monk: "monk",
  Paladin: "paladin",
  Priest: "priest",
  Rogue: "rogue",
  Shaman: "shaman",
  Warlock: "warlock",
  Warrior: "warrior"
};

export function getCssClassForWowClass(wowClass: string) {
  return WOW_TO_CSS[wowClass] ?? "";
}
