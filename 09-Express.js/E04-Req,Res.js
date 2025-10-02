// 🔧 REQUEST & RESPONSE HANDLING
// 27 - Parsing request body: JSON, URL-encoded, multipart/form-data (multer for file uploads)
// 28 - Handling forms and file uploads: multer setup, storage options, validation
// 29 - Serving static assets: express.static middleware, caching headers, directory structure
// 30 - Sending files and streams: res.sendFile(), fs.createReadStream()
// 31 - Setting and reading cookies: cookie-parser middleware, res.cookie(), req.cookies
// 32 - Working with sessions: express-session configuration, session stores (MemoryStore, RedisStore)
// 33 - Flash messages with connect-flash for one-time notifications

// 🛠 TEMPLATING & VIEW ENGINES
// 34 - Integrating a view engine: setting app.set('view engine', 'ejs'/'pug'/'hbs')
// 35 - EJS basics: embedding JavaScript in HTML, partials/includes
// 36 - Pug (formerly Jade) syntax: indentation-based, mixins, template inheritance
// 37 - Handlebars (hbs or express-handlebars): helpers, layouts, partials
// 38 - Sending dynamic data to templates: res.render('template', { data })
// 39 - Layouts, partials, and reusable components in views
// 40 - Organizing views and static assets folder structure

// 🔐 AUTHENTICATION & AUTHORIZATION
// 41 - Implementing basic authentication: HTTP Basic Auth, custom middleware for login
// 42 - Session-based authentication: passport.js local strategy, serializeUser, deserializeUser
// 43 - JWT authentication: jsonwebtoken library, signing tokens, middleware to verify JWT, token invalidation
// 44 - OAuth integration with Passport.js: Google, Facebook, GitHub strategies
// 45 - Role-based access control (RBAC): middleware to check user roles, permissions
// 46 - Protecting routes: middleware to enforce authentication and authorization



/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 27 - Parsing request body: JSON, URL-encoded, multipart/form-data (multer for file uploads)
//    - Express can parse incoming request bodies of various types using built-in and third-party middleware.

//    1️⃣ JSON body (application/json)
//        - Use express.json() middleware.
//        - Required for handling JSON data in POST, PUT, PATCH, etc.
//        - Example:
app.use(express.json());

//    2️⃣ URL-encoded body (application/x-www-form-urlencoded)
//        - Use express.urlencoded() middleware.
//        - Common for HTML form submissions.
//        - Example:
app.use(express.urlencoded({ extended: true }));

//    3️⃣ Multipart/form-data (file uploads)
//        - Use multer (third-party middleware) for parsing file uploads.
//        - $ npm install multer
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Files saved to 'uploads/' folder

//        - To handle single file upload from form field "profile":
app.post('/upload', upload.single('profile'), (req, res) => {
  // File info in req.file, other form fields in req.body
  res.send(`File uploaded: ${req.file.originalname}`);
});

//        - To handle multiple files:
app.post('/uploads', upload.array('photos', 5), (req, res) => {
  res.send(`Uploaded ${req.files.length} files`);
});

//    - Summary:
//        - express.json()      → JSON request bodies
//        - express.urlencoded()→ Form data (URL-encoded)
//        - multer              → Multipart/form-data (file uploads)
//    - Choose and configure middleware based on expected request body type.


/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 28 - Handling forms and file uploads: multer setup, storage options, validation
//    - multer is a popular middleware for handling multipart/form-data (file uploads) in Express.
//    - Supports flexible storage options and validation.

//    1️⃣ Setup and basic usage
//        - Install multer: $ npm install multer
const express = require('express');
const multer = require('multer');
const app = express();

//    2️⃣ Storage options
//        - By default, multer stores files in memory or in a specified directory ('diskStorage').
//        - Example: Disk storage with custom filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to 'uploads/' folder
  },
  filename: (req, file, cb) => {
    // Use original name or customize (e.g., timestamp + original)
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

//    3️⃣ File validation (type, size)
//        - Use multer's fileFilter option to validate file type
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};
const uploadWithValidation = multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 } }); // 1MB limit

