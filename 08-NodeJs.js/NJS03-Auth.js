// 🔐 AUTHENTICATION & AUTHORIZATION
// 65 - Implementing JWT authentication: jsonwebtoken library, signing, verifying tokens
// 66 - Passport.js: local strategy, JWT strategy, OAuth strategies (Google, Facebook)
// 67 - Session-based authentication: express-session, cookie-parser, secure cookies
// 68 - OAuth 2.0 flow: authorization code, implicit flow, using Passport OAuth strategies
// 69 - Role-based access control (RBAC) and permissions middleware
// 70 - CSRF protection: csurf middleware, synchronizer tokens, double-submit cookie pattern
// 71 - Rate limiting: express-rate-limit, limiting brute-force attacks




///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 65 – Implementing JWT authentication: jsonwebtoken library, signing, verifying tokens
//
// JSON Web Tokens (JWTs) are a compact URL-safe means of representing claims between parties.
// Use the `jsonwebtoken` package to sign and verify tokens using a secret (HS256) or key pair (RS256).
//
// Key steps:
// 1. Install: `npm install jsonwebtoken`
// 2. Choose algorithm: HMAC (HS256) with a shared secret or RSA (RS256) with private/public keys.
// 3. Sign a token with payload, secret/key, and options (expiresIn, issuer, audience).
// 4. Verify a token to validate signature and claims, handle errors.
// 5. Decode a token without verifying (for non-sensitive data).
// 6. Integrate in Express as middleware: extract from Authorization header, verify, attach decoded data to req.
//
// ——————————————————————————————————————————————————————————————
// Example 1: Signing and verifying with HS256
const jwt = require('jsonwebtoken');
const secret = 'your-very-secure-secret';

// Sign a token with payload and 1h expiration
const payload = { userId: 123, role: 'admin' };
const token = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1h' });
console.log('Signed HS256 token:', token);

// Verify the token
try {
  const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
  console.log('Decoded payload:', decoded);
} catch (err) {
  console.error('Token verification failed:', err.message);
}

// Decode without verifying (no signature check)
const decodedRaw = jwt.decode(token);
console.log('Decoded without verify:', decodedRaw);

// ——————————————————————————————————————————————————————————————
// Example 2: Signing and verifying with RS256 (asymmetric)
// Generate keys: `openssl genrsa -out private.key 2048`  
//               `openssl rsa -in private.key -pubout -out public.key`
const fs = require('fs');
const privateKey = fs.readFileSync('private.key');
const publicKey  = fs.readFileSync('public.key');

// Sign with private key
const rsToken = jwt.sign(payload, privateKey, {
  algorithm: 'RS256',
  expiresIn: '2h',
  issuer: 'your-app'
});
console.log('Signed RS256 token:', rsToken);

// Verify with public key
try {
  const decodedRs = jwt.verify(rsToken, publicKey, {
    algorithms: ['RS256'],
    issuer: 'your-app'
  });
  console.log('Decoded RS256 payload:', decodedRs);
} catch (err) {
  console.error('RS256 verification failed:', err.message);
}

// ——————————————————————————————————————————————————————————————
// Example 3: Express middleware for JWT auth
const express = require('express');
const app = express();

function jwtAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/, '');
  if (!token) return res.status(401).json({ error: 'Token required' });
  jwt.verify(token, secret, { algorithms: ['HS256'] }, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;  // attach decoded payload for downstream handlers
    next();
  });
}

app.use(express.json());

