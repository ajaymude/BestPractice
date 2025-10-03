// 🔌 BOM & DOM MANIPULATION
// 70 - Window Object: global scope, alert, prompt, confirm
// 71 - Document Object Model (DOM) tree, nodes vs elements
// 72 - Selecting Elements: getElementById, getElementsByTagName, querySelector, querySelectorAll
// 73 - Modifying Elements: textContent, innerHTML, innerText
// 74 - Changing Element Attributes and Styles: setAttribute, classList, style property
// 75 - Creating, Appending, Removing Nodes: createElement, appendChild, removeChild, replaceChild
// 76 - Traversing the DOM: parentNode, childNodes, nextSibling, previousSibling
// 77 - Event Handling: addEventListener, event object, event propagation (bubbling, capturing), stopPropagation, preventDefault
// 78 - Delegated Event Handling and performance
// 79 - Manipulating Forms: input elements, form elements, form submission, form validation
// 80 - Window events: load, DOMContentLoaded, resize, scroll
// 81 - Timers: setTimeout, setInterval, clearTimeout, clearInterval
// 82 - Location, History, Navigator objects


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


/*
70 - Window Object: global scope, alert, prompt, confirm

This note explains:
1. The window object as the global scope in browsers.
2. Using alert() to display messages.
3. Using prompt() to get input from the user.
4. Using confirm() to get boolean confirmation.
5. Best practices and considerations.
*/

// 1. The window object as global scope
// In browsers, global variables and functions are properties of window.
var globalVar = 'I am global';
function globalFunc() {
  console.log('Invoked globalFunc');
}
console.log('window.globalVar:', window.globalVar);
console.log('window.globalFunc === globalFunc:', window.globalFunc === globalFunc);

// 2. alert(): display an informational message
alert('Hello! This is an alert message.');

// 3. prompt(): ask the user for input (returns string or null)
const name = prompt('What is your name?', 'Guest');
console.log('User entered name:', name);

// 4. confirm(): ask a yes/no question (returns boolean)
const proceed = confirm('Do you want to continue?');
console.log('User chose to continue:', proceed);

// 5. Using other window properties
console.log('Window location href:', window.location.href);
console.log('Window innerWidth x innerHeight:', window.innerWidth, 'x', window.innerHeight);

/*
Best Practices:
- Avoid excessive use of alert/confirm/prompt as they block UI.
- For nicer UI, prefer custom modal dialogs in your application.
- Always handle null return from prompt (user pressed “Cancel”).
- Use console methods for debugging rather than alert where possible.
*/

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

/*
71 - Document Object Model (DOM) Tree, Nodes vs Elements

This note explains:
1. What the DOM is and its tree structure.
2. Differences between Node, Element, Text, and other node types.
3. Traversing the DOM: parent, children, and siblings.
4. Selecting nodes vs elements: getElementById, querySelector, childNodes vs children.
5. Creating, adding, and removing elements.
6. Best-practice tips.
*/

// 1. Accessing the root of the DOM
console.log(document.documentElement); // <html> element
console.log(document.childNodes);      // NodeList: [<!DOCTYPE>, html]

// 2. Node vs Element
console.log('document.nodeType:', document.nodeType);                  // 9 (DOCUMENT_NODE)
console.log('document.documentElement.nodeType:', document.documentElement.nodeType); // 1 (ELEMENT_NODE)

const textNode = document.createTextNode('Sample');
console.log('textNode.nodeType:', textNode.nodeType); // 3 (TEXT_NODE)
console.log('textNode.nodeName:', textNode.nodeName); // "#text"

// 3. Traversing the DOM
const body = document.body;
console.log('body.childNodes:', body.childNodes);         // includes text nodes and element nodes
console.log('body.children:', body.children);             // only element nodes
console.log('firstChild of body:', body.firstChild);      // could be a text node
console.log('firstElementChild of body:', body.firstElementChild); // guaranteed element

// Sibling traversal
const firstElem = body.firstElementChild;
console.log('nextElementSibling:', firstElem.nextElementSibling);
console.log('previousElementSibling:', firstElem.previousElementSibling);

// 4. Selecting nodes and elements
const header = document.getElementById('header');         // Element or null
const specialItems = document.querySelectorAll('.item'); // NodeList of Elements
const mainSection = document.querySelector('main');       // first matching Element

