
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
// 01 -  Numbers
// ============================
// 📌 1. Number Properties
// ============================
console.log(Number.MAX_VALUE);        // Largest number in JS
console.log(Number.MIN_VALUE);        // Smallest number in JS
console.log(Number.POSITIVE_INFINITY);// Infinity
console.log(Number.NEGATIVE_INFINITY);// -Infinity
console.log(Number.NaN);              // NaN (Not a Number)

// ============================
// 📌 2. Number Conversion Methods
// ============================
console.log(Number("42"));            // 42 (String to Number)
console.log(Number("42.5"));          // 42.5
console.log(Number("Hello"));         // NaN
console.log(parseInt("100px"));       // 100 (Extract integer)
console.log(parseFloat("3.14abc"));   // 3.14 (Extract float)
console.log((+"50.5") + 5);           // 55.5 (Unary + converts to number)

// ============================
// 📌 3. Checking Number Type
// ============================
console.log(Number.isInteger(10));    // true
console.log(Number.isInteger(10.5));  // false
console.log(Number.isNaN(NaN));       // true
console.log(Number.isFinite(100));    // true
console.log(Number.isFinite(Infinity)); // false

// ============================
// 📌 4. Rounding Methods
// ============================
console.log(Math.round(4.7));         // 5 (Nearest integer)
console.log(Math.round(4.3));         // 4
console.log(Math.floor(4.9));         // 4 (Round down)
console.log(Math.ceil(4.1));          // 5 (Round up)
console.log(Math.trunc(4.9));         // 4 (Removes decimal part)
console.log((5.6789).toFixed(2));     // "5.68" (Fixed decimal places)
console.log((123.456).toPrecision(4));// "123.5" (Total digits)

let num = 123456;
console.log(num.toExponential());      // "1.23456e+5"
console.log(num.toExponential(2));     // "1.23e+5"
console.log(num.toExponential(4));     // "1.2346e+5"


let number = 1234567.89;
console.log(number.toLocaleString());           // e.g., "1,234,567.89" (default locale)
console.log(number.toLocaleString('en-US'));    // "1,234,567.89"
console.log(number.toLocaleString('de-DE'));    // "1.234.567,89"
console.log(number.toLocaleString('hi-IN'));    // "12,34,567.89"

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////


let price = 123456.789;
console.log(price.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD'
})); // "$123,456.79"
console.log(price.toLocaleString('hi-IN', {
  style: 'currency',
  currency: 'INR'
})); // "₹1,23,456.79"


let date = new Date();
console.log(date.toLocaleString()); // Based on your system locale
console.log(date.toLocaleString('en-GB')); // e.g., "06/05/2025, 11:30:00"
console.log(date.toLocaleString('hi-IN')); // e.g., "6/5/2025, 11:30:00 am"




// ============================
// 📌 5. Random Number Methods
// ============================
console.log(Math.random());           // Random number between 0 and 1
console.log(Math.random() * 10);      // Random between 0 and 10
console.log(Math.floor(Math.random() * 100)); // Random 0-99

// ============================
// 📌 6. Exponential and Logarithm Methods
// ============================
console.log(Math.pow(2, 3));          // 8 (2^3)
console.log(2 ** 3);                  // 8 (Alternative to Math.pow)
console.log(Math.sqrt(16));           // 4 (Square root)
console.log(Math.cbrt(27));           // 3 (Cube root)
console.log(Math.exp(1));             // 2.718 (Euler's number)
console.log(Math.log(10));            // Natural log of 10
console.log(Math.log2(8));            // Log base 2 (Result: 3)
console.log(Math.log10(1000));        // Log base 10 (Result: 3)

// ============================
// 📌 7. Absolute and Sign Methods
// ============================
console.log(Math.abs(-50));           // 50 (Absolute value)
console.log(Math.sign(-10));          // -1 (Negative)
console.log(Math.sign(0));            // 0 (Zero)
console.log(Math.sign(10));           // 1 (Positive)

// ============================
// 📌 8. Trigonometric Methods
// ============================
console.log(Math.sin(Math.PI / 2));   // 1 (Sine of 90 degrees)
console.log(Math.cos(0));             // 1 (Cosine of 0 degrees)
console.log(Math.tan(Math.PI / 4));   // 1 (Tangent of 45 degrees)
console.log(Math.asin(1));            // π/2 (Arcsin)
console.log(Math.acos(0));            // π/2 (Arccos)
console.log(Math.atan(1));            // π/4 (Arctan)
console.log(Math.atan2(1, 1));        // π/4 (Arctan2)

