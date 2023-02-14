class Square {
  constructor(public width: number) {
    this.width = width;
  }
}
class Rectangle extends Square {
  constructor(public width: number, public height: number) {
    super(width);
    this.height = height;
  }
}
type Shape = Square | Rectangle;

/**
 * only way to use instance of for a type is to create class instance and reference. 
 * Instance of cannot evaluate an interface, as runtime cannot enforce typechecks.
 * While shape is a type, and therefore cannot be evaluated, Rectangle is a value.
 */
const calcArea = (shape: Shape) => {
  if (shape instanceof Rectangle) {
    console.log(shape);
    return shape.width * shape.height
  } else {
    console.log(shape);
    return shape.width * shape.width;
  }
}

// const square = new Square(5);
// const rectangle = new Rectangle(2,5);
// console.log(calcArea(square));
// console.log(calcArea(rectangle));

/**
 * this doesnt work as type checks are only evaluated at compile, and not runtime
 * this would return the same string, or number as it is
 */
const asNumberBroken = (val: number | string): number => {
  return val as number;
}
/**
 * this is the working implementation as type assertion is forcing a numeric value
 * at runtime, and so both would return numbers (or NaN if applicable)
 */
const asNumber = (val: number | string): number => {
  return typeof (val) === 'string' ? Number(val) : val;
}

// One returns string, the other returns number
// console.log(typeof(asNumberBroken("53")));
// console.log(typeof(asNumber("53")));

/**
 * Structural Typing:
 *  typescript allows for different types to be used in place of others if 
 *  all properties of one object can be applied to another, (extended). This
 *  can have unexpected side effects as seen in the next example:
 */
interface Vector2D {
  x: number;
  y: number;
}

