import { createInterface } from "readline";
import { log } from "fp-ts/Console";
import { flow, pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { randomInt } from "fp-ts/Random";
import * as T from "fp-ts/Task";

// Create a task, Read from standard input
const getStrLn: T.Task<string> = () =>
  new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("> ", (answer) => {
      rl.close();
      resolve(answer);
    });
  });

// Write to standard output
// Flow, operate from left to right, so log, and mark the task complete.
const putStrLn = flow(log, T.fromIO);

// Create a task, by piping one function to another. (creates and resolves getStr task)
function ask(question: string): T.Task<string> {
  return pipe(
    putStrLn(question),
    T.chain(() => getStrLn)
  );
}

// Get a random int, task and resolve
const random = T.fromIO(randomInt(1, 5));

// parse a string to an int
function parse(s: string): O.Option<number> {
  const i = +s;
  return isNaN(i) || i % 1 !== 0 ? O.none : O.some(i);
}

function shouldContinue(name: string): T.Task<boolean> {
  return pipe(
    ask(`Do you want to continue ${name} (y/n)?`),
    T.chain((answer) => {
      switch (answer.toLowerCase()) {
        case "y":
          return T.of(true);
        case "n":
          return T.of(false);
        default:
          return shouldContinue(name);
      }
    })
  );
}

function gameLoop(name: string): T.Task<void> {
  return pipe(
    T.Do,
    T.apS("secret", random),
    T.apS("guess", ask(`${name}, please guess a number 1 to 5`)),
    T.chain(({ secret, guess }) =>
      pipe(
        parse(guess),
        O.fold(
          () => putStrLn("You did not enter an integer!"),
          (x) =>
            x === secret
              ? putStrLn(`You guessed right, ${name}!`)
              : putStrLn(
                  `You guessed wrong, ${name}! The number was: ${secret}`
                )
        )
      )
    ),
    T.chain(() => shouldContinue(name)),
    T.chain((b) => (b ? gameLoop(name) : T.of(undefined)))
  );
}

const main: T.Task<void> = pipe(
  ask("What is your name?"),
  T.chainFirst((name) => putStrLn(`Hello, ${name} welcome to the game!`)),
  T.chain(gameLoop)
);

// tslint:disable-next-line: no-floating-promises
main();