// ============================
// 📌 9. Min and Max Methods
// ============================
console.log(Math.max(5, 10, 15));     // 15 (Largest number)
console.log(Math.min(5, 10, 15));     // 5 (Smallest number)

// ============================
// 📌 10. Converting Number to String
// ============================
let num = 123.45;
console.log(num.toString());          // "123.45" (Convert to string)
console.log(num.toExponential(2));    // "1.23e+2" (Exponential notation)

// ============================
// 📌 11. Bitwise Operators (Advanced)
// ============================
console.log(5 & 1);                   // 1 (Bitwise AND)
console.log(5 | 1);                   // 5 (Bitwise OR)
console.log(5 ^ 1);                   // 4 (Bitwise XOR)
console.log(~5);                      // -6 (Bitwise NOT)
console.log(5 << 1);                  // 10 (Left shift)
console.log(5 >> 1);                  // 2 (Right shift)

// ============================
// 📌 12. Other Useful Methods
// ============================
console.log(Math.hypot(3, 4));        // 5 (Hypotenuse)
console.log(Math.fround(1.337));      // 1.3370000123977661 (Floating-point precision)
console.log(Math.imul(2, 3));         // 6 (Efficient multiplication)
console.log(Math.clz32(1));           // 31 (Leading zero count in 32-bit integer)
console.log(Math.trunc(-5.9));        // -5 (Remove decimal part)
console.log((123.456).valueOf());     // 123.456 (Primitive value of Number)

// ============================
// 📌 13. Converting Between Number Bases
// ============================
console.log((255).toString(2));       // "11111111" (Decimal to Binary)
console.log((255).toString(16));      // "ff" (Decimal to Hexadecimal)
console.log(parseInt("ff", 16));      // 255 (Hexadecimal to Decimal)
console.log(parseInt("1010", 2));     // 10 (Binary to Decimal)

// ============================
// 📌 14. Safe Integer Checks
// ============================
console.log(Number.isSafeInteger(9007199254740991)); // true (Largest safe int)
console.log(Number.isSafeInteger(9007199254740992)); // false (Unsafe int)














// 02 - Dates 
// 1. Creating a Date Object
let now = new Date();
console.log(now);

let specificDate = new Date(2025, 2, 30, 15, 45, 30, 500);
console.log(specificDate);

let dateFromString = new Date("March 30, 2025 15:45:30");
console.log(dateFromString);

let dateFromTimestamp = new Date(1711757130000);
console.log(dateFromTimestamp);

console.log(Date.now());

// 2. Getting Date Components
let date = new Date();
console.log(date.getFullYear(), date.getMonth(), date.getDate(), date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds(), date.getTime(), date.getTimezoneOffset());

// 3. Setting Date Components
let d = new Date();
d.setFullYear(2030);
d.setMonth(5);
d.setDate(20);
d.setHours(12);
d.setMinutes(30);
d.setSeconds(45);
d.setMilliseconds(200);
d.setTime(1800000000000);
console.log(d);

// 4. Formatting a Date
let dt = new Date();
console.log(dt.toString(), dt.toDateString(), dt.toTimeString(), dt.toUTCString(), dt.toISOString(), dt.toLocaleString(), dt.toLocaleDateString(), dt.toLocaleTimeString());

// 5. Date Comparisons
let d1 = new Date(2025, 2, 30);
let d2 = new Date(2025, 5, 15);
console.log(d1 > d2, d1 < d2, d1.getTime() === d2.getTime());

// 6. Date Calculations
let today = new Date();
let futureDate = new Date();
futureDate.setDate(today.getDate() + 7);
console.log(futureDate);

let pastDate = new Date();
pastDate.setDate(today.getDate() - 7);
console.log(pastDate);

let startDate = new Date("2025-03-30");
let endDate = new Date("2025-04-05");
let diff = endDate - startDate;
console.log(diff / (1000 * 60 * 60 * 24));








//  Internationalizing Dates (Intl)

// // Creating a date
// const now = new Date();

// // Formatting the date using different locales
// const locales = ['en-US', 'en-GB', 'de-DE', 'fr-FR', 'hi-IN', 'ja-JP', 'ar-EG'];

// // Various formatting options
// const options = {
//   weekday: 'long',
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
//   hour: '2-digit',
//   minute: '2-digit',
//   second: '2-digit',
//   timeZoneName: 'short'
// };

// console.log("Original Date:", now);

// locales.forEach(locale => {
//   const formattedDate = new Intl.DateTimeFormat(locale, options).format(now);
//   console.log(`${locale}: ${formattedDate}`);
// });

