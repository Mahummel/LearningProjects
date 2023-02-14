import { Dice } from "../dice/schema";
import { SaveState } from "../saves/schema";
import { IPlayerCharacter } from "./schema";
import baseSave from '../saves/files/base-save.json';

export class PlayerCharacter implements IPlayerCharacter {
  private name: string;
  private maxHealth: number;
  private maxMana: number;
  private currentHealth: number;
  private currentMana: number;
  private level: number;
  private exp: number;
  public dice: Dice[];

  constructor(save?: SaveState) {
    this.setFromSave(save ?? undefined);
  }

  getName(): string {
    return this.name;
  }
  getMaxHealth(): number {
    return this.maxHealth;
  }
  getMaxMana(): number {
    return this.maxMana;
  }
  getCurrentHealth(): number {
    return this.currentHealth;
  }
  getCurrentMana(): number {
    return this.currentMana;
  }
  getLevel(): number {
    return this.level;
  }
  getExp(): number {
    return this.exp;
  }

  displayCharacterStats(): void {
    console.log(`Player: ${this.getName()}`);
    console.log(`Health: ${this.getCurrentHealth()}/${this.getMaxHealth()}`);
    console.log(`Mana: ${this.getCurrentMana()}/${this.getMaxMana()}`);
    console.log(`Level: ${this.getLevel()}\nExp: ${this.getExp()}`);
  }

  private setName(name: string): void {
    this.checkStat(name, "Invalid Name");
    this.name = name;
  }
  private setMaxHealth(health: number): void {
    this.checkStat(health, "Invalid Health Stat");
    this.maxHealth = health;
  }
  private setMaxMana(mana: number): void {
    this.checkStat(mana, "Invalid Mana Stat");
    this.maxMana = mana;
  }
  private setCurrentHealth(health: number): void {
    this.checkStat(health, "Invalid Health Stat");
    this.currentHealth = health;
  }
  private setCurrentMana(mana: number): void {
    this.checkStat(mana, "Invalid Mana Stat");
    this.currentMana = mana;
  }
  private setLevel(level: number): void {
    this.checkStat(level, "Invalid Player Level");
    this.level = level;
  }
  private setExp(exp: number): void {
    this.checkStat(exp, "Invalid Player Exp");
    this.exp = exp;
  }

  private setDice(dice: Dice[] | null) {
    this.dice = dice ?? this.defaultDice();
  }

  private defaultDice(): Dice[] {
    const startingDice: Dice[] = [
      [{ effect: 'damage', type: 'physical', value: 1 }, { effect: 'damage', type: 'physical', value: 1 }, { effect: 'damage', type: 'physical', value: 1 }, null, null, null]
    ]
    return startingDice;
  }

  private checkStat(stat: number | string, msg: string): void {
    if (typeof stat === 'number' && stat < 0) throw new Error(`Error: ${msg}`);
    if (typeof stat === 'string' && stat.length === 0) throw new Error(`Error: ${msg}`);
  }

  private setFromSave(save?: SaveState): void {
    const saveSet: SaveState = save ?? baseSave; 
    this.setName(saveSet.name);
    this.setMaxHealth(saveSet.max_health);
    this.setMaxMana(saveSet.max_mana);
    this.setCurrentHealth(saveSet.current_health);
    this.setCurrentMana(saveSet.current_mana);
    this.setLevel(saveSet.current_level);
    this.setExp(saveSet.current_exp);
    this.setDice(saveSet.dice ?? null);
  }
}