//    4️⃣ Handling uploads in route
app.post('/upload', uploadWithValidation.single('profile'), (req, res) => {
  // req.file contains file info, req.body has other fields
  res.send(`File uploaded: ${req.file.filename}`);
});

//    - For multiple files: upload.array('photos', maxCount)
//    - Handle errors using error-handling middleware for user-friendly responses
app.use((err, req, res, next) => {
  res.status(400).json({ success: false, message: err.message });
});

//    - Summary:
//        - multer handles form-based file uploads
//        - Customizable storage (memory, disk, cloud)
//        - Built-in support for file validation (type, size, etc.)
//        - Always handle errors and validate input for secure uploads

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 28 - Handling forms and file uploads: multer setup, storage options, validation
//    - multer is a popular middleware for handling multipart/form-data (file uploads) in Express.
//    - Supports flexible storage options and validation.

//    1️⃣ Setup and basic usage
//        - Install multer: $ npm install multer
const express = require('express');
const multer = require('multer');
const app = express();

//    2️⃣ Storage options
//        - By default, multer stores files in memory or in a specified directory ('diskStorage').
//        - Example: Disk storage with custom filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to 'uploads/' folder
  },
  filename: (req, file, cb) => {
    // Use original name or customize (e.g., timestamp + original)
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

//    3️⃣ File validation (type, size)
//        - Use multer's fileFilter option to validate file type
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};
const uploadWithValidation = multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 } }); // 1MB limit

//    4️⃣ Handling uploads in route
app.post('/upload', uploadWithValidation.single('profile'), (req, res) => {
  // req.file contains file info, req.body has other fields
  res.send(`File uploaded: ${req.file.filename}`);
});

//    - For multiple files: upload.array('photos', maxCount)
//    - Handle errors using error-handling middleware for user-friendly responses
app.use((err, req, res, next) => {
  res.status(400).json({ success: false, message: err.message });
});

//    - Summary:
//        - multer handles form-based file uploads
//        - Customizable storage (memory, disk, cloud)
//        - Built-in support for file validation (type, size, etc.)
//        - Always handle errors and validate input for secure uploads

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 29 - Serving static assets: express.static middleware, caching headers, directory structure
//    - Use express.static() to serve static files (HTML, CSS, JS, images, fonts) from a directory.
//    - Essential for serving frontend resources in web apps.

//    1️⃣ Basic usage
const express = require('express');
const app = express();

// Serve static files from 'public' directory
app.use(express.static('public'));
// Now, files in /public can be accessed via http://localhost:3000/filename.ext

//    2️⃣ Directory structure example
/*
my-app/
├── public/
│     ├── index.html
│     ├── styles.css
│     └── logo.png
├── app.js
*/

//    3️⃣ Caching headers
//        - express.static sets cache-control headers by default (max-age=0, no caching).
//        - Can customize for better performance (e.g., static assets versioned, aggressive caching):
app.use(express.static('public', {
  maxAge: '7d',        // Cache static assets for 7 days
  etag: false          // Optionally disable ETag header
}));

//    4️⃣ Serving assets from different folders or with virtual path prefixes
app.use('/static', express.static('assets')); // Access via /static/filename.ext

//    - Always serve static files before defining API routes to avoid conflicts.
//    - Use proper caching for performance in production (set maxAge/Cache-Control headers).
//    - Organize public assets in a dedicated directory for maintainability.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 30 - Sending files and streams: res.sendFile(), fs.createReadStream()
//    - Express allows sending files and file streams as HTTP responses.
//    - Useful for downloads, large files, and dynamic content.

//    1️⃣ res.sendFile()
//        - Sends a complete file as a response.
//        - Handles content-type, range requests, and errors automatically.
const express = require('express');
const path = require('path');
const app = express();

app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'files', 'sample.pdf');
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});

//    2️⃣ fs.createReadStream()
//        - Streams a file (or data) to the response in chunks (efficient for large files).
//        - Gives you manual control over streaming and headers.
const fs = require('fs');

app.get('/stream', (req, res) => {
  const filePath = path.join(__dirname, 'files', 'sample.pdf');
  const readStream = fs.createReadStream(filePath);

  res.setHeader('Content-Type', 'application/pdf');
  readStream.pipe(res);

  // Optional error handling
  readStream.on('error', () => {
    res.status(404).send('File not found');
  });
});