app.get('/protected', jwtAuth, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

app.listen(3000, () => console.log('Server running on port 3000'));

// ——————————————————————————————————————————————————————————————
// Example 4: Refresh token pattern
// • Issue short-lived access token + long-lived refresh token.
// • Store refresh token in DB or HTTP-only cookie.
// • Refresh endpoint verifies refresh token, issues new access token.
const refreshTokenSecret = 'another-secure-secret';

function issueTokens(userId) {
  const accessToken  = jwt.sign({ userId }, secret, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, refreshTokenSecret, { expiresIn: '7d' });
  // Save refreshToken in database or send as secure cookie
  return { accessToken, refreshToken };
}

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 66 – Passport.js: local strategy, JWT strategy, OAuth strategies (Google, Facebook)
//
// Passport.js is middleware for authentication in Express. Strategies:
// LocalStrategy for username/password, JwtStrategy with passport-jwt for token-based auth,
// GoogleStrategy and FacebookStrategy for OAuth. Install passport and relevant strategy packages.
// Configure strategies with verify callbacks, serialize/deserialize for sessions,
// initialize passport middleware, and protect routes with passport.authenticate('strategy').

const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const users = [{ id: 1, username: 'user', password: 'pass' }];
function findUser(username) {
  return users.find(u => u.username === username);
}
function findById(id) {
  return users.find(u => u.id === id);
}

passport.use(new LocalStrategy((username, password, done) => {
  const user = findUser(username);
  if (!user || user.password !== password) {
    return done(null, false);
  }
  return done(null, user);
}));

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'jwt-secret'
};
passport.use(new JwtStrategy(jwtOpts, (payload, done) => {
  const user = findById(payload.id);
  if (user) return done(null, user);
  return done(null, false);
}));

passport.use(new GoogleStrategy({
  clientID: 'GOOGLE_CLIENT_ID',
  clientSecret: 'GOOGLE_CLIENT_SECRET',
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

passport.use(new FacebookStrategy({
  clientID: 'FACEBOOK_APP_ID',
  clientSecret: 'FACEBOOK_APP_SECRET',
  callbackURL: '/auth/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user.id || user);
});
passport.deserializeUser((id, done) => {
  const user = findById(id) || id;
  done(null, user);
});

app.post('/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, jwtOpts.secretOrKey, { expiresIn: '1h' });
    res.json({ token });
  }
);

app.get('/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: 'Protected content', user: req.user });
  }
);

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.json({ profile: req.user });
  }
);

app.get('/auth/facebook',
  passport.authenticate('facebook')
);
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.json({ profile: req.user });
  }
);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 67 – Session-based authentication: express-session, cookie-parser, secure cookies
//
// Session-based auth stores user state on the server and an opaque session ID in a cookie.
// • express-session manages sessions in memory or via a store (Redis, Mongo).
// • cookie-parser parses cookies on incoming requests.
// • Secure cookies:
//   – httpOnly: inaccessible to client-side JS (prevents XSS stealing).
//   – secure: sent only over HTTPS.
//   – sameSite: controls cross-site sending (Lax or Strict).
//   – maxAge: cookie expiration in milliseconds.
// • Typical flow: on login, set req.session.userId; on logout, destroy session.
//
// Example code below demonstrates:
// 1. Setting up express-session with a memory store (not for production).
// 2. Parsing cookies.
// 3. Login route that initializes session.
// 4. Protected route checking session.
// 5. Logout route destroying session.

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Session middleware configuration
app.use(session({
  name: 'sid',                        // custom cookie name
  secret: 'your-very-secret-key',     // sign the session ID cookie
  resave: false,                      // don’t save session if unmodified
  saveUninitialized: false,           // don’t create session until something stored
  cookie: {
    httpOnly: true,                   // inaccessible to client-side JS
    secure: false,                    // set true if HTTPS
    sameSite: 'lax',                  // Lax helps protect CSRF
    maxAge: 1000 * 60 * 60 * 2        // 2 hours
  }
}));

// Mock user database
const users = [{ id: 1, username: 'alice', password: 'password123' }];

// Login route: sets session.userId on successful auth
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  req.session.userId = user.id;
  res.json({ message: 'Logged in successfully' });
});

// Middleware to protect routes
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
}

// Protected route example
app.get('/dashboard', requireLogin, (req, res) => {
  res.json({ message: `Welcome user ${req.session.userId}` });
});

