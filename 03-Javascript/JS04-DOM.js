

// Introduction to the DOM (Document Object Model)



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
