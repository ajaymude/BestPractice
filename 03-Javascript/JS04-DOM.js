

// Introduction to the DOM (Document Object Model)

// selecting element 
// traversing 
// get properties 
// create and append 






// 1. Selecting Elements in the DOM


// Single Element Selectors
// document.getElementById("id") – Selects an element by its id.
// document.querySelector("selector") – Selects the first matching element.


// Multiple Element Selectors
// document.getElementsByClassName("class") – Selects all elements with a class name.
// document.getElementsByTagName("tag") – Selects all elements with a tag name.
// document.querySelectorAll("selector") – Selects all matching elements.







// 2. Modifying Elements


// Changing Content
// element.textContent = "New Text" – Changes text inside an element.
// element.innerHTML = "<b>Bold Text</b>" – Changes the inner HTML.


// Changing Styles
// element.style.color = "red" – Changes the color.
// element.style.backgroundColor = "yellow" – Changes the background.


// Changing Attributes
// element.setAttribute("class", "new-class") – Sets a new class.
// element.getAttribute("href") – Gets an attribute value.







// 3. Adding & Removing Elements

// Creating Elements
const newDiv = document.createElement("div");
newDiv.textContent = "Hello, I'm a new div!";
document.body.appendChild(newDiv);


// Removing Elements
const element = document.getElementById("myElement");
element.remove();  // Removes the selected element









// 4. Event Handling in the DOM

// Common Event Listeners
// click – Fires when an element is clicked.
// mouseover – Fires when hovering over an element.
// keyup – Fires when a key is released


const btn = document.getElementById("myButton");
btn.addEventListener("click", () => {
    alert("Button clicked!");
});






// Selecting Elements
// Select an element by ID
const title = document.getElementById("main-title");
console.log(title.textContent);

// Select elements by class name
const items = document.getElementsByClassName("list-item");
console.log(items[0].textContent); // Access first item

// Select elements by tag name
const paragraphs = document.getElementsByTagName("p");
console.log(paragraphs[0].textContent);

// Select an element using querySelector (first match)
const firstItem = document.querySelector(".list-item");
console.log(firstItem.textContent);

// Select all elements matching a query
const allItems = document.querySelectorAll(".list-item");
allItems.forEach((item) => console.log(item.textContent));






// Creating and Appending Elements
// Create a new paragraph element
const newParagraph = document.createElement("p");

// Add text content
newParagraph.textContent = "This is a new paragraph added dynamically.";

// Append to the body
document.body.appendChild(newParagraph);

// Create a new list item and add it to an existing list
const newItem = document.createElement("li");
newItem.textContent = "New Item";
newItem.classList.add("list-item");

// Append to an existing list
document.querySelector("ul").appendChild(newItem);








// Deleting and Removing Elements
// Remove an element directly
const paragraphToRemove = document.querySelector("p");
paragraphToRemove.remove();

// Remove a child element from its parent
const list = document.querySelector("ul");
const firstItemToRemove = list.querySelector("li");
list.removeChild(firstItemToRemove);








// 🎨 Styles, Attributes, and Classes in JavaScript

// 1. Manipulating Styles
// Select an element
const heading = document.querySelector("h1");

// Change styles dynamically
heading.style.color = "blue";
heading.style.fontSize = "24px";
heading.style.backgroundColor = "yellow";
heading.style.padding = "10px";
heading.style.textAlign = "center";




// Getting and Setting Attributes
// Select an element
const link = document.querySelector("a");

// Get an attribute value
console.log(link.getAttribute("href")); // Output: URL

// Set an attribute value
link.setAttribute("href", "https://google.com");

// Add a new attribute
link.setAttribute("target", "_blank");

// Remove an attribute
link.removeAttribute("target");








// Manipulating Classes
// Select an element
const box = document.querySelector(".box");

// Add a class
box.classList.add("highlight");

// Remove a class
box.classList.remove("highlight");

// Toggle a class (adds if not present, removes if present)
box.classList.toggle("active");

// Check if a class exists
console.log(box.classList.contains("active")); // true or false












// 🚀 Implementing Smooth Scrolling in JavaScript
document.querySelector("#scrollBtn").addEventListener("click", function () {
    document.querySelector("#targetSection").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});






////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Event in js 

// ✅ Mouse Events

// onclick — triggered when the button is clicked
// ondblclick — double-click
// onmousedown — when the mouse button is pressed down
// onmouseup — when the mouse button is released
// onmouseenter — when the pointer enters the button (does not bubble)
// onmouseleave — when the pointer leaves the button (does not bubble)
// onmousemove — when the pointer is moving within the button
// onmouseover — when the pointer is over the button
// onmouseout — when the pointer leaves the button area
// oncontextmenu — right-click context menu

// ✅ Keyboard Events

// onkeydown — when a key is pressed down (button must be focused)
// onkeypress — (deprecated) when a key is pressed (not recommended)
// onkeyup — when a key is released




