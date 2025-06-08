///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

// 01 - 🔍 DOM Selection Methods , manupulation , get set

// ===========================================
// 📌 DOM Selection Methods with Examples
// ===========================================

// HTML structure assumed for examples:
/*
<div id="myId" class="box">Box 1</div>
<div class="box">Box 2</div>
<p>Paragraph 1</p>
<p>Paragraph 2</p>
<form id="form1"></form>
<img src="image.jpg" alt="sample">
<a href="https://example.com">Link</a>
*/

// 🔹 1. By ID
const elById = document.getElementById("myId");
console.log("getElementById:", elById);

// 🔹 2. By Class Name (returns live HTMLCollection)
const elsByClass = document.getElementsByClassName("box");
console.log("getElementsByClassName:", elsByClass);

// 🔹 3. By Tag Name (returns live HTMLCollection)
const elsByTag = document.getElementsByTagName("p");
console.log("getElementsByTagName:", elsByTag);

// 🔹 4. querySelector (returns first match)
const firstBox = document.querySelector(".box");
console.log("querySelector (first .box):", firstBox);

// 🔹 5. querySelectorAll (returns static NodeList of all matches)
const allBoxes = document.querySelectorAll(".box");
console.log("querySelectorAll (.box):", allBoxes);

// 🔹 6. document.forms
const form = document.forms[0];
console.log("document.forms[0]:", form);

// 🔹 7. document.images
const images = document.images;
console.log("document.images:", images);

// 🔹 8. document.links
const links = document.links;
console.log("document.links:", links);

// 🧠 Best Practice:
// Use querySelector/querySelectorAll for complex and modern CSS selectors.
// Use getElementById if you're sure the element has a unique ID and performance matters.

// ===========================================
// 📌 DOM Manipulation Use Cases
// ===========================================

// 1. Change text content
elById.textContent = "Updated text using textContent";

// 2. Change inner HTML
elById.innerHTML = "<strong>Bold HTML Content</strong>";

// 3. Change inline style
elById.style.color = "red";
elById.style.backgroundColor = "lightgray";

// 4. Add/Remove/Toggle classes
elById.classList.add("active");
elById.classList.remove("box");
elById.classList.toggle("highlight");
console.log("Has 'active' class:", elById.classList.contains("active"));

// 5. Set, Get, Remove Attributes
elById.setAttribute("title", "Hello tooltip!");
console.log("Title attribute:", elById.getAttribute("title"));
elById.removeAttribute("title");

// 6. Create and Append Elements
const newElement = document.createElement("div");
newElement.textContent = "I'm a new div!";
document.body.appendChild(newElement);

// 7. Remove Element
// elById.remove(); // Uncomment to test removal

// 8. Add Event Listener
elById.addEventListener("click", () => {
  alert("Element clicked!");
  elById.classList.toggle("clicked");
});



=================================
CSS CLASS MANIPULATION (Examples)
=================================

<!-- HTML Structure -->
<div id="myBox" class="box">Box Element</div>
<button id="addBtn">Add Class</button>
<button id="removeBtn">Remove Class</button>
<button id="toggleBtn">Toggle Class</button>
<button id="checkBtn">Check Class</button>

<!-- CSS -->
<style>
  .box {
    padding: 20px;
    background-color: lightgray;
    margin-bottom: 10px;
  }
  .highlight {
    background-color: yellow;
    border: 2px solid orange;
  }
</style>

<!-- JavaScript -->
<script>
  const box = document.getElementById("myBox");

  // Add class
  document.getElementById("addBtn").addEventListener("click", () => {
    box.classList.add("highlight");
  });

  // Remove class
  document.getElementById("removeBtn").addEventListener("click", () => {
    box.classList.remove("highlight");
  });

  // Toggle class
  document.getElementById("toggleBtn").addEventListener("click", () => {
    box.classList.toggle("highlight");
  });

  // Check if class exists
  document.getElementById("checkBtn").addEventListener("click", () => {
    alert(box.classList.contains("highlight") ? "Class is present" : "Class is NOT present");
  });
</script>
-->





TEXT MANIPULATION EXAMPLES (Using DOM)
======================================

<!-- HTML Structure -->
<div id="textBox">Hello, this is a sample text.</div>
<input type="text" id="inputText" placeholder="Enter new text" />
<button id="changeTextBtn">Change Text</button>
<button id="appendTextBtn">Append Text</button>
<button id="clearTextBtn">Clear Text</button>
<button id="uppercaseBtn">Uppercase</button>
<button id="lowercaseBtn">Lowercase</button>
<button id="resetTextBtn">Reset Text</button>

