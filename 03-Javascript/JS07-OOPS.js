


// 📌 Object-Oriented Programming (OOP) in JavaScript


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






