const calcLength = (v: Vector2D): number => {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Note: complier doesnt complain here, and if we run this, we get a "normalized"
 * vector, but with the wrong length calculated, as length only takes a 2d vector
 */
const normalizeVectorBroken = (v: Vector3D): Vector3D => {
  const length = calcLength(v);
  return {
    x: Number((v.x / length).toFixed(2)),
    y: Number((v.y / length).toFixed(2)),
    z: Number((v.z / length).toFixed(2)),
  }
}


const calcLength3D = (v: Vector3D): number => {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

const normalizeVector = (v: Vector3D): Vector3D => {
  const length = calcLength3D(v);
  return {
    x: Number((v.x / length).toFixed(2)),
    y: Number((v.y / length).toFixed(2)),
    z: Number((v.z / length).toFixed(2)),
  }
}

// Correct calculation is {x: .42, y: .57, z: .71} but returns { x: 0.6, y: 0.8, z: 1 }
// console.log(normalizeVectorBroken({ x: 3, y: 4, z: 5 }));
// console.log(normalizeVector({ x: 3, y: 4, z: 5 }));

// The dangers of "Any" type, note: even though we explicitly told ts age is a number
// output comes to be a concatenated string
let age: number;
age = '12' as any;
age += 1;

const addNumbers = (num1: number): number => {
  return num1 + 5;
}

// console.log(age);
// console.log(typeof age);
// console.log(addNumbers(age));

// "keyof" Introduction, implementing a generic and extracting a type from an interface
interface Point {
  x: number;
  y: number;
}
type PointKeys = keyof Point; // Type is "x" | "y"

const sortBy = <K extends keyof T, T>(vals: T[], key: K): T[] => {
  // Pretend we sorted
  return vals;
}
const pts: Point[] = [{ x: 1, y: 2 }, { x: 2, y: 0 }];
// sortBy(pts, 'x');
// sortBy(pts, 'y');
// sortBy(pts, Math.random() < .5 ? 'x': 'y');
// sortBy(pts, 'z');

interface Car {
  make: string;
  model: string;
}
const cars: Car[] = [{ make: 'Toyta', model: "2012" }, { make: "Ford", model: "2013" }];
// sortBy(cars, 'make');
// sortBy(cars, 'model');

// Tuples: a set of x items
// const list = [1,2];
// const tuple: [number, number] = list;

// const triple: [number,number,number] = [1,2,3];
// const double: [number,number] = triple;

// Exclude function to remove a type from a list of types
type excludedType = Exclude<string | Date, string | number>;
// Cannot exclude VALUES
type NonZeroNums = Exclude<number, 0>;
const nonZeroNum: NonZeroNums = 0;
// console.log(nonZeroNum)

/**
 * Nomenclature of types:
 * never: empty set,
 * literal: a single element, ex: 'a'
 * Value assignable to T: Value included in T,
 * T1 assignable to T2: T1 is a subset of T2,
 * T1 Extends T2: T1 is a subset of T2,
 * T1 | T2: Union of T1 and T2,
 * T1 & T2: Intersection of T1 and T2,
 * unknown: Universal set, commonly used in db queries.
 */

// Type Space vs Value Space
// interface Cylinder {
//   radius: number;
//   height: number;
// }
// const Cylinder = (radius: number, height: number) => ({ radius, height });

// const calculateVolume = (shape: unknown) => {
//   // Checks runtime instance, which is always value space, not type space
//   if (shape instanceof Cylinder) {
//     // shape.radius
//   }
// }

// Summary: interface | type = type space, let | const = value space
interface Person {
  first: string;
  last: string;
}
interface Res {
  value: string
}
const p: Person = { first: 'john', last: 'doe' };
const email = (p: Person, subject: string, body: string): Res => { return { value: "" } }

class Cylinder {
  radius = 1;
  height = 1;
}

const calculateVolume = (shape: unknown): void => {
  if (shape instanceof Cylinder) {
    console.log(shape);
    console.log(shape.height);
  }
}

// v == function, while T is the Class
const v = typeof Cylinder;
type T = typeof Cylinder;

declare const test: T;
// const a = new test() ? broken find out about constructor type vs instance type;

/**
 * Constructor Type vs Instance Type
 */
const fn = () => {
  return {
    x: 12,
    y: 15
  }
}

type p = ReturnType<typeof fn>
const returnTypeTest: p = {
  x: 1,
  y: 2
}

// Constructing Types
type PersonEl = Person["first" | "last"]; // Type is only string
type Tuple = [string, number, Date];
type TupleEl = Tuple[number]; // Type is string/number/date

/**
 * Type Declarations vs Type Assertions
 */
interface Person2 {
  name: string
}

// Type Declaration - Forced Syntax onto item
const alice: Person2 = { name: "Alice" };
// Type Assertion - Override inferred type and assert new type
const bob = { name: "Bob" } as Person2;

// First errors due to declared type, second does not even though its missing properties,
// this also occurs with additional properties
// const alice2: Person2 = {};
// const bob2 = {} as Person2;

// Type declaration for mapping - this changes a string[] to a Person2[]
const people = ['alice', 'bob', 'jan'].map(name => {
  const person: Person2 = { name };
  return person
});
/* ------ OR ------ */
const people2: Person2[] = ['alice', 'bob', 'jan'].map(
  (name): Person2 => ({ name })
);

// Non-null assertions
const elNull = document.getElementById('foo'); // HTMLElement | null
const el = document.getElementById('foo')!; // forces HTMLElement

// Force Assertion
const body = document.body;
const elForced = body as unknown as Person2; // Forced conversion with no normal overlap

// Limits to property checking
interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}

// Errors on unknown property
// const r: Room = {
//   numDoors: 1,
//   ceilingHeightFt: 14,
//   elephant: "Present"
// }
// An intermediate can be passed to bypass this
const elephantObj = {
  numDoors: 1,
  ceilingHeightFt: 14,
  elephant: "Present"
}

// Passes type check because Room is a subset of elephantObj
const r: Room = elephantObj;

interface Options {
  title: string;
  darkMode?: boolean;
}

const setDarkMode = () => { };
const createWindow = (options: Options): void => {
  if (options.darkMode) setDarkMode();
}
// Errors on specified darkmode sytax;
// createWindow({
//   title: "Solitaire",
//   darkmode: true
// });

// Both of these include title properties so they can be assigned to our options type
const o1: Options = document;
const o2: Options = new HTMLAnchorElement;

// mapped types and interfaces
type State = {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}

// This is repetative, and can be condensed into a mapped type/interface
// type TopNavState = {
//   userId: string;
//   pageTitle: string;
//   recentFiles: string[];
// }

type TopNavState = {
  [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k];
}

// using pick
type PickTopNavState = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>