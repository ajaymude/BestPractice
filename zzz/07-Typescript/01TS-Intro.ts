

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// 01 - installation 

// npm install -g typescript
// tsc --init  # Creates a tsconfig.json


// tsc index.ts
// node index.js


// npm init -y
// npm i @types/node 


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// 02 - variable assignment 

// TypeScript Variable Assignment Examples

// 1. String
let name: string = "Alice";

// 2. Number
let age: number = 25;

// 3. Boolean
let isActive: boolean = true;

// 4. Array
let scores: number[] = [90, 85, 78];
let names: string[] = ["Alice", "Bob"];

// 5. Object
let user: { name: string; age: number } = {
  name: "Alice",
  age: 25
};

// 6. Any Type (Avoid if possible)
let anything: any = "hello";
anything = 123; // no error

// 7. Type Inference
let message = "Hi"; // inferred as string

// 8. Const Example
const PI: number = 3.14;

// Console log all variables
console.log("Name:", name);
console.log("Age:", age);
console.log("Is Active:", isActive);
console.log("Scores:", scores);
console.log("Names:", names);
console.log("User:", user);
console.log("Anything:", anything);
console.log("Message:", message);
console.log("PI:", PI);



// A variable that can be a string or a number
let userId: string | number;

userId = 101;         // ✅ number
console.log("User ID:", userId);

userId = "abc123";    // ✅ string
console.log("User ID:", userId);

// A function that accepts a union type
function displayId(id: string | number) {
  console.log("ID:", id);
}

displayId(456);
displayId("xyz789");




// array 
// Array of numbers
let scores: number[] = [85, 90, 75];
console.log("Scores:", scores);

// Array of strings
let names: string[] = ["Alice", "Bob", "Charlie"];
console.log("Names:", names);

// Array of booleans
let flags: boolean[] = [true, false, true];
console.log("Flags:", flags);




// tuple 

// ✅ 1. Basic Tuple Example
let user: [string, number] = ["Alice", 25];
console.log("User:", user);
console.log("Name:", user[0]);
console.log("Age:", user[1]);

// ❌ 2. Incorrect Tuple Usage (Uncomment to see error)
// let invalidUser: [string, number] = [25, "Alice"]; // Error: Type 'number' is not assignable to type 'string'

// ✅ 3. Tuple with More Elements
let employee: [number, string, boolean] = [1, "Bob", true];
console.log("Employee:", employee);

// ✅ 4. Tuple in a Function Return
function getProduct(): [string, number] {
  return ["Laptop", 999];
}

let product = getProduct();
console.log("Product Name:", product[0]);
console.log("Product Price:", product[1]);

// ✅ 5. Tuple with Optional Elements (using ?)
let partialData: [string, number?] = ["Optional"];
console.log("Partial Tuple:", partialData);

// ✅ 6. Using Tuples in an Array
let records: [string, number][] = [
  ["Alice", 25],
  ["Bob", 30],
  ["Charlie", 22]
];

for (let record of records) {
  console.log(`${record[0]} is ${record[1]} years old`);
}



// object 
// ✅ 1. Basic Object Example
let person: { name: string; age: number } = {
  name: "Alice",
  age: 25
};

console.log("Person:", person);

// 🎯 2. Accessing and Modifying Object Properties
console.log("Name:", person.name); // Alice
person.age = 26;
console.log("Updated Age:", person.age);

// 💡 3. Optional Properties
let employee: { name: string; department?: string } = {
  name: "Bob"
};

console.log("Employee:", employee);

// 🔄 4. Function That Uses an Object as a Parameter
function greet(user: { name: string }) {
  console.log(`Hello, ${user.name}`);
}

greet({ name: "Charlie" });

// 🧱 5. Object with Nested Objects
let product: {
  id: number;
  name: string;
  price: number;
  details: {
    description: string;
    stock: number;
  };
} = {
  id: 101,
  name: "Phone",
  price: 699,
  details: {
    description: "Smartphone with 128GB storage",
    stock: 50
  }
};

console.log("Product:", product);

// 📌 6. Object Type Alias (cleaner and reusable)
type User = {
  username: string;
  email: string;
  isAdmin: boolean;
};

