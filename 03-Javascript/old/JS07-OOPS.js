// 📌 Object-Oriented Programming (OOP) in JavaScript

// how to create a object

let o1 = {};
let o2 = new Object();

// how to add the value in the object
o1.name = "name";
o1["name"] = "name";

// how to access the value from the object
const name = o1.name;
const n2 = o1["name"];
// if the property is not exist it will return the undefined

// a object can store the function

// Define an object representing a square
const square = {
  // Property: side length
  side: 5,

  // Method: calculate area using the side property
  area: function () {
    return this.side * this.side;
  },
};

// Accessing the area
let result = square.area();
console.log("The area of the square is:", result);

// You can also change the side dynamically
square.side = 8;
console.log("New area is:", square.area());

// a class have a constructor and method

// Define a Square class
class Square {
  // Constructor to initialize the side length, or the property i.e expected
  // you can add the validation in the constructor
  constructor(side) {
    this.side = side;
  }

  // Method to calculate area
  area() {
    return this.side * this.side;
  }
}

// Create an instance of the Square class
const mySquare = new Square(5);

// Get the area
console.log("Area:", mySquare.area()); // Output: Area: 25

// Change the side length
mySquare.side = 7;
console.log("New Area:", mySquare.area()); // Output: New Area: 49

// what is the instance in the class
// Parent class
class Square {
  constructor(side) {
    this.side = side;
  }

  area() {
    return this.side * this.side;
  }
}

// Child class
class ColoredSquare extends Square {
  constructor(side, color) {
    super(side); // Call the parent class constructor
    this.color = color;
  }

  // New method in the child class
  describe() {
    return `A ${this.color} square with area ${this.area()}`;
  }
}

// static property and static method

class Circle {
  static PI = 3.14159; // Static property

  constructor(radius) {
    this.radius = radius;
  }

  area() {
    return Circle.PI * this.radius * this.radius;
  }

  static describe() {
    return "This class creates circle objects and calculates area.";
  }
}

// how to use the static method
// Accessing static property
console.log(Circle.PI); // 3.14159

// Using static method
console.log(Circle.describe()); // This class creates circle objects and calculates area.

// Creating an instance
const c1 = new Circle(5);
console.log(c1.area()); // 78.53975

// Trying to access static property from instance (this will be undefined)
console.log(c1.PI); // undefined

// getter and the setter

class Person {
  constructor(name) {
    this._name = name; // Notice the underscore (_) — common for internal values
  }

  // Getter
  get name() {
    return this._name;
  }

  // Setter
  set name(newName) {
    if (newName.length > 0) {
      this._name = newName;
    } else {
      console.log("Name must not be empty.");
    }
  }
}

const p = new Person("Alice");

// Using the getter like a normal property
console.log(p.name); // Alice

// Using the setter like a normal assignment
p.name = "Bob";
console.log(p.name); // Bob

// Invalid assignment
p.name = ""; // Name must not be empty.
console.log(p.name); // Bob (unchanged)

// public field and private field

class Car {
  brand = "Toyota"; // public field
}

const myCar = new Car();
console.log(myCar.brand); // ✅ Accessible: "Toyota"
myCar.brand = "Honda";
console.log(myCar.brand); // "Honda"

class BankAccount {
  #balance = 0; // private field

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // ✅ 100
console.log(account.#balance); // ❌ SyntaxError: Private field '#balance' must be declared in an enclosing class

// private method and public method

class User {
  constructor(username, password) {
    this.username = username;
    this.#setPassword(password); // Call private method in constructor
  }

  // 🔒 Private method
  #setPassword(pwd) {
    if (pwd.length < 6) {
      console.log("Password too short!");
      this.password = null;
    } else {
      this.password = `encrypted(${pwd})`; // Simulated encryption
    }
  }

  // 🔓 Public method
  login(inputPassword) {
    if (this.password === `encrypted(${inputPassword})`) {
      console.log(`${this.username} logged in successfully.`);
    } else {
      console.log("Login failed.");
    }
  }

  // 🔓 Public method to update password
  updatePassword(newPassword) {
    this.#setPassword(newPassword); // Using private method
  }
}

const user1 = new User("john_doe", "123456");
user1.login("123456"); // ✅ john_doe logged in successfully
user1.updatePassword("abcdef"); // ✅ updates password internally
user1.login("abcdef"); // ✅ login successful

// ❌ Accessing private method directly — not allowed
// user1.#setPassword("newpass"); // SyntaxError: Private field '#setPassword' must be declared in an enclosing class

//   🔍 What Is this?
//   In JavaScript, this refers to the object that is currently executing the code.
//   Its exact value depends on how a function is called, not where it's defined.

// in a class
class Person {
  constructor(name) {
    this.name = name; // 'this' refers to the instance
  }