// 5. Creating and adding elements
const newDiv = document.createElement('div');             
newDiv.id = 'dynamic';
newDiv.textContent = 'Hello, DOM!';
document.body.appendChild(newDiv);                        // adds to end of body

// 6. Removing elements
const toRemove = document.getElementById('old');
if (toRemove) {
  toRemove.parentNode.removeChild(toRemove);
}

// 7. Best Practices
/*
- Use element-specific properties (children, firstElementChild) to skip text nodes.
- Always null-check results of getElementById or querySelector.
- Prefer querySelector/querySelectorAll for flexible selectors.
- Minimize direct DOM manipulation: batch updates or use DocumentFragment for many nodes.
*/

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

/*
72 - Selecting Elements: getElementById, getElementsByTagName, querySelector, querySelectorAll

This note explains:
1. document.getElementById(id) — returns a single Element or null.
2. document.getElementsByTagName(tagName) — returns a live HTMLCollection.
3. document.querySelector(selector) — returns the first matching Element or null.
4. document.querySelectorAll(selector) — returns a static NodeList of matching Elements.
*/

// For demonstration, create some sample HTML in the document body:
document.body.innerHTML = `
  <div id="main">
    <h1 class="title">Welcome</h1>
    <p class="text">Hello</p>
    <p class="text">World</p>
    <span data-info="123">Info</span>
  </div>
`;

// 1. getElementById
const mainDiv = document.getElementById('main');
console.log('getElementById("main"):', mainDiv);

// 2. getElementsByTagName
const paragraphs = document.getElementsByTagName('p');
console.log('getElementsByTagName("p"):', paragraphs);           // HTMLCollection
console.log('First <p> element:', paragraphs[0].textContent);   // "Hello"

// 3. querySelector (first match)
const firstText = document.querySelector('.text');
console.log('querySelector(".text"):', firstText.textContent);   // "Hello"

// You can combine selectors:
const titleInMain = document.querySelector('#main .title');
console.log('querySelector("#main .title"):', titleInMain.textContent); // "Welcome"

// 4. querySelectorAll (all matches)
const allText = document.querySelectorAll('.text');
console.log('querySelectorAll(".text"):', allText);             // NodeList
allText.forEach((el, i) => console.log(`.text[${i}]:`, el.textContent));

// 5. Differences
// - getElementsByTagName returns a live HTMLCollection (reflects DOM changes)
// - querySelectorAll returns a static NodeList (does not update automatically)

// Example: add a new <p> and observe collections
const newP = document.createElement('p');
newP.className = 'text';
newP.textContent = 'New';
document.getElementById('main').appendChild(newP);

console.log('After append:');
console.log('HTMLCollection length:', paragraphs.length);      // now 3 (live)
console.log('NodeList length:', allText.length);              // still 2 (static)

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

/*
73 - Modifying Elements: textContent, innerHTML, innerText

This note explains:
1. textContent – sets or returns the text content of a node and its descendants.
2. innerText – similar to textContent but takes styles into account and triggers reflow.
3. innerHTML – sets or returns the HTML markup within an element.
4. Differences and use-case considerations.
*/

// Create sample container
const container = document.createElement('div');
container.id = 'demo';
document.body.appendChild(container);

// 1. textContent: sets plain text (HTML tags rendered as text)
container.textContent = '<strong>Hello</strong> & welcome';
console.log('textContent:', container.textContent);
// Displays literally: <strong>Hello</strong> & welcome

// Overwrite with new content
container.textContent = 'Line1\nLine2';
console.log('textContent multi-line:', container.textContent);
// Newlines preserved in textContent

// 2. innerText: takes CSS into account, returns “rendered” text
container.innerText = '<em>Hi</em> and <em>there</em>';
console.log('innerText:', container.innerText);
// Displays literally, but innerText normalizes whitespace and may trim

// 3. innerHTML: parses string as HTML markup
container.innerHTML = '<strong>Hello</strong> & welcome';
console.log('innerHTML:', container.innerHTML);
// Renders bold “Hello” and text “& welcome”

// Append nested elements via innerHTML
container.innerHTML += '<p class="note">Note: Use innerHTML with care.</p>';