// ✅ Focus Events

// onfocus — when the button gains focus
// onblur — when the button loses focus
// onfocusin — similar to onfocus, but bubbles
// onfocusout — similar to onblur, but bubbles





// ✅ Form Events (if inside a <form>)

// onsubmit — when the form is submitted (if the button is type="submit")
// onreset — when the form is reset (if the button is type="reset")





// ✅ Clipboard Events
// oncopy
// oncut
// onpaste




// ✅ Drag Events (less common with buttons)
// ondrag
// ondragstart
// ondragend
// ondragenter
// ondragleave
// ondragover
// ondrop





// ✅ Touch Events (on mobile devices)
// ontouchstart
// ontouchend
// ontouchmove
// ontouchcancel




// JavaScript Event Bubbling is a concept that describes how events propagate (move)
//  through the DOM when an event occurs on an element. It is one of the phases of event propagation: 
//  capturing, target, and bubbling. Event bubbling specifically refers to the phase
//   where the event "bubbles up" from the target element to its ancestors.

// e.stopPropagation

// Event delegation: Attaching a single event listener to a parent to handle events on its children.



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////






// event 

// Mouse Events
// click
// dblclick
// mousedown
// mouseup
// mouseover
// mouseout
// mousemove
// mouseenter
// mouseleave
// contextmenu (right-click)

// 🎹 Keyboard Events
// keydown
// keyup
// keypress (deprecated)

// 📋 Clipboard Events
// copy
// cut
// paste

// 📝 Form Events
// submit
// reset
// focus
// blur
// change
// input
// select

// 📦 Drag & Drop Events
// drag
// dragstart
// dragend
// dragover
// dragenter
// dragleave
// drop

// 🌍 Window & Document Events
// load
// DOMContentLoaded
// resize
// scroll

// unload

// beforeunload
// error

// 🎤 Media Events
// play
// pause
// ended
// volumechange
// seeking
// seeked
// timeupdate

// 📡 Network Events
// online
// offline


// 💡 Miscellaneous Events
// touchstart
// touchmove
// touchend
// animationstart
// animationend
// transitionstart
// transitionend
// pointerdown
// pointerup
// pointermove
// wheel
























// Event Propagation: Bubbling and Capturing in JavaScript

// Event propagation in JavaScript refers to how events travel through the DOM tree. It consists of three phases:
// Capturing Phase (Event Capturing) → Event travels from the root to the target.
// Target Phase → The event reaches the target element.
// Bubbling Phase (Event Bubbling) → Event bubbles up from the target back to the root.

// Selecting elements
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");

// Bubbling: By default, events bubble up from child to parent
parent.addEventListener("click", function () {
  console.log("Parent clicked (Bubbling)");
});

child.addEventListener("click", function () {
  console.log("Child clicked (Bubbling)");
});

// Capturing: Use { capture: true } to capture the event during capturing phase
parent.addEventListener(
  "click",
  function () {
    console.log("Parent clicked (Capturing)");
  },
  { capture: true }
);

child.addEventListener(
  "click",
  function () {
    console.log("Child clicked (Capturing)");
  },
  { capture: true }
);


// Event Bubbling → The event starts from the child and moves up to the parent.
// Event Capturing → The event starts from the parent and moves down to the child.
// { capture: true } → Forces the event to be handled in the capturing phase instead of bubbling.



//  Stopping Event Propagation
child.addEventListener("click", function (event) {
    event.stopPropagation(); // Stops event from bubbling up
    console.log("Child clicked, but no bubbling!");
  });

  









//  DOM Traversing 



// 1️⃣ Traversing Upwards

// const child = document.querySelector(".child");
// // Get the parent element
// console.log(child.parentElement);
// // Find the closest ancestor with class "container"
// console.log(child.closest(".container"));



// 2️⃣ Traversing Downwards (Child Elements)
// const parent = document.querySelector(".parent");

// // Get all child elements
// console.log(parent.children);

// // Get the first and last child
// console.log(parent.firstElementChild);
// console.log(parent.lastElementChild);




// 3️⃣ Traversing Sideways (Siblings)
// const current = document.querySelector(".current");

// // Get previous and next siblings
// console.log(current.previousElementSibling);
// console.log(current.nextElementSibling);




















// Lifecycle DOM Events


// 1️⃣ DOMContentLoaded Event
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM is fully loaded and parsed");
  });

  



// 2️⃣ Load Event
window.addEventListener("load", () => {
    console.log("✅ Page is fully loaded, including images and styles");
  });

  


// 3️⃣ BeforeUnload Event
window.addEventListener("beforeunload", (event) => {
    event.preventDefault();
    event.returnValue = ""; // Necessary for most browsers
  });

  

// 4️⃣ Unload Event

window.addEventListener("unload", () => {
    console.log("❌ Page is being closed or navigated away");
  });
  
  




