// Logout route: destroys the session
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.clearCookie('sid');  // clear session cookie on client
    res.json({ message: 'Logged out successfully' });
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 68 – OAuth 2.0 flow: authorization code, implicit flow, using Passport OAuth strategies
//
// OAuth 2.0 defines multiple “grant” types for obtaining access tokens:
// • Authorization Code Flow (server-side apps):
//     1. Client redirects user to provider’s auth URL with client_id, redirect_uri, scope.
//     2. User authenticates and consents; provider redirects back with ?code=….
//     3. Server exchanges the code (with client_secret) for access & refresh tokens.
//     4. Server stores tokens securely and uses them for API calls.
// • Implicit Flow (single-page/front-end apps, deprecated):
//     1. Client redirects user to auth URL with response_type=token.
//     2. Provider redirects back with the access_token in the URL fragment.
//     3. Client parses the token from window.location.hash and uses it directly.
//     • No refresh token; less secure since token is exposed to the browser.
// Passport.js strategies implement Authorization Code Flow by default.
// You configure a strategy (Google, Facebook, generic OAuth2) with client credentials,
// provide callback URLs, and let Passport handle redirects, token exchange, and profile retrieval.
// Then you protect routes via passport.authenticate('strategy').

// Example: Express + Passport Google OAuth2 (Authorization Code Flow)
const express  = require('express');
const passport = require('passport');
const session  = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
app.use(session({ secret: 'keyboard-cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Serialize/deserialize user into session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Configure GoogleStrategy
passport.use(new GoogleStrategy({
    clientID:     'GOOGLE_CLIENT_ID',
    clientSecret: 'GOOGLE_CLIENT_SECRET',
    callbackURL:  '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // profile contains user info; tokens can be stored
    return done(null, { profile, accessToken, refreshToken });
  }
));

// Route: start OAuth flow
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] })
);

// Callback URL configured in Google console
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful auth: req.user contains profile & tokens
    res.redirect('/protected');
  }
);

// Protected route example
app.get('/protected', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/login');
  res.send(`Hello, ${req.user.profile.displayName}`);
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));


// Notes on Implicit Flow (for client-only apps):
// • You’d configure response_type: 'token' in the auth URL.
// • The provider returns the token in the URL fragment (#access_token=…).
// • Passport does not natively support Implicit Flow; use client-side libraries
//   (e.g. oidc-client in SPAs) and APIs like fetch() with the bearer token.
//
// Next Steps:
// • Register your app’s redirect URI in the OAuth provider console.
// • Securely store refresh tokens and handle token expiry in your code.
// • Explore additional Passport strategies (FacebookStrategy, OAuth2Strategy) similarly.

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// 69 – Role-based access control (RBAC) and permissions middleware
//
// Define roles and their allowed actions in a permissions map.
// Create middleware that checks the current user’s role for the required permission.
// Attach user to req (e.g., from session or JWT) before performing authorization.
// Use authorize('action') on routes to enforce RBAC.
// Return 401 if unauthenticated, 403 if lacking permission.
//
// ——————————————————————————————————————————————————————————————
// Example: Express app with simple RBAC middleware
const express = require('express');
const app = express();

// Mock user store
const users = {
  1: { id: 1, name: 'Alice', role: 'admin' },
  2: { id: 2, name: 'Bob',   role: 'user' }
};

// Attach user based on header (simulate authentication)
app.use((req, res, next) => {
  const userId = parseInt(req.headers['x-user-id']);
  req.user = users[userId] || null;
  next();
});

// Permissions map
const permissions = {
  admin: ['read', 'write', 'delete'],
  user:  ['read']
};

