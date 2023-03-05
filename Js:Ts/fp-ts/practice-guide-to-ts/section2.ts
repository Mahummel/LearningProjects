import { pipe, flow } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";
// Options used to wrap values.
// if a value exists, there is "some" option,
// if a value doesnt exists, there is "none".
// Option is a union of "None", and "Some"

// Options used with maps
const foo = {
  bar: "hello",
};

pipe(foo, (a) => a.bar, console.log); // "hello"

interface Foo {
  bar: string;
}

const foo2 = {
  bar: "hello",
} as Foo | undefined; // for testing, please dont use type assertions

pipe(foo2, (a) => a?.bar); // still hello

// Still using a variable in an anonymous function
// pipe(foo2, ({bar}) => bar); // this errors on could be undefined

// Use option to avoid above issue
pipe(
  foo2,
  O.fromNullable,
  O.map(({ bar }) => bar),
  console.log
); // some + a value
pipe(
  undefined,
  O.fromNullable,
  O.map(({ bar }) => bar),
  ({ _tag }) => _tag,
  console.log
); // none + no value

// This works by containing the value, so now a check
// is made and THEN a value is output. we can make it error again
// if we try to access the value object. However,
// we can always access the _tag property
// O.fromNullable is what creates this object.
// O.map extracts the property, if and only if
// a _tag property of "Some" exits. if "None" is
// present, then no operation is actually performed

// Flatten

interface Fizz {
  buzz: string;
}

interface Foo3 {
  bar?: Fizz;
}

const foo3 = { bar: undefined } as Foo3 | undefined;

pipe(foo3, (f) => f?.bar?.buzz); // undefined

// pipe(
//   foo3,
//   O.fromNullable,
//   O.map(({bar: {buzz}}) => buzz),
// ) // Error because buzz isnt part of fizz/undefined
pipe(
  foo3,
  O.fromNullable,
  O.map(({ bar }) =>
    pipe(
      bar,
      O.fromNullable,
      O.map(({ buzz }) => buzz)
    )
  ),
  console.log
); // Problem is we construct an inner object, when all we want is none returned

pipe(
  foo3,
  O.fromNullable,
  O.map(({ bar }) =>
    pipe(
      bar,
      O.fromNullable,
      O.map(({ buzz }) => buzz)
    )
  ),
  O.flatten,
  console.log
); // correctly outputs 'none'

// This is a bit verbose and can be "flattened" with chain
pipe(
  foo3,
  O.fromNullable,
  O.map(({ bar }) => bar),
  O.chain(
    flow(
      O.fromNullable,
      O.map(({ buzz }) => buzz)
    )
  ),
  console.log
); // Shorter, same outcome