//    - Use res.sendFile() for simple file serving; use fs.createReadStream() for fine-grained control or custom streaming logic.
//    - Always handle errors for missing or inaccessible files.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 31 - Setting and reading cookies: cookie-parser middleware, res.cookie(), req.cookies
//    - Cookies are small pieces of data stored on the client and sent with every HTTP request.
//    - Use the cookie-parser middleware to easily read cookies in Express.
//    - Use res.cookie() to set cookies and req.cookies to read them.

//    1️⃣ Setup cookie-parser
//        - Install: $ npm install cookie-parser
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser()); // Register middleware

//    2️⃣ Setting cookies
app.get('/set-cookie', (req, res) => {
  // res.cookie(name, value, [options])
  res.cookie('username', 'ajay', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }); // 1 day, HTTP-only
  res.send('Cookie set!');
});

//    3️⃣ Reading cookies
app.get('/read-cookie', (req, res) => {
  // req.cookies is an object with cookie names as keys
  const username = req.cookies.username;
  res.send(`Cookie value: ${username}`);
});

//    4️⃣ Clearing cookies
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('username');
  res.send('Cookie cleared!');
});

//    - Options include maxAge, expires, httpOnly, secure, sameSite, etc.
//    - Use HTTP-only and secure options for sensitive data.
//    - Cookies are useful for sessions, authentication, and user preferences.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 32 - Working with sessions: express-session configuration, session stores (MemoryStore, RedisStore)
//    - Sessions store user data on the server between HTTP requests (e.g., login state).
//    - Use the express-session middleware to manage sessions in Express.

//    1️⃣ Setup express-session
//        - Install: $ npm install express-session
const express = require('express');
const session = require('express-session');
const app = express();

//    2️⃣ Basic configuration (MemoryStore - for dev only!)
app.use(session({
  secret: 'your-secret-key',         // Required, should be unique/secure
  resave: false,                     // Don’t save session if unmodified
  saveUninitialized: false,          // Don’t create session until something stored
  cookie: { maxAge: 60 * 60 * 1000 } // Session valid for 1 hour
}));

//    3️⃣ Using sessions in routes
app.get('/set-session', (req, res) => {
  req.session.username = 'ajay';
  res.send('Session value set!');
});

app.get('/get-session', (req, res) => {
  const username = req.session.username;
  res.send(`Session value: ${username}`);
});

app.get('/destroy-session', (req, res) => {
  req.session.destroy();
  res.send('Session destroyed!');
});

//    4️⃣ Using Redis or other stores in production
//        - MemoryStore is not suitable for production (not scalable, not persistent).
//        - Use connect-redis or similar for distributed/session-persistent storage:
//        - Install: $ npm install connect-redis redis

//        Example with RedisStore:
/*
const RedisStore = require('connect-redis').default;
const redis = require('redis');
const redisClient = redis.createClient();

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
}));
*/

//    - Session stores can also use MongoDB, MySQL, or other backends.
//    - Sessions are vital for authentication, shopping carts, and tracking user state.
//    - Always secure your session secrets and use secure cookies in production.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////



// 33 - Flash messages with connect-flash for one-time notifications
//    - Flash messages are used to display one-time notifications (e.g., "Login successful!") after a redirect.
//    - Common in authentication flows, form submissions, etc.
//    - Requires session middleware (express-session) and connect-flash middleware.

//    1️⃣ Install dependencies
//        - $ npm install express-session connect-flash

const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

//    2️⃣ Setup express-session and connect-flash
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

//    3️⃣ Setting a flash message (in a route)
app.get('/set-flash', (req, res) => {
  req.flash('info', 'This is a flash message!');
  res.redirect('/show-flash');
});

//    4️⃣ Reading and displaying a flash message (in another route)
app.get('/show-flash', (req, res) => {
  const message = req.flash('info'); // Array of messages
  res.send(`Flash message: ${message}`);
});

