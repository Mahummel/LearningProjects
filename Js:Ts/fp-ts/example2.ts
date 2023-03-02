import { log } from "fp-ts/Console";
import { Kind, URIS } from "fp-ts/HKT";
import * as O from "fp-ts/Option";
import { randomInt } from "fp-ts/Random";
import * as T from "fp-ts/Task";
import { createInterface } from "readline";
import * as S from "fp-ts/State";
import { Monad1 } from "fp-ts/lib/Monad";
import { flow, pipe } from "fp-ts/lib/function";
import { apS as apS_ } from "fp-ts/lib/Apply";
import { chainFirst as chainFirst_ } from "fp-ts/lib/Chain";

// Type classes

interface Program<F extends URIS> extends Monad1<F> {
  readonly finish: <A>(a: A) => Kind<F, A>;
}

interface Console<F extends URIS> {
  readonly putStrLn: (message: string) => Kind<F, void>;
  readonly getStrLn: Kind<F, string>;
}

interface Random<F extends URIS> {
  readonly nextInt: (upper: number) => Kind<F, number>;
}

interface Main<F extends URIS> extends Program<F>, Console<F>, Random<F> {}

// Instances

const programTask: Program<T.URI> = {
  ...T.Monad,
  finish: T.of,
};

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

const putStrLn = flow(log, T.fromIO);

const consoleTask: Console<T.URI> = {
  putStrLn,
  getStrLn,
};

const randomTask: Random<T.URI> = {
  nextInt: (upper) => T.fromIO(randomInt(1, upper)),
};

// Recreate game

function parse(s: string): O.Option<number> {
  const i = +s;
  return isNaN(i) || i % 1 !== 0 ? O.none : O.some(i);
}

function main<F extends URIS>(F: Main<F>): Kind<F, void> {
  const chain =
    <A, B>(f: (a: A) => Kind<F, B>) =>
    (ma: Kind<F, A>): Kind<F, B> =>
      F.chain(ma, f);
  const Do: Kind<F, {}> = F.of({});
  const apS = apS_(F);
  const chainFirst = chainFirst_(F);

  const ask = (question: string): Kind<F, string> =>
    pipe(
      F.putStrLn(question),
      chain(() => F.getStrLn)
    );

  const shouldContinue = (name: string): Kind<F, boolean> => {
    return pipe(
      ask(`Do you want to continue ${name} (y/n)?`),
      chain((answer) => {
        switch (answer.toLowerCase()) {
          case "y":
            return F.of<boolean>(true);
          case "n":
            return F.of<boolean>(false);
          default:
            return shouldContinue(name);
        }
      })
    );
  };

  const gameLoop = (name: string): Kind<F, void> => {
    return pipe(
      Do,
      apS("secret", F.nextInt(5)),
      apS("guess", ask(`${name} please guess a number 1 to 5`)),
      chain(({ secret, guess }) =>
        pipe(
          parse(guess),
          O.fold(
            () => F.putStrLn("You did not enter an integer"),
            (x) =>
              x === secret
                ? F.putStrLn(`You guessed right, ${name}`)
                : F.putStrLn(
                    `You guessed wrong ${name}, the number was: ${secret}`
                  )
          )
        )
      ),
      chain(() => shouldContinue(name)),
      chain((b) => (b ? gameLoop(name) : F.of<void>(undefined)))
    );
  };

  return pipe(
    ask("What is your name"),
    chainFirst((name) => F.putStrLn(`Hello ${name} welcome to the game`)),
    chain(gameLoop)
  );
}

export const mainTask = main({
  ...programTask,
  ...consoleTask,
  ...randomTask,
});

// Testing
import { dropLeft, append } from "fp-ts/ReadonlyArray";

class TestData {
  constructor(
    readonly input: ReadonlyArray<string>,
    readonly output: ReadonlyArray<string>,
    readonly nums: ReadonlyArray<number>
  ) {}
  putStrLn(message: string): [void, TestData] {
    return [
      undefined,
      new TestData(this.input, pipe(this.output, append(message)), this.nums),
    ];
  }
  getStrLn(): [string, TestData] {
    return [
      this.input[0],
      new TestData(dropLeft(1)(this.input), this.output, this.nums),
    ];
  }
  nextInt(_upper: number): [number, TestData] {
    return [
      this.nums[0],
      new TestData(this.input, this.output, dropLeft(1)(this.nums)),
    ];
  }
}

const URI = "Test";
type URI = typeof URI;

declare module "fp-ts/HKT" {
  interface URItoKind<A> {
    readonly Test: Test<A>;
  }
}

interface Test<A> extends S.State<TestData, A> {}

const of =
  <A>(a: A): Test<A> =>
  (data) =>
    [a, data];
const programTest: Program<URI> = {
  ...S.Monad,
  URI,
  finish: of,
};

const consoleTest: Console<URI> = {
  putStrLn: (message) => (data) => data.putStrLn(message),
  getStrLn: (data) => data.getStrLn(),
};

const randomTest: Random<URI> = {
  nextInt: (upper) => (data) => {
    return data.nextInt(upper);
  },
};

const mainTestTask = main({
  ...programTest,
  ...consoleTest,
  ...randomTest,
});

const testExample = new TestData(["Michael", "1", "n"], [], [1]);

import * as assert from "assert";

assert.deepStrictEqual(mainTestTask(testExample), [
  undefined,
  new TestData(
    [],
    [
      "What is your name",
      "Hello Michael welcome to the game",
      "Michael please guess a number 1 to 5",
      "You guessed right, Michael",
      "Do you want to continue Michael (y/n)?",
    ],
    []
  ),
]);