// 4. Differences summary
/*
- textContent: fastest, no parsing, safe for inserting untrusted text.
- innerText: performance slower (layout-dependent), respects CSS (hidden elements skipped).
- innerHTML: parses HTML, can introduce XSS if used with untrusted content.
*/

// 5. Best Practices
/*
- Use textContent to set or get text only.
- Use innerText when you need only visible text (CSS-aware).
- Use innerHTML for inserting HTML templates, but sanitize input first.
*/


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

/*
74 - Changing Element Attributes and Styles: setAttribute, classList, style property

This note explains:
1. Using setAttribute, getAttribute, removeAttribute to manage attributes.
2. Manipulating classes via classList: add, remove, toggle, contains, replace.
3. Using the style property to set inline CSS.
4. Best-practice considerations.
*/

// Create a demo element
const elem = document.createElement('div');
elem.id = 'demo';
document.body.appendChild(elem);

// 1. Attribute Methods
elem.setAttribute('data-info', '123');
console.log(elem.getAttribute('data-info')); // "123"

elem.setAttribute('title', 'Demo Element');
console.log(elem.title);                     // "Demo Element"

elem.removeAttribute('data-info');
console.log(elem.hasAttribute('data-info')); // false

// 2. classList Manipulation
elem.classList.add('hidden', 'active');
console.log(elem.className);                 // "hidden active"

console.log('contains active?', elem.classList.contains('active')); // true

elem.classList.remove('hidden');
console.log('after remove hidden:', elem.className);                // "active"

elem.classList.toggle('active');             // removes 'active'
console.log('after toggle active:', elem.className);               // ""

elem.classList.toggle('active');             // adds 'active'
console.log('after toggle active again:', elem.className);         // "active"

elem.classList.replace('active', 'enabled');
console.log('after replace active->enabled:', elem.className);     // "enabled"

// 3. style Property for Inline CSS
elem.style.backgroundColor = 'lightblue';
elem.style.border = '1px solid red';
elem.style.padding = '10px';
console.log('inline styles:', elem.style.cssText);
// Example output: "background-color: lightblue; border: 1px solid red; padding: 10px;"

// 4. Best Practices
/*
- Use setAttribute/getAttribute for non-standard or data-* attributes.
- Prefer classList methods over manually modifying className strings.
- Inline styles via style property override CSS rules but keep CSS in stylesheets when possible.
- Avoid excessive inline styling to maintain separation of concerns.
*/

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


/*
75 - Creating, Appending, Removing Nodes: createElement, appendChild, removeChild, replaceChild

This note explains:
1. document.createElement() – create a new Element.
2. parent.appendChild() – add a node at the end of parent’s children.
3. parent.removeChild(child) – remove a specific child node.
4. parent.replaceChild(newChild, oldChild) – replace one child with another.
*/

// For demonstration, clear body and set up a container
document.body.innerHTML = '<div id="container"><p id="first">First paragraph</p></div>';
const container = document.getElementById('container');
console.log('Initial container.innerHTML:', container.innerHTML);

// 1. createElement(): make a new node
const newPara = document.createElement('p');
newPara.id = 'second';
newPara.textContent = 'Second paragraph (created via createElement)';

// 2. appendChild(): add the new node
container.appendChild(newPara);
console.log('After appendChild:', container.innerHTML);

// 3. removeChild(): remove an existing child
const firstPara = document.getElementById('first');
container.removeChild(firstPara);
console.log('After removeChild(first):', container.innerHTML);

// 4. replaceChild(): replace the newPara with another node
const replacement = document.createElement('p');
replacement.id = 'replacement';
replacement.textContent = 'Replacement paragraph';
container.replaceChild(replacement, newPara);
console.log('After replaceChild:', container.innerHTML);

/*
Resulting DOM structure in #container:
  <p id="replacement">Replacement paragraph</p>
*/

// 5. Best Practices
/*
- Always check that parent and child exist (non-null) before calling removeChild/replaceChild.
- Use append() or prepend() for modern insertions, but appendChild remains widely supported.
- To insert at specific positions, use insertBefore(newNode, referenceNode).
- Cleanup any event listeners on removed nodes to avoid memory leaks.
*/

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


/*
76 - Traversing the DOM: parentNode, childNodes, nextSibling, previousSibling

This note explains:
1. parentNode         – moves up to the parent of a node.
2. childNodes         – returns all child nodes (including text nodes).
3. nextSibling        – moves to the next sibling node.
4. previousSibling    – moves to the previous sibling node.
5. Best-practice tips for skipping non-element nodes.
*/

