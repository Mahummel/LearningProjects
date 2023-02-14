/**
 * Docs:
 *
 * The purpose of this application is to demonstrate 'save' states for game mechanics via postgres
 * and typescript integration, included is a base js file meant to run on a migrate command
 * this migrate command is to update the postgres tables to the latest versions, and downgrade
 * if required.
 *
 * V1.0 will not utilize postgres, but instead will save to a local json file.
 */

import { PlayerCharacter } from "./player/player";
import { loadSave } from "./saves/saves";
import { SaveState } from "./saves/schema";
import { createInterface } from "readline";
import { promises } from "fs";

/**
 * Main: Application entry point
 */
class Main {
  private saveState: SaveState;
  private character: PlayerCharacter;
  constructor(saveFile: number) {
    this.setSaveState(saveFile);
    this.setCharacter(this.saveState);
  }

  // On init, get current state of user's game
  async init() {
    this.startMenu();
  }

  private async startMenu(): Promise<void> {
    let files: string[] = [];
    try {
      files = await promises.readdir(`${__dirname}/saves/files`);
    } catch (e) {
      console.log(`Error: ${e instanceof Error ? e.message : e}`);
      process.exit(1);
    }

    if (files.length === 0) {
      console.error("Could not find the directory.");
      process.exit(1);
    }

    let filePromises: Promise<string>[] = [];

    for (const file of files) {
      const promise = new Promise<string>(async () => {
        try {
          const fileStats = await promises.stat(
            `${__dirname}/saves/files/${file}`
          );
          if (!fileStats) {
            Promise.reject("Could not find the directory.");
          }
          if (
            fileStats.isFile() &&
            file !== "base-save.json" &&
            file.match(/-\d+\.json$/)
          ) {
            const lastModified = fileStats.mtime
              .toString()
              .substring(4, fileStats.mtime.toString().indexOf(":") - 2);
            Promise.resolve(`${file}: ${lastModified}`);
          }
          Promise.resolve();
        } catch (e) {
          Promise.reject(`Error: ${e instanceof Error ? e.message : e}`);
        }
      });
      filePromises.push(promise);
    }

    try {
      const fileList = await Promise.all(filePromises);
      console.log(fileList);
    } catch (e) {
      console.log(`Error: ${e instanceof Error ? e.message : e}`);
    }

    const test = await this.prompt("Select a file number: ");
    console.log(test);
  }

  private async prompt(msg: string): Promise<string> {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const question = () =>
      new Promise<string>((resolve) => rl.question(msg, resolve)).finally(() =>
        rl.close()
      );
    return Promise.resolve(question());
  }

  private setSaveState(fileNumber: number): void {
    this.saveState = loadSave(fileNumber);
  }
  private setCharacter(save?: SaveState) {
    this.character = new PlayerCharacter(save ?? undefined);
  }
}

const application = new Main(1);
application.init();