//    - Flash messages are cleared after being read (one-time).
//    - You can set/read multiple types (e.g., 'info', 'error', 'success').
//    - Useful for user feedback in redirects (login, form submission, etc.).
//    - In views (e.g., with EJS/Pug), display flash messages for user notifications.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 34 - Integrating a view engine: setting app.set('view engine', 'ejs'/'pug'/'hbs')
//    - View engines let you render dynamic HTML pages using templates (e.g., EJS, Pug, Handlebars).
//    - Commonly used in server-rendered apps for displaying data and forms.

//    1️⃣ Install a view engine (example: EJS)
//        - $ npm install ejs

//    2️⃣ Set the view engine in Express
const express = require('express');
const app = express();

app.set('view engine', 'ejs'); // or 'pug', 'hbs' (handlebars), etc.

//    3️⃣ Organize your templates in a 'views' directory (default)
/*
my-app/
├── views/
│     ├── index.ejs
│     └── user.ejs
├── app.js
*/

//    4️⃣ Render a view from a route
app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page', username: 'ajay' });
});

//    - Data passed as the second argument is available in the template.
//    - For other engines:
//        - Pug: $ npm install pug   | app.set('view engine', 'pug')
//        - Handlebars: $ npm install hbs   | app.set('view engine', 'hbs')
//    - Can customize views directory: app.set('views', 'custom_folder')
//    - Useful for layouts, partials, and server-side rendering (SSR).

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////



// 35 - EJS basics: embedding JavaScript in HTML, partials/includes
//    - EJS (Embedded JavaScript) lets you embed JS code inside HTML templates.
//    - Useful for rendering dynamic content and reusing partial layouts (includes).

//    1️⃣ Embedding JavaScript in EJS
//        - Use <% %> for JS logic (no output)
//        - Use <%= %> for outputting and escaping HTML
//        - Use <%- %> for unescaped output (use with caution)
/*
<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <h1>Welcome, <%= username %>!</h1>
  <% if (showLogout) { %>
    <a href="/logout">Logout</a>
  <% } %>
</body>
</html>
*/

//    2️⃣ Using partials/includes
//        - Reuse chunks of HTML with <%- include('partialFile') %>
/*
<!-- views/partials/header.ejs -->
<header>
  <h1>Site Header</h1>
</header>

<!-- views/index.ejs -->
<%- include('partials/header') %>
<h2>Home Content</h2>
*/

//    3️⃣ Passing data from route to EJS template
const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', username: 'ajay', showLogout: true });
});

//    - EJS makes server-side rendering with Express simple and powerful.
//    - Use partials for DRY code and layout consistency (headers, footers, navbars).

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// 36 - Pug (formerly Jade) syntax: indentation-based, mixins, template inheritance
//    - Pug is a clean, whitespace/indentation-based template engine for Node.js (Express).
//    - Lets you write HTML concisely without closing tags.
//    - Supports powerful features: variables, mixins (reusable blocks), and template inheritance (layout/extends).

//    1️⃣ Basic Pug syntax (indentation-based)
/*
doctype html
html
  head
    title= title
  body
    h1 Welcome #{username}
    if showLogout
      a(href="/logout") Logout
*/

//    2️⃣ Mixins: reusable template blocks (like functions)
/*
mixin userCard(name)
  .user-card
    p Name: #{name}

+userCard('Ajay')
+userCard('Alice')
*/

//    3️⃣ Template inheritance (layout/extends)
/*
/*- views/layout.pug -*/
doctype html
html
  head
    title My Site
  body
    block content

/*- views/index.pug -*/
extends layout

block content
  h1 Home Page
  p Welcome to the homepage!
*/

//    4️⃣ Using Pug with Express
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', username: 'ajay', showLogout: true });
});

//    - Use indentation (not curly braces/tags) to structure HTML.
//    - Mixins help avoid repetition for reusable UI blocks.
//    - Template inheritance allows for DRY layouts and consistent site structure.
//    - Pass data to templates via res.render().

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////



// 37 - Handlebars (hbs or express-handlebars): helpers, layouts, partials
//    - Handlebars is a logic-less templating engine for Express (hbs/express-handlebars).
//    - Supports helpers (custom functions), layouts (template inheritance), and partials (reusable snippets).

