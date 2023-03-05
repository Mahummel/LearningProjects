import { pipe, flow } from "fp-ts/lib/function";

// Pipe demo
const add1 = (a: number) => a + 1;
const multiplyBy2 = (a: number) => a * 2;

pipe(4, add1, multiplyBy2, multiplyBy2, console.log); // right to left
// order of above operations would be: (((4 + 1) * 2) * 2) and log results
// pipe down the line

const toString = (a: number) => `${a}`; // Transform number to string
pipe(4, add1, multiplyBy2, toString);

// flow demo
const add = (a: number, b: number) => a + b;
flow(add, multiplyBy2, console.log)(2, 4);

const concat = (a: number, transform: (a: number) => string) => [
  a,
  transform(a),
];

// Bad, anonymous functions now takes a parameter
concat(1, (n) => pipe(n, add1, multiplyBy2, toString));

// Better, removing parameter
concat(1, flow(add1, multiplyBy2, toString));

// flow returns a function and can be used for chaining callbacks

// Key take away pipe and flow are used for data transformation