// Set up sample HTML for traversal
document.body.innerHTML = `
  <ul id="list">
    <li id="item1">Item 1</li>
    <li id="item2">Item 2</li>
    <li id="item3">Item 3</li>
  </ul>
`;

// Reference a node
const item2 = document.getElementById('item2');
console.log('Current node:', item2.textContent); // "Item 2"

// 1. parentNode: get the parent of item2
const list = item2.parentNode;
console.log('parentNode id:', list.id); // "list"

// 2. childNodes: includes text and element nodes
console.log('list.childNodes:', list.childNodes);
// NodeList [
//   #text("\n    "),
//   <li id="item1">,
//   #text("\n    "),
//   <li id="item2">,
//   #text("\n    "),
//   <li id="item3">,
//   #text("\n  ")
// ]

// To get only elements, use children
console.log('list.children:', list.children); // HTMLCollection [<li#item1>, <li#item2>, <li#item3>]

// 3. nextSibling: moves to next node (could be text)
const next = item2.nextSibling;
console.log('item2.nextSibling.nodeType:', next.nodeType, 'value:', next.nodeValue.trim());
// nodeType 3 (#text) → value ""

// To skip to next element node:
let nextElem = item2.nextSibling;
while (nextElem && nextElem.nodeType !== 1) {
  nextElem = nextElem.nextSibling;
}
console.log('Next element sibling:', nextElem.id); // "item3"

// 4. previousSibling: moves to previous node
const prev = item2.previousSibling;
console.log('item2.previousSibling.nodeType:', prev.nodeType, 'value:', prev.nodeValue.trim());
// nodeType 3 (#text) → value ""

// Skip to previous element node:
let prevElem = item2.previousSibling;
while (prevElem && prevElem.nodeType !== 1) {
  prevElem = prevElem.previousSibling;
}
console.log('Previous element sibling:', prevElem.id); // "item1"

/*
Best Practices:
- Use parentElement, nextElementSibling, previousElementSibling
  when you only care about elements (skips text/comment nodes).
- childNodes vs children: children returns only element nodes.
- Always null-check siblings before accessing properties.
*/


// Alternative using element-specific properties:

console.log('parentElement:', item2.parentElement.id);                   // "list"
console.log('nextElementSibling:', item2.nextElementSibling.id);         // "item3"
console.log('previousElementSibling:', item2.previousElementSibling.id); // "item1"

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

/*
77 - Event Handling: addEventListener, event object, event propagation (bubbling, capturing), stopPropagation, preventDefault

This note demonstrates:
1. addEventListener — attaching handlers to elements.
2. event object — properties like type, target, currentTarget, eventPhase.
3. Propagation phases:
   • Capturing (from window down to target)
   • Target
   • Bubbling (from target up to window)
4. stopPropagation() — stop further propagation in current phase.
5. preventDefault() — prevent default browser actions (e.g., link navigation).
*/

// Setup demonstration elements
const container = document.createElement('div');
container.id = 'container';
container.style.border = '2px dashed gray';
container.style.padding = '10px';

const parent = document.createElement('div');
parent.id = 'parent';
parent.textContent = 'Parent DIV';
parent.style.border = '2px solid blue';
parent.style.padding = '10px';

const child = document.createElement('button');
child.id = 'child';
child.textContent = 'Child BUTTON (click me)';
child.style.padding = '10px';

parent.appendChild(child);
container.appendChild(parent);
document.body.appendChild(container);

// 1. addEventListener and event object
parent.addEventListener('click', event => {
  console.log(
    `Parent handler: type=${event.type}, target=${event.target.id}, currentTarget=${event.currentTarget.id}, phase=${event.eventPhase}`
  );
});

// 2. Bubbling phase (default)
child.addEventListener('click', event => {
  console.log(`Child handler (bubbling): target=${event.target.id}, phase=${event.eventPhase}`);
});

// 3. Capturing phase
container.addEventListener(
  'click',
  event => {
    console.log(`Container handler (capturing): target=${event.target.id}, phase=${event.eventPhase}`);
  },
  { capture: true }
);

