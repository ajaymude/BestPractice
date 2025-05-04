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
  user1.login("123456");           // ✅ john_doe logged in successfully
  user1.updatePassword("abcdef");  // ✅ updates password internally
  user1.login("abcdef");           // ✅ login successful
  
  // ❌ Accessing private method directly — not allowed
  // user1.#setPassword("newpass"); // SyntaxError: Private field '#setPassword' must be declared in an enclosing class
  











// search about it inbuilt classes in the js

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
