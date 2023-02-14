import assert from "node:assert";
import { describe, it } from "node:test";
import { SaveState } from "../saves/schema";
import { PlayerCharacter } from "./player";

const saveState: SaveState = {
  name: "Michael",
  max_health: 10,
  max_mana: 10,
  current_exp: 100,
  current_health: 10,
  current_level: 4,
  current_mana: 10,
  exp_to_level: 1001,
}

describe("Player tests", () => {
  it("should set stats correctly and initialize player", (done) => {
    const sut = new PlayerCharacter(saveState);

    assert(sut.getName() === "Michael");
    assert(sut.getMaxHealth() === 10);
    assert(sut.getMaxMana() === 12);
    assert(sut.getCurrentHealth() === 10);
    assert(sut.getCurrentMana() === 12);
    assert(sut.getLevel() === 2);
    assert(sut.getExp() === 21);
    done();
  });
  it("should throw an error on an invalid number type", (done) => {
    saveState.max_health = -4;
    new PlayerCharacter(saveState);
    done();
  });
  it("should throw an error on an invalid string type", (done) => {
    saveState.name = '';
    new PlayerCharacter(saveState);
    done();
  });
});