// // Using a specific timezone
// const timeZoneOptions = { ...options, timeZone: 'America/New_York' };
// const formattedNY = new Intl.DateTimeFormat('en-US', timeZoneOptions).format(now);
// console.log("New York Time:", formattedNY);

// // Short and numeric formats
// const shortFormat = new Intl.DateTimeFormat('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }).format(now);
// console.log("Short Format (MM/DD/YY):", shortFormat);

// const numericFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(now);
// console.log("Numeric Format (M/D/YYYY):", numericFormat);

// // Customizing different elements
// const onlyMonthYear = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(now);
// console.log("Month and Year Only:", onlyMonthYear);

// const onlyTime = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(now);
// console.log("Time Only:", onlyTime);












// Internationalizing Numbers (Intl)
const number = 1234567.89;

// Default formatting
console.log(new Intl.NumberFormat().format(number)); // Based on browser locale

// US Formatting
console.log(new Intl.NumberFormat('en-US').format(number)); // "1,234,567.89"

// German Formatting
console.log(new Intl.NumberFormat('de-DE').format(number)); // "1.234.567,89"

// Indian Formatting
console.log(new Intl.NumberFormat('en-IN').format(number)); // "12,34,567.89"

// Currency Formatting
console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)); // "$1,234,567.89"
console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number)); // "1.234.567,89 €"
console.log(new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number)); // "￥1,234,568"

// Percentage Formatting
console.log(new Intl.NumberFormat('en-US', { style: 'percent' }).format(0.75)); // "75%"

// Unit Formatting
console.log(new Intl.NumberFormat('en-US', { style: 'unit', unit: 'kilometer' }).format(1234)); // "1,234 km"
console.log(new Intl.NumberFormat('en-GB', { style: 'unit', unit: 'liter' }).format(10)); // "10 l"

// Customizing Significant Digits
console.log(new Intl.NumberFormat('en-US', { minimumSignificantDigits: 3, maximumSignificantDigits: 5 }).format(number)); // "1,234,600"

// Customizing Decimal Places
console.log(new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 3 }).format(number)); // "1,234,567.890"


// Number formatting
const number = 1234567.89;
const usNumber = new Intl.NumberFormat('en-US').format(number);
const indiaNumber = new Intl.NumberFormat('hi-IN').format(number);
console.log("US Format:", usNumber);       // "1,234,567.89"
console.log("India Format:", indiaNumber); // "12,34,567.89"

// Currency formatting
const price = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR'
}).format(123456.78);
console.log("Price (INR):", price); // "₹1,23,456.78"

// Date formatting
const now = new Date();
const usDate = new Intl.DateTimeFormat('en-US').format(now);
const deDate = new Intl.DateTimeFormat('de-DE').format(now);
console.log("US Date:", usDate);  // "5/6/2025"
console.log("DE Date:", deDate);  // "06.05.2025"

// Relative time formatting
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
console.log(rtf.format(-1, 'day')); // "yesterday"
console.log(rtf.format(3, 'month')); // "in 3 months"

// List formatting
const fruits = ['Apple', 'Banana', 'Mango'];
const list = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(fruits);
console.log("Fruit List:", list); // "Apple, Banana, and Mango"

// Plural rules
const plural = new Intl.PluralRules('en-US');
console.log("1 ->", plural.select(1)); // "one"
console.log("5 ->", plural.select(5)); // "other"
















// Timers: setTimeout and setInterval

console.log("Start...");

// Execute after 3 seconds
const timeoutId = setTimeout(() => {
    console.log("This message appears after 3 seconds");
}, 3000);

console.log("End..."); // This will appear before the timeout function executes

// Clearing the timeout
setTimeout(() => {
    clearTimeout(timeoutId);
    console.log("Timeout cleared before execution");
}, 2000);




let count = 0;

// Run every 2 seconds
const intervalId = setInterval(() => {
    count++;
    console.log(`Interval execution #${count}`);

    // Stop the interval after 5 executions
    if (count === 5) {
        clearInterval(intervalId);
        console.log("Interval stopped after 5 executions");
    }
}, 2000);



// clearTimeout(timeoutID);
// console.log("Start...");

// // Schedule a timeout to execute after 5 seconds
// const timeoutId = setTimeout(() => {
//     console.log("This message will not appear because the timeout is cleared.");
// }, 5000);

// // Clear the timeout before it executes
// clearTimeout(timeoutId);

// console.log("Timeout cleared, function will not execute.");
