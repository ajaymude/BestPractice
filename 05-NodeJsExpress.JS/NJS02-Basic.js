
















// handle the error properly
// for the dev and prod
// validate the data on 3 levels 1 frontend, 2 backend, 3 database
//  use mongoose method
// use mongoose validation

//

// __dirname__ is a global variable that contains the path to the current directory
// __filename__ is a global variable that contains the path to the current file
// process is a global variable that contains information about the current process
// module is a global variable that contains information about the current module
// require is a function that is used to import modules

// OS module provides operating system-related utility methods and properties
// Path module provides utilities for working with file and directory paths
// File system module provides an API for interacting with the file system
// HTTP module provides utilities for creating HTTP servers and clients
// URL module provides utilities for URL resolution and parsing
// Query string module provides utilities for parsing and formatting URL query strings
// Events module provides a way to work with events and event-driven programming
// Stream module provides an API for working with streaming data
// Buffer module provides a way to work with binary data in Node.js
// Child process module provides a way to spawn child processes and communicate with them
// Cluster module provides a way to create child processes that share server ports

// 01 - OS

// const os = require('os');

// console.log('================== OS MODULE DETAILS ==================');

// // Platform and OS Info
// console.log('OS Platform       :', os.platform());        // win32, linux, darwin
// console.log('OS Type           :', os.type());            // Windows_NT, Linux
// console.log('OS Release        :', os.release());         // e.g., 10.0.19045
// console.log('CPU Architecture  :', os.arch());            // x64, arm

// // CPU Info
// console.log('CPU Info          :', os.cpus());
// console.log('Number of Cores   :', os.cpus().length);

// // Memory Info
// console.log('Total Memory (MB) :', (os.totalmem() / 1024 / 1024).toFixed(2));
// console.log('Free Memory (MB)  :', (os.freemem() / 1024 / 1024).toFixed(2));

// // Uptime
// console.log('Uptime (minutes)  :', (os.uptime() / 60).toFixed(2));

// // User Info
// console.log('User Info         :', os.userInfo());
// console.log('Home Directory    :', os.homedir());
// console.log('Temporary Dir     :', os.tmpdir());

// // Network Interfaces
// console.log('Network Interfaces:', os.networkInterfaces());

// // CPU Endianness
// console.log('CPU Endianness    :', os.endianness());

// console.log('========================================================');

// 02 - Path

// const path = require('path');

// const filePath = '/users/ajay/projects/app.js';

// console.log('================= PATH MODULE DEMO =================');

// // 1. Get the last portion of the path
// console.log('1. Base Name        :', path.basename(filePath)); // app.js

// // 2. Get directory name
// console.log('2. Directory Name   :', path.dirname(filePath)); // /users/ajay/projects

// // 3. Get file extension
// console.log('3. File Extension   :', path.extname(filePath)); // .js

// // 4. Join multiple path segments (adds appropriate slashes)
// console.log('4. Join Path        :', path.join('/users', 'ajay', 'projects', 'app.js')); // /users/ajay/projects/app.js

// // 5. Resolve a relative path to an absolute path
// console.log('5. Resolve Path     :', path.resolve('projects', 'app.js')); // Absolute path

// // 6. Check if a path is absolute
// console.log('6. Is Absolute?     :', path.isAbsolute(filePath)); // true
// console.log('   Is Absolute?     :', path.isAbsolute('app.js')); // false

// // 7. Parse the path into an object
// const parsed = path.parse(filePath);
// console.log('7. Parsed Path      :', parsed);
// /*
// {
//   root: '/',
//   dir: '/users/ajay/projects',
//   base: 'app.js',
//   ext: '.js',
//   name: 'app'
// }
// */

// // 8. Convert the object back to a path
// console.log('8. Formatted Path   :', path.format(parsed)); // /users/ajay/projects/app.js

// // 9. Normalize a malformed path
// const malformedPath = '/users//ajay//projects///app.js';
// console.log('9. Normalized Path  :', path.normalize(malformedPath)); // /users/ajay/projects/app.js

// // 10. Path separator (OS-specific)
// console.log('10. Path Separator   :', path.sep); // \ on Windows, / on Unix

// // 11. Environment variable delimiter
// console.log('11. Env Delimiter    :', path.delimiter); // ; on Windows, : on Unix

// console.log('====================================================');

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// create a node server with the nodejs

// server.js
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the Home Page!");
  } else if (req.url === "/about" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is the About Page.");
  } else if (req.url === "/api/data" && req.method === "GET") {
    const data = {
      message: "Hello from the API",
      timestamp: new Date(),
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});


// process.exit()  // for the exit the node or the app



////////////////////////////////////////////////////////////////////////

// you can provide config for the env file 

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
