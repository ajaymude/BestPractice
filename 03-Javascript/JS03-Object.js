



// Object

// Creating an Object

// let person = {
//     name: "Ajay",
//     age: 25,
//     isDeveloper: true
//   };
//   console.log(person.name); // "Ajay"
  

  let person = new Object();
  person.name = "Ajay";
  person.age = 25;
  console.log(person); // { name: "Ajay", age: 25 }

//   Using a Constructor Function
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  let user = new Person("Ajay", 25);
  console.log(user); // { name: "Ajay", age: 25 }


// Accessing Object Properties

console.log(person.name);  // "Ajay"
console.log(person["age"]); // 25

person.isDeveloper = true;
console.log(person); // { name: "Ajay", age: 25, isDeveloper: true }
person.name2 = 'max';


let obj = { "full name": "Ajay Kumar" };
console.log(obj["full name"]); // "Ajay Kumar"



//  Adding & Updating Properties
person.city = "Mumbai"; // Adding a new property
person.age = 26; // Updating an existing property
console.log(person);

// Deleting Properties
delete person.city;
console.log(person);


// Checking If a Property Exists
console.log("age" in person); // true
console.log(person.hasOwnProperty("age")); // true


// Looping Through an Object
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
  }

  
// Object.keys(), Object.values(), Object.entries()
console.log(Object.keys(person)); // ["name", "age", "isDeveloper"]
console.log(Object.values(person)); // ["Ajay", 25, true]
console.log(Object.entries(person)); // [["name", "Ajay"], ["age", 25], ["isDeveloper", true]]



// Copying Objects
// let copy = { ...person };
// console.log(copy);


// let copy = Object.assign({}, person);
// console.log(copy);





// JSON Conversion

// Convert Object to JSON:
let jsonString = JSON.stringify(person);
console.log(jsonString); // '{"name":"Ajay","age":25}'


//Convert JSON to Object:
let jsonObject = JSON.parse(jsonString);
console.log(jsonObject);




// Basic Object Destructuring

// const user = {
//     name: "Ajay",
//     age: 25,
//     role: "Developer"
// };

// const { name, age, role } = user;

// console.log(name); // "Ajay"
// console.log(age);  // 25
// console.log(role); // "Developer"



//  Changing Variable Names
// const user = {
//     firstName: "Ajay",
//     job: "Developer"
// };

// const { firstName: name, job: profession } = user;

// console.log(name);       // "Ajay"
// console.log(profession); // "Developer"





// Nested Object Destructuring
// const user = {
//     name: "Ajay",
//     address: {
//         city: "Mumbai",
//         country: "India"
//     }
// };

// const { name, address: { city, country } } = user;

// console.log(name);    // "Ajay"
// console.log(city);    // "Mumbai"
// console.log(country); // "India"




// Using the Rest Operator (...)
// const user = {
//     name: "Ajay",
//     age: 25,
//     role: "Developer",
//     company: "Tech Corp"
// };

// const { name, age, ...rest } = user;

// console.log(name);  // "Ajay"
// console.log(age);   // 25
// console.log(rest);  // { role: "Developer", company: "Tech Corp" }




// Looping Objects: Object Keys, Values, and Entries 🚀
// const user = {
//     name: "Ajay",
//     age: 25,
//     city: "Mumbai"
// };

// //  Looping over keys
// for (const key of Object.keys(user)) {
//     console.log(key);
// }

// name
// age
// city






// Object.values(obj) – Looping Over Values

// const user = {
//     name: "Ajay",
//     age: 25,
//     city: "Mumbai"
// };

// // Looping over values
// for (const value of Object.values(user)) {
//     console.log(value);
// }

// Ajay
// 25
// Mumbai







// Object.entries(obj) – Looping Over Key-Value Pairs
// const user = {
//     name: "Ajay",
//     age: 25,
//     city: "Mumbai"
// };

// // Looping over key-value pairs
// for (const [key, value] of Object.entries(user)) {
//     console.log(`${key}: ${value}`);
// }


// name: Ajay
// age: 25
// city: Mumbai
