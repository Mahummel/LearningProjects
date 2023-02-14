import { SaveState } from "./schema";
import baseSave from "./files/base-save.json";

export const loadSave = (file: number): SaveState => {
  const save = require(`./files/save-${file}.json`);
  if (isValidSave(save)) {
    return save;
  }
  throw new Error("Save file corrupted");
}

const isValidSave = (save: unknown): save is SaveState => {
  if (!(save instanceof Object)) return false;
  for (const property in baseSave) {
    if (!(property in save)) return false;
    if (typeof baseSave[property] != typeof save[property]) return false;
    if (typeof save[property] === 'string' && save[property].length === 0) {
      return false;
    }
    if (typeof save[property] === 'number' && save[property] < 0) {
      return false;
    }
  }
  return true;
}