// RBAC middleware factory
function authorize(action) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    const allowed = permissions[req.user.role] || [];
    if (!allowed.includes(action)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

// Routes protected by RBAC
app.get('/data',    authorize('read'),   (req, res) => res.json({ data: 'Public data' }));
app.post('/data',   authorize('write'),  (req, res) => res.json({ message: 'Data created' }));
app.delete('/data', authorize('delete'), (req, res) => res.json({ message: 'Data deleted' }));

app.listen(3000, () => console.log('Server running on port 3000'));

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



// 70 – CSRF protection: csurf middleware, synchronizer tokens, double-submit cookie pattern
//
// Cross-Site Request Forgery (CSRF) tricks authenticated users into submitting unwanted requests.
// Defenses include:
// • Synchronizer tokens: server stores a random token in session, embeds it in each form, and validates on POST.
// • Double-submit cookie: server sets a CSRF token cookie, client sends the same token in a hidden field or header.
// • csurf middleware: implements synchronizer pattern automatically for Express apps.

// Example 1: Using csurf middleware in Express
const express = require('express');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(csurf({ cookie: true }));

app.get('/form', (req, res) => {
  res.send(`<form action="/process" method="POST">
    <input type="hidden" name="_csrf" value="${req.csrfToken()}">
    <button type="submit">Submit</button>
  </form>`);
});

app.post('/process', (req, res) => {
  res.send('Form data processed successfully');
});

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).send('Invalid CSRF token');
  } else {
    next(err);
  }
});

// Example 2: Manual synchronizer token pattern
const crypto = require('crypto');
const session = require('express-session');
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

app.get('/sync-form', (req, res) => {
  const token = crypto.randomBytes(24).toString('hex');
  req.session.csrfToken = token;
  res.send(`<form action="/sync-process" method="POST">
    <input type="hidden" name="csrfToken" value="${token}">
    <button type="submit">Submit</button>
  </form>`);
});

app.post('/sync-process', (req, res) => {
  if (req.body.csrfToken !== req.session.csrfToken) {
    return res.status(403).send('CSRF validation failed');
  }
  delete req.session.csrfToken;
  res.send('Synchronized token validated');
});

// Example 3: Double-submit cookie pattern
app.use(cookieParser());

app.get('/double-form', (req, res) => {
  const token = crypto.randomBytes(24).toString('hex');
  res.cookie('XSRF-TOKEN', token, { httpOnly: false, sameSite: 'lax' });
  res.send(`<form action="/double-process" method="POST">
    <input type="hidden" name="xsrfToken" value="${token}">
    <button type="submit">Submit</button>
  </form>`);
});

app.post('/double-process', (req, res) => {
  const cookieToken = req.cookies['XSRF-TOKEN'];
  const bodyToken   = req.body.xsrfToken;
  if (!cookieToken || cookieToken !== bodyToken) {
    return res.status(403).send('Invalid CSRF token');
  }
  res.send('Double-submit token validated');
});

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


// 71 – Rate limiting: express-rate-limit, limiting brute-force attacks
//
// Rate limiting helps prevent brute-force and DDoS attacks by capping requests per IP or user.
// Use express-rate-limit to apply global or route-specific limits, configure windowMs, max,
// custom handlers, and different stores (memory, Redis) for production.

// Example 1: Global rate limit (100 requests per 15 minutes per IP)
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // limit each IP to 100 requests per window
  standardHeaders: true,    // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false,     // Disable the X-RateLimit-* headers
});

app.use(globalLimiter);

// Example 2: Route-specific limiter for login to prevent brute-force
const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,                   // limit each IP to 5 login attempts per window
  message: 'Too many login attempts, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/login', loginLimiter, (req, res) => {
  // login logic here
  res.send('Login endpoint');
});

// Example 3: Dynamic limits and custom handler
const dynamicLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,                 // 10 minutes
  max: (req, res) => req.user ? 1000 : 50, // higher limit for authenticated users
  handler: (req, res) => {
    res.status(429).json({ error: 'Too many requests, slow down' });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', dynamicLimiter);

// Example 4: Using Redis store for distributed rate limiting
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');
const redisClient = new Redis();

const redisLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
  windowMs: 15 * 60 * 1000,
  max: 200,
});

app.use('/api/', redisLimiter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////