<!-- JavaScript -->
<script>
  const textBox = document.getElementById("textBox");
  const inputText = document.getElementById("inputText");
  const originalText = textBox.textContent;

  document.getElementById("changeTextBtn").addEventListener("click", () => {
    textBox.textContent = inputText.value;
  });

  document.getElementById("appendTextBtn").addEventListener("click", () => {
    textBox.textContent += " " + inputText.value;
  });

  document.getElementById("clearTextBtn").addEventListener("click", () => {
    textBox.textContent = "";
  });

  document.getElementById("uppercaseBtn").addEventListener("click", () => {
    textBox.textContent = textBox.textContent.toUpperCase();
  });

  document.getElementById("lowercaseBtn").addEventListener("click", () => {
    textBox.textContent = textBox.textContent.toLowerCase();
  });

  document.getElementById("resetTextBtn").addEventListener("click", () => {
    textBox.textContent = originalText;
  });
</script>
-->


///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

// 02 - Dom event 

// <!--
// DOM EVENTS NOTES (Cheat Sheet)
// ==============================

// 1. Mouse Events:
//    - click
//    - dblclick
//    - mousedown
//    - mouseup
//    - mousemove
//    - mouseover
//    - mouseout
//    - mouseenter
//    - mouseleave
//    - contextmenu (right-click)

// 2. Keyboard Events:
//    - keydown
//    - keyup
//    - keypress (deprecated, use keydown/keyup)

// 3. Form Events:
//    - submit
//    - change
//    - input
//    - reset
//    - invalid

// 4. Focus Events:
//    - focus
//    - blur
//    - focusin
//    - focusout

// 5. Clipboard Events:
//    - copy
//    - cut
//    - paste

// 6. Drag and Drop Events:
//    - drag
//    - dragstart
//    - dragend
//    - dragenter
//    - dragleave
//    - dragover
//    - drop

// 7. Window Events:
//    - load
//    - unload
//    - beforeunload
//    - resize
//    - scroll
//    - error

// 8. Touch Events (for mobile):
//    - touchstart
//    - touchmove
//    - touchend
//    - touchcancel

// 9. Media Events:
//    - play
//    - pause
//    - ended
//    - timeupdate
//    - volumechange
//    - loadeddata

// 10. Animation & Transition Events:
//    - animationstart
//    - animationend
//    - animationiteration
//    - transitionstart
//    - transitionend

// 11. Misc Events:
//    - select
//    - wheel
//    - pointerdown
//    - pointerup
//    - pointermove
//    - pointerenter
//    - pointerleave
// -->




    // Mouse Event: click
    document.getElementById("clickBtn").addEventListener("click", () => {
      alert("Button was clicked!");
    });



    // Form Event: submit
    document.getElementById("sampleForm").addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent page reload
      alert("Form submitted!");
    });

    // Focus Events
    const focusBox = document.getElementById("focusBox");
    focusBox.addEventListener("focus", () => {
      focusBox.style.backgroundColor = "lightyellow";
    });
    focusBox.addEventListener("blur", () => {
      focusBox.style.backgroundColor = "white";
    });

    // Clipboard Events
    const clipboardArea = document.getElementById("clipboardArea");
    clipboardArea.addEventListener("copy", () => console.log("Text copied!"));
    clipboardArea.addEventListener("paste", () => console.log("Text pasted!"));

    // Drag and Drop Events
    const dragItem = document.getElementById("dragItem");
    const dropZone = document.getElementById("dropZone");

    dragItem.addEventListener("dragstart", () => console.log("Drag started"));
    dropZone.addEventListener("dragover", (e) => e.preventDefault());
    dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropZone.textContent = "Item dropped!";
    });


// key event 
    const keydownSpan = document.getElementById("keydownKey");
    const keyupSpan = document.getElementById("keyupKey");
    const input = document.getElementById("inputField");

    input.addEventListener("keydown", (event) => {
      keydownSpan.textContent = `${event.key} (code: ${event.code})`;
    });

    input.addEventListener("keyup", (event) => {
      keyupSpan.textContent = `${event.key} (code: ${event.code})`;


///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

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
element.remove(); // Removes the selected element

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
    block: "start",
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