//    1️⃣ Setup (example with express-handlebars)
//        - $ npm install express-handlebars
const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();

app.engine('hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

//    2️⃣ Layouts (default wrappers for pages)
/*
// views/layouts/main.hbs
<!DOCTYPE html>
<html>
<head>
  <title>{{title}}</title>
</head>
<body>
  {{{body}}}
</body>
</html>
*/

/*
// views/home.hbs
<h1>Welcome, {{username}}!</h1>
*/

//    3️⃣ Partials (reusable chunks)
/*
// views/partials/header.hbs
<header><h1>Header Section</h1></header>

// In a template
{{> header}}
*/

//    4️⃣ Helpers (custom functions for logic)
/*
app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    shout: (text) => text.toUpperCase()
  }
}));

// Usage in template: {{shout username}}
*/

//    5️⃣ Rendering a page with data
app.get('/', (req, res) => {
  res.render('home', { title: 'Home', username: 'ajay' });
});

//    - Use layouts for consistent structure, partials for DRY code, and helpers for logic.
//    - Handlebars escapes HTML by default; use triple-stash {{{ }}} for unescaped content (be careful).

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 38 - Sending dynamic data to templates: res.render('template', { data })
//    - res.render() is used to render a view/template and pass dynamic data to it.
//    - Data passed as the second argument becomes available in the template for interpolation and logic.

//    1️⃣ Basic usage
const express = require('express');
const app = express();

app.set('view engine', 'ejs'); // Can be 'pug', 'hbs', etc.

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', username: 'ajay', isLoggedIn: true });
});

//    2️⃣ Accessing dynamic data in the template
/*
<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <h1>Welcome, <%= username %>!</h1>
  <% if (isLoggedIn) { %>
    <a href="/logout">Logout</a>
  <% } %>
</body>
</html>
*/

//    - Data object can include strings, numbers, arrays, objects, or functions.
//    - Use for rendering user-specific info, lists, error messages, etc.
//    - Works with any view engine supported by Express (EJS, Pug, Handlebars, etc.).

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 39 - Layouts, partials, and reusable components in views
//    - View engines support layouts, partials, and reusable components for DRY, maintainable templates.
//    - These features help create consistent site structure and avoid repetition.

//    1️⃣ Layouts
//        - Provide a common wrapper for all pages (e.g., header, footer, nav).
//        - Example (EJS with express-ejs-layouts):
/*
<!-- views/layout.ejs -->
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <%- body %>
</body>
</html>
*/
//        - Use with express-ejs-layouts or built-in with Pug/Handlebars.

//    2️⃣ Partials/includes
//        - Small reusable template files (header, footer, sidebar).
//        - Example (EJS):
/*
<!-- views/partials/header.ejs -->
<header><h1>Header Section</h1></header>

<!-- In a main view -->
<%- include('partials/header') %>
*/

//        - Example (Handlebars):
//          {{> header}}

//        - Example (Pug):
//          include partials/header.pug

//    3️⃣ Reusable components
//        - Combine partials, helpers, and blocks (e.g., cards, buttons, navbars).
//        - Pass data to partials/components for dynamic content.
//        - Example (Pug mixin):
/*
mixin userCard(user)
  .card
    h2= user.name
    p Email: #{user.email}

+userCard({ name: 'Ajay', email: 'ajay@example.com' })
*/

//    - Use layouts for shared structure, partials for repeated UI, and reusable components for consistent, flexible UIs.
//    - Helps keep code DRY and easier to update site-wide UI changes.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 40 - Organizing views and static assets folder structure
//    - Keeping views (templates) and static assets (CSS, JS, images) organized improves maintainability and scalability.
//    - Use separate directories for views and static files.
//    - Follow conventional structure for clarity and easy navigation.

//    1️⃣ Example project structure:
/*
my-express-app/
├── app.js
├── package.json
├── public/                // Static assets (served via express.static)
│     ├── css/
│     ├── js/
│     ├── images/
│     └── favicon.ico
├── views/                 // View templates for rendering (EJS, Pug, HBS, etc.)
│     ├── partials/
│     ├── layouts/
│     ├── index.ejs
│     └── user.ejs
└── uploads/               // File uploads (if needed)
*/

