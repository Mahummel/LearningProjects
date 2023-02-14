type DiceFace = {
  effect: 'damage';
  type: DamageTypes;
  value: number;
} | null

type DamageTypes = 'physical' | 'fire' | 'electric' | 'nature' | 'holy' | 'dark';
export type Dice = [DiceFace, DiceFace, DiceFace, DiceFace, DiceFace, DiceFace];