import { Dice } from "../dice/schema"

export type SaveState = {
  name: string,
  max_health: number,
  current_health: number,
  max_mana: number,
  current_mana: number,
  current_level: number,
  current_exp: number,
  exp_to_level: number
  dice?: Dice[]
}