//    2️⃣ Setting up Express to use these folders
const express = require('express');
const app = express();

app.set('view engine', 'ejs');          // Set view engine
app.set('views', './views');            // (Optional: default is './views')
app.use(express.static('public'));      // Serve static files from /public

//    3️⃣ Best practices:
//        - Place all frontend assets (CSS, JS, images) in /public
//        - Organize views into subfolders for partials, layouts, or resource-specific templates
//        - Use clear, consistent naming for easy reference and maintainability
//        - Store user-uploaded files in a dedicated /uploads directory (not public unless intentionally shared)
//        - Keep root directory clean; avoid mixing source and static/template files

//    - Proper folder organization simplifies teamwork and future code updates.
//    - Makes the project scalable as more features/templates/assets are added.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 41 - Implementing basic authentication: HTTP Basic Auth, custom middleware for login
//    - Basic authentication verifies user identity with username and password sent in each request.
//    - HTTP Basic Auth uses an Authorization header (base64 encoded 'username:password').
//    - Can be implemented using third-party middleware or custom Express middleware for learning/demo.

//    1️⃣ HTTP Basic Auth using third-party middleware
//        - Example: Use 'express-basic-auth' for quick setup
//        - $ npm install express-basic-auth
const express = require('express');
const basicAuth = require('express-basic-auth');
const app = express();

app.use(basicAuth({
  users: { 'ajay': 'password123' },    // username:password pairs
  challenge: true                      // Prompts the browser login dialog
}));

app.get('/', (req, res) => {
  res.send('Authenticated!');
});

//    2️⃣ Custom basic auth middleware
//        - Parse Authorization header and validate credentials manually
app.use('/custom-auth', (req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).send('Auth required');

  // Basic <base64string>
  const [scheme, encoded] = auth.split(' ');
  if (scheme !== 'Basic' || !encoded) return res.status(401).send('Invalid auth scheme');

  const decoded = Buffer.from(encoded, 'base64').toString(); // username:password
  const [username, password] = decoded.split(':');
  
  // Replace with your own validation logic
  if (username === 'ajay' && password === 'password123') {
    next(); // Authenticated
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/custom-auth/secret', (req, res) => {
  res.send('Custom Authenticated!');
});

//    - Basic Auth is simple but not secure for production (credentials sent with every request).
//    - Use HTTPS and prefer token/session-based authentication for real-world apps.
//    - Custom middleware can be extended for more complex login flows.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////



// 43 - JWT authentication: jsonwebtoken library, signing tokens, middleware to verify JWT, token invalidation
//    - JWT (JSON Web Token) is a stateless authentication mechanism for APIs.
//    - Tokens are signed and sent to the client after login, then sent back with each request (usually in headers).
//    - Use the 'jsonwebtoken' library to create and verify tokens.

//    1️⃣ Install dependencies
//        - $ npm install jsonwebtoken

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const JWT_SECRET = 'your_jwt_secret'; // Should be strong & secret

//    2️⃣ Signing tokens (login route)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Replace with real user validation!
  if (username === 'ajay' && password === 'password123') {
    const token = jwt.sign({ userId: 1, username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

//    3️⃣ Middleware to verify JWT
function verifyJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1]; // Expect: Bearer <token>
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid or expired token' });
    req.user = decoded; // Attach user info to request
    next();
  });
}

//    4️⃣ Protecting routes with JWT middleware
app.get('/protected', verifyJWT, (req, res) => {
  res.json({ message: 'This is protected!', user: req.user });
});

//    5️⃣ Token invalidation
//        - JWTs are stateless; you can't "revoke" them server-side unless you implement a token blacklist (in DB or memory).
//        - Common practice: keep JWTs short-lived (set low expiresIn).
//        - For force logout, store a blacklist of invalidated tokens and check it in verifyJWT middleware.

//    - JWT is ideal for stateless APIs (mobile, SPAs, microservices).
//    - Always use HTTPS for token transmission. Never store JWTs in localStorage for sensitive apps—prefer HttpOnly cookies.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////