  greet() {
    console.log("Hello, " + this.name);
  }
}

const p = new Person("Alice");
p.greet(); // Hello, Alice

// in a regular function
function show() {
  console.log(this); // 'this' refers to the global object (window in browsers)
}

show();

// in a regular function but strict mode is on
("use strict");
function show() {
  console.log(this); // undefined
}
show();

// in a event handler
button.onclick = function () {
  console.log(this); // refers to the button element
};

// in the arrow function

const obj = {
  name: "Box",
  regular: function () {
    console.log(this.name); // 'this' is the object
  },
  arrow: () => {
    console.log(this.name); // 'this' is inherited from where the arrow function is defined (usually global or outer function)
  },
};

obj.regular(); // Box
obj.arrow(); // undefined

// js call apply bind

function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person1 = { name: "Alice" };
const person2 = { name: "Bob" };

introduce.call(person1, "Hello", "!"); // Hello, I'm Alice!
introduce.call(person2, "Hi", "."); // Hi, I'm Bob.

introduce.apply(person1, ["Hey", "?"]); // Hey, I'm Alice?
introduce.apply(person2, ["Yo", "!"]); // Yo, I'm Bob!

const aliceIntro = introduce.bind(person1, "Welcome", "!!!");
const bobIntro = introduce.bind(person2);

aliceIntro(); // Welcome, I'm Alice!!!
bobIntro("Howdy", "?"); // Howdy, I'm Bob?

// use of the new key word in the js

// JavaScript does four things behind the scenes:
// Creates a new empty object: {}
// Sets the new object's prototype to the constructor's prototype
// Binds this inside the constructor to the new object
// Returns the object (unless the constructor explicitly returns something else)
// search about it inbuilt classes in the js

// What Is the Prototype?
// Every JavaScript function has a prototype property.
// When you create an object using a constructor function or class, it gets linked to that function's prototype object.
// This is how methods and properties are shared across instances — without duplicating them.

// 🔁 Why Use Prototypes?
// To share methods between all instances without redefining them every time.
// To save memory by avoiding duplication.
// To enable inheritance and access to methods up the prototype chain.

function Person(name) {
  this.name = name;
}

// Shared method using prototype
Person.prototype.sayHello = function () {
  console.log(`Hello, I'm ${this.name}`);
};

const alice = new Person("Alice");
const bob = new Person("Bob");

alice.sayHello(); // Hello, I'm Alice
bob.sayHello(); // Hello, I'm Bob

//   🔍 What’s Happening Behind the Scenes?
// Each instance (alice, bob) has a hidden link to Person.prototype. When you call alice.sayHello(), JavaScript:
// Looks for sayHello on alice
// Doesn’t find it → looks in alice.__proto__ (which is Person.prototype)
// Finds it there and calls it

// ########## js promise start ##################################
// 🔍 What Is a Promise?
// A Promise is an object that represents the future result of an asynchronous operation.
// It can be in one of three states

// State	Meaning
// pending	The operation is still ongoing
// fulfilled	The operation completed successfully
// rejected	The operation failed

const myPromise = new Promise((resolve, reject) => {
  // Simulate async task
  setTimeout(() => {
    const success = true;

    if (success) {
      resolve("Data loaded");
    } else {
      reject("Error occurred");
    }
  }, 1000);
});

myPromise
  .then((result) => {
    console.log("Success:", result); // Runs if resolved
  })
  .catch((error) => {
    console.error("Failed:", error); // Runs if rejected
  })
  .finally(() => {
    console.log("Finished"); // Always runs
  });

// callback hell

// ✅ What Is async / await?
// async turns a function into one that returns a Promise.
// await pauses execution until a Promise resolves (or rejects).
// It makes asynchronous code look synchronous, improving readability.


// use the try catch for the error handling 

async function getUserData() {
  try {
    const userResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    const user = await userResponse.json();
    console.log("User:", user);

    const postsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
    );
    const posts = await postsResponse.json();
    console.log("Posts:", posts);

    const commentsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id}`
    );
    const comments = await commentsResponse.json();
    console.log("Comments on first post:", comments);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getUserData();


// Promise.all
// Promise.all — a powerful tool in JavaScript when you want to run
//  multiple asynchronous operations in parallel and wait for all of them to complete.

// 🔍 What Is Promise.all()?
// It takes an array of promises and returns a single promise.
// This returned promise:
// ✅ resolves when all promises resolve, giving you an array of results.
// ❌ rejects immediately if any promise fails (even one).

// ✅ Why Use Promise.all()?
// To run async tasks in parallel, not one after the other.
// Saves time when tasks don’t depend on each other.
// Useful for fetching multiple resources, loading files, etc.

const urls = [
    "https://jsonplaceholder.typicode.com/users/1",
    "https://jsonplaceholder.typicode.com/users/2",
    "https://jsonplaceholder.typicode.com/users/3"
  ];
  
  async function fetchUsers() {
    try {
      const responses = await Promise.all(urls.map(url => fetch(url)));
      const users = await Promise.all(responses.map(res => res.json()));
      console.log("All users:", users);
    } catch (error) {
      console.error("Failed to fetch one or more users:", error);
    }
  }
  
  fetchUsers();

  

//   🔍 What Is Promise.allSettled()?
//   It takes an array of promises.
//   It returns a promise that always resolves — once all input promises have settled (either fulfilled or rejected).
//   You get an array of objects, each with a status ("fulfilled" or "rejected") and value or reaso

const urls = [
    "https://jsonplaceholder.typicode.com/users/1",       // valid
    "https://jsonplaceholder.typicode.com/users/99999",   // valid but maybe empty
    "https://invalid-api-url.typicode.com/broken"         // invalid
  ];
  
  async function fetchDataAllSettled() {
    const promises = urls.map(url => fetch(url));
  
    const results = await Promise.allSettled(promises);
  
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`✅ Request ${index + 1} succeeded`);
      } else {
        console.error(`❌ Request ${index + 1} failed:`, result.reason);
      }
    });
  }
  
  fetchDataAllSettled();

  [
    { status: "fulfilled", value: Response },
    { status: "fulfilled", value: Response },
    { status: "rejected", reason: TypeError: Failed to fetch }
  ]

  

//   Promise.race() — 
//   a useful method when you want the first settled promise (either fulfilled or rejected), regardless of the others.


// 🏁 What is Promise.race()?
// Promise.race() takes an array of promises.
// It returns a new promise that settles (resolves or rejects) as soon as the first promise settles.
// It ignores the outcome of the other promises.


const p1 = new Promise((resolve) => setTimeout(() => resolve("P1 resolved"), 3000));
const p2 = new Promise((resolve) => setTimeout(() => resolve("P2 resolved"), 1000));

Promise.race([p1, p2])
  .then(result => {
    console.log("✅ First settled:", result);
  })
  .catch(error => {
    console.error("❌ First error:", error);
  });




// ########## js promise end  ##################################

//  1. Encapsulation (Data Hiding)

// Encapsulation restricts direct access to object data by using private properties/methods.

class Person {
  #age; // Private field

  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }

  getAge() {
    return this.#age;
  }
}

const person2 = new Person("Soham", 30);
console.log(person2.name); // ✅ Soham
console.log(person2.getAge()); // ✅ 30
console.log(person2.#age); // ❌ Error (private)

// 🔹 2. Abstraction (Hiding Implementation Details)

class BankAccount {
  #balance = 0; // Private field

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

// const account = new BankAccount("Ajay");
// account.deposit(1000);
// console.log(account.getBalance()); // ✅ 1000
// console.log(account.#balance); // ❌ Error (private)

//  3. Inheritance (Code Reusability)
class Animal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    console.log("Some generic sound");
  }
}

class Dog extends Animal {
  makeSound() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog("Buddy");
dog.makeSound(); // ✅ Woof! Woof!
console.log(dog.name); // ✅ Buddy

//  4. Polymorphism (Method Overriding)

class Shape {
  area() {
    return "Undefined area";
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

const circle = new Circle(5);
console.log(circle.area()); // ✅ 78.54

class Car {
  constructor(model, year) {
    this.model = model;
    this.year = year;
  }
}

const car2 = new Car("BMW", 2024);
console.log(car2.model); // ✅ BMW

//  Prototypes and Prototype Inheritance

// function Person(name) {
//     this.name = name;
// }

// Person.prototype.sayHello = function() {
//     console.log(`Hello, I'm ${this.name}`);
// };

// const p1 = new Person("Ajay");
// p1.sayHello(); // ✅ Hello, I'm Ajay
// console.log(p1.__proto__ === Person.prototype); // ✅ true