let admin: User = {
  username: "admin123",
  email: "admin@example.com",
  isAdmin: true
};

console.log("Admin User:", admin);




// enum 

// 1. Numeric Enum (default)
enum Direction {
  North,   // 0
  East,    // 1
  South,   // 2
  West     // 3
}

let dir: Direction = Direction.South;
console.log("Direction:", dir);                 // Output: 2
console.log("Direction Name:", Direction[dir]); // Output: South

// 2. String Enum
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

let favoriteColor: Color = Color.Blue;
console.log("Favorite Color:", favoriteColor);  // Output: BLUE

// 3. Enum in a Function
enum Status {
  Success,
  Error,
  Loading
}

function printStatus(status: Status) {
  if (status === Status.Success) {
    console.log("Success ✅");
  } else if (status === Status.Error) {
    console.log("Error ❌");
  } else {
    console.log("Loading ⏳");
  }
}

printStatus(Status.Loading); // Output: Loading ⏳

// 4. Heterogeneous Enum (mixed types)
enum Mixed {
  No = 0,
  Yes = "YES"
}

console.log("Mixed Enum - No:", Mixed.No);       // Output: 0
console.log("Mixed Enum - Yes:", Mixed.Yes);     // Output: YES

// 5. Enum with Custom Starting Index
enum Level {
  Beginner = 1,
  Intermediate,
  Advanced
}

console.log("Advanced Level:", Level.Advanced);  // Output: 3




// Alias
// ✅ 1. Basic Type Alias
type Age = number;

let myAge: Age = 25;
console.log("Age:", myAge);

// ✅ 2. Object Type Alias
type Person = {
  name: string;
  age: number;
};

let user: Person = {
  name: "Alice",
  age: 30
};

console.log("User:", user);

// ✅ 3. Union Type Alias
type ID = string | number;

let userId: ID = "abc123";
console.log("User ID:", userId);

userId = 456;
console.log("Updated ID:", userId);

// ✅ 4. Array Type Alias
type StringArray = string[];

let fruits: StringArray = ["apple", "banana", "cherry"];
console.log("Fruits:", fruits);

// ✅ 5. Function Type Alias
type Greet = (name: string) => void;

const greetUser: Greet = (name) => {
  console.log(`Hello, ${name}!`);
};

greetUser("Bob");



// function return , void 

// ✅ 1. Function with return type: number
function add(a: number, b: number): number {
  return a + b;
}

let sum = add(10, 5);
console.log("Sum:", sum); // Output: 15

// ✅ 2. Function with return type: string
function greet(name: string): string {
  return `Hello, ${name}!`;
}

let message = greet("Alice");
console.log("Greeting:", message); // Output: Hello, Alice!

// ✅ 3. Function with return type: boolean
function isEven(num: number): boolean {
  return num % 2 === 0;
}

console.log("Is 4 even?", isEven(4)); // true
console.log("Is 7 even?", isEven(7)); // false

// ✅ 4. Function with return type: object
function getUser(): { name: string; age: number } {
  return {
    name: "Bob",
    age: 28
  };
}

console.log("User Object:", getUser());

// ✅ 5. Function with return type: array
function getNumbers(): number[] {
  return [1, 2, 3, 4, 5];
}

console.log("Numbers:", getNumbers());

// ✅ 6. Function with void (no return)
function logMessage(message: string): void {
  console.log("Log:", message);
}

logMessage("This is a log message.");

// ✅ 7. Void function without parameters
function showWelcome(): void {
  console.log("Welcome to TypeScript!");
}

showWelcome();




// never 

// ✅ 1. Function that always throws an error
function throwError(message: string): never {
  throw new Error(message);
}

// throwError("Something went wrong!"); // Uncomment to see the error

// ✅ 2. Function with an infinite loop (never returns)
function infiniteLoop(): never {
  while (true) {
    console.log("Looping forever...");
  }
  // return; // unreachable
}

// infiniteLoop(); // Uncomment to run infinite loop

// ✅ 3. Exhaustiveness check in switch-case
type Shape = "circle" | "square";