// 4. stopPropagation in child to prevent parent handlers in bubbling
child.addEventListener('click', event => {
  event.stopPropagation();
  console.log('stopPropagation() called in child — no further bubbling');
});

// 5. preventDefault example with a link
const link = document.createElement('a');
link.href = 'https://example.com';
link.textContent = 'Go to example.com';
link.style.display = 'block';
link.style.marginTop = '20px';
document.body.appendChild(link);

link.addEventListener('click', event => {
  event.preventDefault();
  console.log('preventDefault() called — navigation prevented');
});

/*
How to test:
1. Click the Child BUTTON:
   - Container (capturing) logs first (phase 1).
   - Child (bubbling) logs, then calls stopPropagation().
   - Parent handler does NOT run due to stopPropagation().
2. Click the Parent DIV (outside the button):
   - Container (capturing) logs.
   - Parent handler logs in bubbling phase (phase 3).
3. Click the link:
   - Console logs prevention message.
   - Browser does NOT navigate away.
*/

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

/*
78 - Delegated Event Handling and Performance

This note explains:
1. What event delegation is.
2. Performance benefits: fewer listeners, automatic handling of dynamic children.
3. How to implement delegation: attach a listener to a common ancestor and use event.target.
4. Example: clicking list items via a single parent listener.
5. Adding and removing items dynamically.
6. When delegation is not suitable.
*/

// Setup a container with list items
const listContainer = document.createElement('ul');
listContainer.id = 'itemList';
document.body.appendChild(listContainer);

// Populate with some initial items
for (let i = 1; i <= 5; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  li.dataset.index = i;
  listContainer.appendChild(li);
}

// 1. Attach one listener to the parent UL (delegation)
listContainer.addEventListener('click', event => {
  // 2. Use event.target to identify which <li> was clicked
  const clicked = event.target;
  if (clicked.tagName === 'LI') {
    console.log(`Clicked ${clicked.textContent} (index ${clicked.dataset.index})`);
    // e.g., highlight the clicked item
    clicked.style.backgroundColor = 'lightyellow';
  }
});

// 3. Dynamically add new items after delegation is set up
const addButton = document.createElement('button');
addButton.textContent = 'Add Item';
document.body.appendChild(addButton);

let nextIndex = 6;
addButton.addEventListener('click', () => {
  const newLi = document.createElement('li');
  newLi.textContent = `Item ${nextIndex}`;
  newLi.dataset.index = nextIndex++;
  listContainer.appendChild(newLi);
  // No need to add a new listener for this <li>!
});

// 4. Performance Benefits
// - Only one event listener on the container vs. one per item.
// - Reduced memory and faster setup time, especially for many items.
// - New items are handled automatically without additional code.

// 5. Removing Delegation
const removeButton = document.createElement('button');
removeButton.textContent = 'Disable Click Handler';
document.body.appendChild(removeButton);

function handleItemClick(event) {
  const clicked = event.target;
  if (clicked.tagName === 'LI') {
    console.log(`(delegated) Clicked ${clicked.textContent}`);
  }
}
// Re-register with named function
listContainer.removeEventListener('click', handleItemClick); // no effect yet
listContainer.addEventListener('click', handleItemClick);

removeButton.addEventListener('click', () => {
  listContainer.removeEventListener('click', handleItemClick);
  console.log('Delegated click handler removed');
});

// 6. When Not to Use Delegation
// - If you need fine-grained control on the child element’s own capturing phase.
// - If the container is not present at listen time (need to attach after creation).
// - If child elements overlap and you need precise coordinates (use individual listeners).

/*
Best Practices:
- Delegate from the closest common ancestor to limit unnecessary event traffic.
- Use event.target.matches(selector) or closest(selector) for robust matching.
- Clean up listeners when container is removed to avoid memory leaks.
- Combine delegation with event.stopPropagation() judiciously when nested handlers exist.
*/

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

/*
79 - Manipulating Forms: input elements, form elements, form submission, form validation

This note explains:
1. Selecting form and input elements.
2. Listening for form submission and preventing default.
3. Accessing input values.
4. Basic HTML5 validation (required, type, min/max) and custom validation.
5. Using the Constraint Validation API: setCustomValidity, checkValidity, reportValidity.
6. Resetting and disabling forms.
7. Best practices.
*/

