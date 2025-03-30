



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