function getArea(shape: Shape): number {
  switch (shape) {
    case "circle":
      return 3.14 * 5 * 5; // example radius = 5
    case "square":
      return 5 * 5; // example side = 5
    default:
      // TypeScript ensures `shape` is `never` here if all cases are handled
      const _exhaustiveCheck: never = shape;
      throw new Error(`Unhandled shape: ${_exhaustiveCheck}`);
  }
}

console.log("Circle Area:", getArea("circle"));
console.log("Square Area:", getArea("square"));




// null and undefined 

// ✅ 1. Variable with undefined (default)
let x: undefined = undefined;
console.log("x:", x); // Output: undefined

// ✅ 2. Variable with null
let y: null = null;
console.log("y:", y); // Output: null

// ✅ 3. Union with undefined
let name: string | undefined;
console.log("Name (before assignment):", name); // Output: undefined
name = "Alice";
console.log("Name (after assignment):", name); // Output: Alice

// ✅ 4. Union with null
let age: number | null = null;
console.log("Age:", age); // Output: null
age = 25;
console.log("Updated Age:", age); // Output: 25

// ✅ 5. Function that returns undefined (void)
function log(message: string): void {
  console.log("Log:", message);
  // implicitly returns undefined
}
log("This is a log");

// ✅ 6. Function that may return a number or undefined
function findNumber(id: number): number | undefined {
  if (id === 1) {
    return 100;
  }
  return undefined;
}

console.log("Found:", findNumber(1)); // 100
console.log("Not Found:", findNumber(2)); // undefined

// ✅ 7. Optional parameter (implies undefined)
function greet(name?: string) {
  if (name) {
    console.log("Hello, " + name);
  } else {
    console.log("Hello, guest");
  }
}

greet("Bob");     // Hello, Bob
greet();          // Hello, guest




// cast type 

function showInputValue(): void {
  // Type casting using 'as'
  const input = document.getElementById("myInput") as HTMLInputElement;

  // Now TypeScript knows 'input' has a .value property
  alert("Input value is: " + input.value);
}



// unknown type

// ✅ 1. Assigning values to unknown
let value: unknown;

value = 123;
value = "Hello";
value = true;
value = { name: "Alice" };

// ✅ 2. Can't use value directly without type checking
// console.log(value.toUpperCase()); ❌ Error: Object is of type 'unknown'

// ✅ 3. Type checking before use
if (typeof value === "string") {
  console.log("Uppercase:", value.toUpperCase());
} else {
  console.log("Not a string, value is:", value);
}

// ✅ 4. Using type assertion
value = "TypeScript";
const strLength = (value as string).length;
console.log("Length of string:", strLength); // Output: 10

// ✅ 5. Function accepting unknown
function handleData(input: unknown) {
  if (typeof input === "number") {
    console.log("Number squared:", input * input);
  } else if (typeof input === "string") {
    console.log("String reversed:", input.split("").reverse().join(""));
  } else {
    console.log("Unknown type:", input);
  }
}

handleData(5);               // Output: 25
handleData("hello");         // Output: olleh
handleData([1, 2, 3]);       // Output: Unknown type: [1, 2, 3]



// nullish coalescing

// ✅ 1. Basic example
let username: string | null = null;
let defaultName = "Guest";

let finalName = username ?? defaultName;
console.log("Username:", finalName); // Output: Guest

// ✅ 2. Works with undefined
let age: number | undefined = undefined;
let defaultAge = 18;

let finalAge = age ?? defaultAge;
console.log("Age:", finalAge); // Output: 18

// ✅ 3. 0 is NOT nullish — it stays
let count: number = 0;
let defaultCount = 10;

let result = count ?? defaultCount;
console.log("Count:", result); // Output: 0

// ✅ 4. Falsy values like "" or false are preserved
let isActive: boolean = false;
let defaultActive = true;

let finalActive = isActive ?? defaultActive;
console.log("Is Active:", finalActive); // Output: false

// ✅ 5. Comparison with || (OR operator)
let title: string = "";
console.log("Using || :", title || "Untitled");   // "Untitled" ("" is falsy)
console.log("Using ?? :", title ?? "Untitled");   // "" (not null/undefined)


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////