// 44 - OAuth integration with Passport.js: Google, Facebook, GitHub strategies
//    - OAuth lets users log in with third-party providers (Google, Facebook, GitHub, etc.).
//    - Passport.js provides strategies for many OAuth providers (passport-google-oauth20, passport-facebook, passport-github2).
//    - You’ll need to register your app with the provider to get clientID and clientSecret.

//    1️⃣ Install Passport and provider strategy (example: Google OAuth)
//        - $ npm install passport passport-google-oauth20 express-session

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();

app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//    2️⃣ Configure the Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: 'GOOGLE_CLIENT_ID',
  clientSecret: 'GOOGLE_CLIENT_SECRET',
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Save/find user in DB here
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

//    3️⃣ Auth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  })
);

//    4️⃣ Protected route
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

app.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.send(`Hello, ${req.user.displayName}!`);
});

//    - For Facebook, GitHub, etc., install the appropriate passport strategy and repeat similar setup.
//    - Each provider requires registering your callback URL and getting credentials.
//    - OAuth is great for social login and improves user experience (no password handling).
//    - Always secure client secrets and use HTTPS in production.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 45 - Role-based access control (RBAC): middleware to check user roles, permissions
//    - RBAC restricts access to resources based on user roles (admin, editor, user, etc.).
//    - Use middleware to enforce permissions for protected routes.
//    - User roles can be stored in JWT, session, or database.

//    1️⃣ Example: Simple role-checking middleware
function checkRole(requiredRole) {
  return (req, res, next) => {
    // For JWT: req.user.role (set in JWT payload & verify middleware)
    // For session: req.user.role (set at login)
    const userRole = req.user?.role;
    if (userRole === requiredRole) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }
  };
}

//    2️⃣ Usage with route (after authentication middleware)
const express = require('express');
const app = express();

// Example: Attach a mock user for demonstration
app.use((req, res, next) => {
  req.user = { id: 1, username: 'ajay', role: 'admin' }; // Replace with real auth logic
  next();
});

// Protect this route for admins only
app.get('/admin', checkRole('admin'), (req, res) => {
  res.send('Welcome, Admin!');
});

//    3️⃣ Supporting multiple roles
function checkRoles(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }
  };
}

// Only admins or editors can access
app.get('/edit', checkRoles('admin', 'editor'), (req, res) => {
  res.send('Editor or Admin Access!');
});

//    - Best practice: fetch roles from DB/session/JWT, not hardcoded.
//    - RBAC can be as fine-grained as needed (per route, resource, action).
//    - Respond with 403 Forbidden if access is denied.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


// 46 - Protecting routes: middleware to enforce authentication and authorization
//    - Protecting routes ensures that only authenticated (and optionally authorized) users can access certain endpoints.
//    - Common pattern: Use custom middleware to check authentication and (optionally) user roles/permissions.

//    1️⃣ Authentication middleware (checks if user is logged in)
//        - For session-based auth (Passport.js):
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized: Please log in.' });
}

//        - For JWT-based auth (after token verification):
function ensureJwtAuthenticated(req, res, next) {
  if (req.user) { // req.user set by JWT middleware after verifying token
    return next();
  }
  res.status(401).json({ message: 'Unauthorized: Invalid or missing token.' });
}

//    2️⃣ Authorization middleware (checks user roles/permissions)
function checkRole(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (allowedRoles.includes(userRole)) {
      return next();
    }
    res.status(403).json({ message: 'Forbidden: Insufficient permissions.' });
  };
}

//    3️⃣ Usage with protected routes
const express = require('express');
const app = express();

// Mock JWT middleware (for demo purposes)
app.use((req, res, next) => {
  // Simulate authenticated user with role
  req.user = { id: 1, username: 'ajay', role: 'editor' }; // Replace with real verification logic
  next();
});

app.get('/protected', ensureJwtAuthenticated, (req, res) => {
  res.send('This is a protected route!');
});

// Route accessible to admins only
app.get('/admin', ensureJwtAuthenticated, checkRole('admin'), (req, res) => {
  res.send('Hello, Admin!');
});

//    - Combine authentication and authorization for robust protection.
//    - Place middleware before route handlers to enforce checks.
//    - Respond with 401 for unauthenticated and 403 for unauthorized access.

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////