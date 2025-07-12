// STUDY NOTES
// how to import export function 
// path , fs, os,  module 
// middleware, event, stream, buffer, process
// npm, package.json, package-lock.json, node_modules
// global error handling in the express js , use of the next 
// how to set the static folder in the express js
//  what is the middleware in the express js
//  how to use the middleware in the express js
// use mongoose pre method  and userSchema.methods 
// learn about the filter and pagination in the express js mongoose




// PROJECTS NOTES
// create the project structure
// create the package.json file
// install the dependencies
// create  a server file 
// create a app file 
// create a config file  where sotre the configuration of the project from the env 
// create a logger file 
// create a database connection file 




// create the routes directory
// create the controllers directory
// create the models directory
// create the middlewares directory
// handle the error global error handling , 
// protect the routes with the authentication and authorization , with the help of the middleware 
// 
// create the utils
// create the validation    
// create the seed file
// create the test file
// create the documentation
// handle the authentication
// handle the authorization
// handle the file upload
// handle the pagination
// // handle the sorting
// handle the filtering
// handle the search
// handle the caching
// handle the rate limiting
// handle the security
// handle the logging
// handle the monitoring
// handle the deployment
// handle the scaling
// handle the performance
// handle the error handling
// handle the testing
// handle the debugging 
// handle the code quality
// handle the code review
// handle the code coverage
// handle the code style
// handle the code documentation
// handle the code refactoring
// handle the code optimization
// handle the code organization
// handle the code architecture
// handle the code design
// handle the code structure
// handle the code patterns
// handle the code principles
// handle the code best practices
// handle the code anti-patterns
// handle the code conventions
// handle the code standards
// handle the token , access token, refresh token
// handle the JWT token
// handle the session
// handle the cookie
// handle the local storage
// handle the session storage
// handle the web storage
// handle the indexedDB
// handle the local database
// handle the remote database
// handle the database connection



///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
// how to import export function 
/* ─────────────────────────
COMMONJS  (math.cjs or math.js)
───────────────────────── */
// A. Export one function
function add(a, b) { return a + b; }
module.exports = add;             // default-like export

// B. Export multiple
function sub(a, b) { return a - b; }
exports.add = add;                // named export style
exports.sub = sub;

// ───────────────
// Consumer file
const add  = require('./math.cjs');        // default-style import
const { sub } = require('./math');         // named import (destructuring)
console.log(add(2, 3), sub(5, 1));         // 5 4



/* ─────────────────────────
ECMAScript Modules  (math.mjs or math.js with "type":"module")
───────────────────────── */
// A. Named exports
export function add(a, b)  { return a + b; }
export function sub(a, b)  { return a - b; }

// B. Default export
export default function multiply(a, b) { return a * b; }

// C. Consumer file
import multiply, { add, sub as minus } from './math.js';
console.log(add(1, 1), minus(5, 2), multiply(3, 4));  // 2 3 12

// D. Dynamic import (useful for conditional or lazy loading)
const { add: plus } = await import('./math.js');
console.log(plus(7, 8));   // 15


///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// path module
// CommonJS
const path = require('node:path');

// ES Modules (v14+)
import path from 'node:path';


import path from 'node:path';

const parts = ['foo', '/bar', 'baz/asdf', '..', 'quux.html'];

// 1. join & normalize
console.log('joined:',    path.join(...parts));
// → 'foo/bar/baz/quux.html'

// 2. resolve (to absolute)
console.log('resolved:',  path.resolve(...parts));
// → '/Users/you/…/foo/bar/baz/quux.html'

// 3. basename, dirname, extname
const p = '/home/user/docs/letter.txt';
console.log('base:',      path.basename(p));            // 'letter.txt'
console.log('name:',      path.basename(p, '.txt'));   // 'letter'
console.log('dir:',       path.dirname(p));             // '/home/user/docs'
console.log('ext:',       path.extname(p));             // '.txt'

// 4. isAbsolute & normalize
console.log('abs?',       path.isAbsolute(p));          // true
console.log('norm:',      path.normalize('/foo//bar/../baz'));
// → '/foo/baz'

// 5. relative
console.log('rel:',       path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'));
// → '../../impl/bbb'

// 6. parse & format
const parsed = path.parse(p);
console.log('parsed:',    parsed);
// → { root: '/', dir: '/home/user/docs', base: 'letter.txt', ext: '.txt', name: 'letter' }

const reformatted = path.format({ dir: '/tmp/files', name: 'report', ext: '.pdf' });
console.log('formatted:', reformatted);
// → '/tmp/files/report.pdf'


///////////////////////////////////////////////////////////////////////////






// node js error handling
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};


// handle the dev error 
// handle the prod error

// create a async wrapper for the error handling

// use the validator to validate the request body // express-validator

// learn about the user like dislike comment logic 
