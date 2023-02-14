// basics: to be included: player stats, and equipment interfaces
export interface IPlayerCharacter {
  // Properties
  // private name: string;
  // private maxHealth: number;
  // private maxMana: number;
  // private currentHealth: number;
  // private currentMana: number;
  // private level: number;
  // private exp: number;
  // getters
  getName(): string,
  getMaxHealth(): number,
  getMaxMana(): number,
  getCurrentHealth(): number,
  getCurrentMana(): number,
  getLevel(): number,
  getExp(): number,
  // setters
  // setName(name: string): void,
  // setMaxHealth(health: number): number,
  // setMaxMana(mana: number): number,
  // setCurrentHealth(health: number): number,
  // getCurrentMana(mana: number): number,
  // setLevel(level: number): void,
  // setExp(exp: number): void,
  // functions
  // setFromSave(save: SaveState): void,
}