// Setup: create a sample form
document.body.innerHTML = `
  <form id="userForm">
    <label>Name: <input type="text" id="nameInput" name="username" required></label><br>
    <label>Email: <input type="email" id="emailInput" name="email" required></label><br>
    <label>Age: <input type="number" id="ageInput" name="age" min="1" max="120"></label><br>
    <button type="submit">Submit</button>
    <button type="button" id="resetBtn">Reset</button>
  </form>
  <div id="output"></div>
`;

const form = document.getElementById('userForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const ageInput = document.getElementById('ageInput');
const output = document.getElementById('output');
const resetBtn = document.getElementById('resetBtn');

// 1. Handle form submission
form.addEventListener('submit', event => {
  event.preventDefault(); // Prevent page reload

  // 2. Access input values
  const name = nameInput.value.trim();
  const email = emailInput.value;
  const age = ageInput.value;

  // 3. Custom validation example
  if (!name) {
    nameInput.setCustomValidity('Name cannot be empty');
  } else {
    nameInput.setCustomValidity('');
  }

  // 4. Use Constraint Validation API
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // 5. Process valid form
  output.textContent = `Submitted: Name=${name}, Email=${email}, Age=${age}`;
});

// 6. Real-time validation for email
emailInput.addEventListener('input', () => {
  if (emailInput.validity.valueMissing) {
    emailInput.setCustomValidity('Email is required');
  } else if (emailInput.validity.typeMismatch) {
    emailInput.setCustomValidity('Please enter a valid email address');
  } else {
    emailInput.setCustomValidity('');
  }
});

// 7. Reset form
resetBtn.addEventListener('click', () => {
  form.reset();
  output.textContent = '';
});

// 8. Example of disabling the submit button
// form.querySelector('button[type="submit"]').disabled = true;

/*
Best Practices:
- Use HTML5 attributes (required, type, min, max) for basic validation.
- Use setCustomValidity() for custom error messages.
- Call checkValidity() and reportValidity() to trigger validation UI.
- Prevent default submission to handle via JavaScript.
- Reset or disable forms as needed for improved UX.
*/

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

/*
80 - Window Events: load, DOMContentLoaded, resize, scroll

This note explains:
1. load              – fires when the entire page (images, styles, subframes) has loaded.
2. DOMContentLoaded  – fires when the HTML document has been completely parsed (no CSS/images).
3. resize            – fires when the viewport is resized.
4. scroll            – fires when the document view is scrolled.
*/

// 1. DOMContentLoaded: run code as soon as DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded: DOM parsed and ready');
  // Safe to query and manipulate elements here
  const header = document.querySelector('h1');
  if (header) header.style.color = 'green';
});

// 2. load: run code after all resources (images, CSS, iframes) finish loading
window.addEventListener('load', () => {
  console.log('load: Page fully loaded including all resources');
  // Example: hide a preloader element
  const preloader = document.getElementById('preloader');
  if (preloader) preloader.style.display = 'none';
});

// 3. resize: handle viewport size changes (throttle for performance)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    console.log('resize: New dimensions', window.innerWidth, 'x', window.innerHeight);
  }, 200); // runs 200ms after user stops resizing
});

// 4. scroll: detect scroll position (throttle/debounce for performance)
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (Math.abs(current - lastScroll) > 50) { // threshold of 50px
    console.log('scroll: Scrolled to', current);
    lastScroll = current;
  }
});

/*
Best Practices:
- Use DOMContentLoaded for initializing UI and event handlers.
- Use load for actions that depend on images or external resources.
- Throttle or debounce resize and scroll handlers to avoid performance issues.
- Always remove unnecessary listeners when no longer needed to prevent memory leaks.
*/

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


/*
81 - Timers: setTimeout, setInterval, clearTimeout, clearInterval

This note explains:
1. setTimeout(callback, delay, ...args) — schedule a one-time callback after delay (ms).
2. clearTimeout(timeoutID) — cancel a pending timeout.
3. setInterval(callback, interval, ...args) — schedule a repeating callback every interval (ms).
4. clearInterval(intervalID) — cancel a repeating interval.
5. Best practices: passing parameters, cleanup, and avoiding drift.
*/

// 1. setTimeout: run once after delay
const timeoutID = setTimeout(() => {
  console.log('setTimeout: ran after 1000ms');
}, 1000);

// Passing arguments to the callback
function greet(name) {
  console.log(`Hello, ${name}! (after 1500ms)`);
}
setTimeout(greet, 1500, 'Ajay');

// 2. clearTimeout: cancel before it fires
const willCancel = setTimeout(() => {
  console.log('This will NOT run');
}, 2000);
clearTimeout(willCancel);

// 3. setInterval: run repeatedly every interval
let count = 0;
const intervalID = setInterval(() => {
  count++;
  console.log(`setInterval: count = ${count}`);
  if (count >= 3) {
    clearInterval(intervalID); // stop after 3 runs
    console.log('setInterval: cleared');
  }
}, 500);

// 4. clearInterval: cancel repeating timer
// (demonstrated above inside the interval callback)

// 5. Avoiding drift in intervals (self-adjusting)
function startAccurateInterval(fn, interval) {
  let expected = Date.now() + interval;
  let timeout;
  const step = () => {
    const drift = Date.now() - expected;
    fn();
    expected += interval;
    timeout = setTimeout(step, Math.max(0, interval - drift));
  };
  timeout = setTimeout(step, interval);
  return () => clearTimeout(timeout);
}

const stopAccurate = startAccurateInterval(() => {
  console.log('Accurate interval tick at', new Date().toLocaleTimeString());
}, 1000);

// Stop the accurate interval after 5 ticks
setTimeout(() => {
  stopAccurate();
  console.log('Accurate interval stopped');
}, 5500);

/*
Best Practices:
- Always clear timeouts/intervals you no longer need to avoid memory leaks.
- Pass parameters directly to setTimeout/setInterval to avoid closures.
- For heavy work, prefer requestAnimationFrame over setInterval for UI.
- Use self-adjusting intervals to compensate for drift in long-running intervals.
*/

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


/*
82 - Location, History, Navigator Objects

This note explains:
1. window.location – reading and manipulating the URL.
2. window.history – navigating session history and managing state.
3. window.navigator – accessing browser and device information.
*/

// 1. window.location
console.log('location.href:', window.location.href);            // full URL
console.log('location.protocol:', window.location.protocol);    // "http:" or "https:"
console.log('location.host:', window.location.host);            // hostname:port
console.log('location.pathname:', window.location.pathname);    // path after domain
console.log('location.search:', window.location.search);        // query string
console.log('location.hash:', window.location.hash);            // anchor part

// Changing the URL:
// window.location.href = 'https://example.com';               // navigate to new URL
// location.assign('https://example.com');                     // same as setting href
// location.replace('https://example.com');                    // navigate without adding to history
// location.reload();                                          // reload current page

// 2. window.history
console.log('history.length:', window.history.length);         // number of history entries

// Navigate back and forward:
// history.back();                                              // equivalent to browser back
// history.forward();                                           // equivalent to browser forward
// history.go(-1);                                              // go back one entry
// history.go(2);                                               // go forward two entries

// Managing history state:
window.history.pushState({ page: 1 }, 'Title 1', '?page=1');
// Adds a new entry with state {page:1}, title, and new URL without reload
window.history.replaceState({ page: 2 }, 'Title 2', '?page=2');
// Replaces current entry’s state and URL

window.addEventListener('popstate', event => {
  console.log('popstate fired, state:', event.state);
  // handle back/forward navigation here
});

// 3. window.navigator
console.log('navigator.userAgent:', navigator.userAgent);      // browser user agent string
console.log('navigator.platform:', navigator.platform);        // OS platform
console.log('navigator.language:', navigator.language);        // browser language
console.log('navigator.onLine:', navigator.onLine);            // true if online

// Geolocation (requires user permission)
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => console.log('Position:', pos.coords.latitude, pos.coords.longitude),
    err => console.error('Geolocation error:', err.message)
  );
}

// Clipboard API (modern browsers, requires user gesture)
if (navigator.clipboard) {
  navigator.clipboard.readText()
    .then(text => console.log('Clipboard text:', text))
    .catch(err => console.error('Clipboard read failed:', err));
}

/*
Best Practices:
- Use location.assign/replace carefully to avoid unwanted history entries.
- Listen to popstate to handle SPA navigation.
- Check navigator.geolocation and navigator.clipboard availability before use.
- Avoid exposing sensitive state in pushState without proper encoding.
*/

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