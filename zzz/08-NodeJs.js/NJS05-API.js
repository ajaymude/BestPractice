// 📡 API DESIGN & DOCUMENTATION
// 82 - Designing RESTful APIs: resource naming, HTTP methods, status codes, HATEOAS principles
// 83 - Versioning APIs: URI versioning, header versioning, media type versioning
// 84 - Input validation: Joi, celebrate, express-validator for schema validation
// 85 - Output formatting: consistent response structure, pagination, error envelope
// 86 - API documentation with Swagger/OpenAPI: swagger-jsdoc, swagger-ui-express
// 87 - API documentation with Postman: creating collections, testing, generating docs
// 88 - GraphQL API basics: Apollo Server setup, type definitions, resolvers
// 89 - GraphQL subscriptions: WebSockets, using graphql-ws or Apollo subscriptions
// 90 - gRPC in Node.js: Protocol Buffers, grpc-node package, service definitions




//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// 82 – Designing RESTful APIs: resource naming, HTTP methods, status codes, HATEOAS principles
//
// Resource naming:
// • Use plural nouns for collections: /users, /orders
// • Nest related resources: /users/:userId/orders/:orderId
//
// HTTP methods:
// • GET    → fetch resource(s) (200 OK)
// • POST   → create new resource (201 Created + Location header)
// • PUT    → replace entire resource (200 OK or 204 No Content)
// • PATCH  → modify partial resource (200 OK or 204 No Content)
// • DELETE → remove resource (204 No Content)
//
// Status codes:
// • 200 OK           – successful GET, PUT, PATCH
// • 201 Created      – successful POST; include Location: /resource/:id
// • 204 No Content   – successful DELETE or PUT/PATCH without body
// • 400 Bad Request  – malformed syntax or validation error
// • 401 Unauthorized – authentication required or failed
// • 403 Forbidden    – authenticated but not allowed
// • 404 Not Found    – resource doesn’t exist
// • 500 Internal     – server error
//
// HATEOAS principles:
// • Include hypermedia links in responses to guide clients.
// • Provide `_links` object with `self`, `related`, `collection`, etc.
// • Enables discoverability without out-of-band documentation.

const express = require('express');
const app = express();
app.use(express.json());

let users = [];           // in-memory store
let nextId = 1;

// GET /users → list users with HATEOAS links
app.get('/users', (req, res) => {
  const result = users.map(u => ({
    id: u.id,
    name: u.name,
    _links: {
      self: { href: `/users/${u.id}` }
    }
  }));
  res.status(200).json({
    count: result.length,
    _links: { self: { href: '/users' } },
    users: result
  });
});

// POST /users → create user
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const user = { id: nextId++, name };
  users.push(user);
  res.status(201)
    .location(`/users/${user.id}`)
    .json({
      id: user.id,
      name: user.name,
      _links: {
        self: { href: `/users/${user.id}` },
        collection: { href: '/users' }
      }
    });
});

// GET /users/:id → retrieve single user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === +req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json({
    id: user.id,
    name: user.name,
    _links: {
      self: { href: `/users/${user.id}` },
      collection: { href: '/users' }
    }
  });
});

// PATCH /users/:id → update user name
app.patch('/users/:id', (req, res) => {
  const user = users.find(u => u.id === +req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  user.name = name;
  res.status(200).json({
    id: user.id,
    name: user.name,
    _links: {
      self: { href: `/users/${user.id}` },
      collection: { href: '/users' }
    }
  });
});

// DELETE /users/:id → delete user
app.delete('/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(idx, 1);
  res.sendStatus(204);
});

// Error handling middleware (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000, () => {
  console.log('RESTful API server running on port 3000');
});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



// 83 – Versioning APIs: URI versioning, header versioning, media type versioning
//
// Approaches:
// 1. **URI versioning**: include the version identifier in the path (e.g. `/v1/users`, `/v2/users`).
// 2. **Header versioning**: use a custom header (e.g. `Accept-Version` or `X-API-Version`) to negotiate the version.
// 3. **Media type versioning** (a.k.a. content negotiation): encode the version in a custom media type in the `Accept` header
//    (e.g. `application/vnd.myapp.v1+json` vs `application/vnd.myapp.v2+json`).
//
// Example implementation with Express:

const express = require('express');
const app = express();

// URI versioning
app.get('/v1/users/:id', (req, res) => {
  res.json({ version: 'v1', userId: req.params.id, name: 'Alice' });
});
app.get('/v2/users/:id', (req, res) => {
  res.json({ version: 'v2', id: req.params.id, fullName: 'Alice Doe', age: 30 });
});

// Header versioning
app.get('/users/:id', (req, res) => {
  const apiVersion = req.headers['accept-version'] || req.headers['x-api-version'] || '1';
  if (apiVersion === '1') {
    res.json({ version: 'v1', userId: req.params.id, name: 'Alice' });
  } else if (apiVersion === '2') {
    res.json({ version: 'v2', id: req.params.id, fullName: 'Alice Doe', age: 30 });
  } else {
    res.status(400).json({ error: 'Unsupported API version' });
  }
});

// Media type versioning
app.get('/profiles/:id', (req, res) => {
  const accept = req.headers['accept'] || '';
  if (accept.includes('application/vnd.myapp.v2+json')) {
    res.type('application/vnd.myapp.v2+json').json({ id: req.params.id, fullName: 'Alice Doe', age: 30 });
  } else {
    res.type('application/vnd.myapp.v1+json').json({ id: req.params.id, name: 'Alice' });
  }
});

app.listen(3000, () => console.log('API server with versioning on port 3000'));

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// 84 – Input validation: Joi, celebrate, express-validator for schema validation
//
// Validate incoming data to prevent invalid or malicious input.
// • Joi (standalone): define schemas and call schema.validate().
// • celebrate: middleware for Express that uses Joi schemas per request segment.
// • express-validator: chainable validators using middleware and validationResult.
//
// ——————————————————————————————————————————————————————————————
// Example 1: Joi standalone validation
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  age:  Joi.number().integer().min(0).required(),
  email: Joi.string().email().required()
});

// validate some payload
const { error, value } = userSchema.validate({ name: 'Alice', age: 28, email: 'alice@example.com' });
if (error) {
  console.error('Joi validation failed:', error.details);
} else {
  console.log('Validated value:', value);
}

// ——————————————————————————————————————————————————————————————
// Example 2: celebrate in Express
const express = require('express');
const { celebrate, Joi: CelebrateJoi, errors, Segments } = require('celebrate');

const app = express();
app.use(express.json());

app.post('/register',
  celebrate({
    [Segments.BODY]: CelebrateJoi.object({
      username: CelebrateJoi.string().alphanum().min(3).max(30).required(),
      password: CelebrateJoi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      email:    CelebrateJoi.string().email().required()
    })
  }),
  (req, res) => {
    // If we reach here, req.body has been validated
    res.status(201).json({ message: 'User registered', user: req.body });
  }
);

// error handler for celebrate
app.use(errors());

// ——————————————————————————————————————————————————————————————
// Example 3: express-validator in Express
const { body, param, query, validationResult } = require('express-validator');

const app2 = express();
app2.use(express.json());

// Validate body fields and a query param
app2.post('/products',
  body('name').isString().notEmpty(),
  body('price').isFloat({ gt: 0 }),
  query('discount').optional().isInt({ min: 0, max: 100 }),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    res.json({ message: 'Product valid', data: req.body, discount: req.query.discount });
  }
);

// Validate route parameter
app2.get('/users/:id',
  param('id').isUUID(),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    res.json({ message: `User ID ${req.params.id} is valid` });
  }
);

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



// 85 – Output formatting: consistent response structure, pagination, error envelope
//
// Define a uniform API envelope with `success`, `data`, and optional `error` fields.
// Wrap paginated responses with `meta` containing `total`, `page`, `limit`, and `pages`.
// Use an `error` envelope with `message`, `code`, and optional `details`.
// Implement helper functions to build responses and errors.

// Helper functions
function formatSuccess(data, meta) {
  const response = { success: true, data };
  if (meta) response.meta = meta;
  return response;
}
function formatError(message, code, details) {
  const error = { message, code };
  if (details) error.details = details;
  return { success: false, error };
}

// Express example
const express = require('express');
const app = express();

// Sample in-memory items
const items = Array.from({ length: 95 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

// GET /items?page=1&limit=10 → paginated list
app.get('/items', (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit) || 10, 1);
  const offset = (page - 1) * limit;
  const paged = items.slice(offset, offset + limit);
  const meta = {
    total: items.length,
    page,
    limit,
    pages: Math.ceil(items.length / limit)
  };
  res.json(formatSuccess(paged, meta));
});

// GET /items/:id → single resource or 404 error envelope
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json(formatError('Item not found', 'ITEM_NOT_FOUND'));
  }
  res.json(formatSuccess(item));
});

// Global error handler to produce error envelopes
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = err.message || 'An unexpected error occurred';
  res.status(status).json(formatError(message, code, err.details));
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// 86 – API documentation with Swagger/OpenAPI: swagger-jsdoc, swagger-ui-express
//
// Swagger-jsdoc parses your JSDoc‐style comments into an OpenAPI (Swagger) specification.
// swagger-ui-express serves a hosted, interactive API docs UI based on that spec.
//
// Steps:
// 1. Install: npm install swagger-jsdoc swagger-ui-express  
// 2. Define a swaggerDefinition (info, servers, openapi version) and point to your route files.  
// 3. Annotate your routes with @openapi (or @swagger) JSDoc comments.  
// 4. Init swaggerJsdoc(options) to generate the spec, then mount swaggerUi.serve + swaggerUi.setup(spec).

const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// 1. Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    version: '1.0.0',
    description: 'Example API documented with Swagger/OpenAPI'
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Development server' }
  ]
};

// 2. Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['./**/*.js'] // adjust glob to match files with JSDoc annotations
};

// 3. Generate OpenAPI spec
const specs = swaggerJsdoc(options);

// 4. Serve Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A JSON array of user names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
app.get('/users', (req, res) => {
  res.json(['Alice', 'Bob', 'Carol']);
});

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 */
app.use(express.json());
app.post('/users', (req, res) => {
  const id = Date.now();
  res.status(201).json({ id, name: req.body.name });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Swagger UI available at http://localhost:3000/docs');
});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



// 87 – API documentation with Postman: creating collections, testing, generating docs
//
// • In Postman UI, group your endpoints into a Collection, adding titles and descriptions.
// • Define example requests and sample responses for each endpoint.
// • In the “Tests” tab of each request, write pm.test() scripts to assert status codes and response structure.
// • Export your Collection (v2.1) and Environment as JSON via “Export” → “Collection” / “Environment”.
// • Use Newman CLI to run the collection and generate HTML or JUnit reports.
// • Publish interactive docs directly from Postman or convert your collection to OpenAPI for other tools.
//
// Example 1: Writing tests in the Tests tab of a request
pm.test("Status code is 200", () => {
  pm.response.to.have.status(200);
});
pm.test("Response has an 'id' field", () => {
  const json = pm.response.json();
  pm.expect(json).to.have.property("id");
});

// Example 2: Running tests and exporting reports with Newman
newman run my-api.postman_collection.json \
  --environment my-api.postman_environment.json \
  --reporters cli,html,junit \
  --reporter-html-export newman-report.html \
  --reporter-junit-export newman-report.xml

// Example 3: Publishing documentation in Postman
// 1. Open your Collection in Postman.
// 2. Click “Publish Docs” in the top right.
// 3. Configure public/private settings and share the generated URL.

// Example 4: Converting Postman Collection to OpenAPI spec
npm install -g postman-to-openapi
postman-to-openapi my-api.postman_collection.json -o openapi.yaml


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// 88 – GraphQL API basics: Apollo Server setup, type definitions, resolvers
//
// • Install with: npm install apollo-server graphql
// • Define your schema using the GraphQL SDL via gql
// • Implement resolver functions matching your schema’s Query, Mutation, and type fields
// • Create and start an ApolloServer instance with your typeDefs and resolvers
//
// Example: simple in-memory books/authors API

import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type Query {
    books: [Book!]!
    authors: [Author!]!
    book(id: ID!): Book
    author(id: ID!): Author
  }

  type Mutation {
    addBook(title: String!, authorId: ID!): Book!
    addAuthor(name: String!): Author!
  }
`;

const authors = [
  { id: '1', name: 'J.K. Rowling' },
  { id: '2', name: 'J.R.R. Tolkien' },
];

const books = [
  { id: '1', title: 'Harry Potter and the Chamber of Secrets', authorId: '1' },
  { id: '2', title: 'The Fellowship of the Ring',           authorId: '2' },
];

const resolvers = {
  Query: {
    books:   () => books,
    authors: () => authors,
    book:    (_, { id }) => books.find(b => b.id === id),
    author:  (_, { id }) => authors.find(a => a.id === id),
  },
  Mutation: {
    addBook:   (_, { title, authorId }) => {
      const book = { id: String(books.length + 1), title, authorId };
      books.push(book);
      return book;
    },
    addAuthor: (_, { name }) => {
      const author = { id: String(authors.length + 1), name };
      authors.push(author);
      return author;
    },
  },
  Book: {
    author: book => authors.find(a => a.id === book.authorId),
  },
  Author: {
    books: author => books.filter(b => b.authorId === author.id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// 89 – GraphQL subscriptions: WebSockets, using graphql-ws or Apollo subscriptions
//
// Subscriptions enable real-time data delivery over WebSockets.
// Use the modern graphql-ws library (subscriptions-transport-ws is deprecated).
// Define a Subscription type in your schema and implement a resolver with PubSub.asyncIterator.
// Use graphql-subscriptions’ PubSub for simple in-memory pub/sub or a RedisPubSub for distributed setups.
// ApolloServer setup: create an executable schema, start HTTP server for queries/mutations,
// then spin up a WebSocketServer on the same schema for subscriptions.

// In-memory message store
const messages = [];

// 1. Define schema with Subscription
import { gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
  }

  type Query {
    messages: [Message!]!
  }

  type Mutation {
    postMessage(content: String!): Message!
  }

  type Subscription {
    messagePosted: Message!
  }
`;

// 2. Setup PubSub and resolvers
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

const resolvers = {
  Query: {
    messages: () => messages
  },
  Mutation: {
    postMessage: (_, { content }) => {
      const message = { id: String(messages.length + 1), content };
      messages.push(message);
      pubsub.publish('MESSAGE_POSTED', { messagePosted: message });
      return message;
    }
  },
  Subscription: {
    messagePosted: {
      subscribe: () => pubsub.asyncIterator('MESSAGE_POSTED')
    }
  }
};

// 3. Create executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// 4. Start ApolloServer for HTTP
import { ApolloServer } from 'apollo-server';
const server = new ApolloServer({ schema });
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// 5. Start WebSocket server for subscriptions
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const wsServer = new WebSocketServer({
  port: 4001,
  path: '/graphql'
});
useServer({ schema }, wsServer);

console.log('🚀 WebSocket server running at ws://localhost:4001/graphql');

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

// 90 – gRPC in Node.js: Protocol Buffers, grpc-node package, service definitions
//
// gRPC is a high-performance, open-source RPC framework using HTTP/2 and Protocol Buffers.
// Node.js support via @grpc/grpc-js and @grpc/proto-loader.
// Define services in .proto files, load them at runtime, implement server handlers, create clients.
// Supports unary calls, server streaming, client streaming, and bidirectional streaming.
//
// ——————————————————————————————————————————————————————————————
// Example 1: user.proto (Protocol Buffer definition)
// ——————————————————————————————————————————————————————————————
syntax = "proto3";
package user;

service UserService {
  rpc GetUser (GetUserRequest) returns (GetUserResponse);
  rpc ListUsers (ListUsersRequest) returns (stream User);
}

message GetUserRequest {
  int32 id = 1;
}

message GetUserResponse {
  User user = 1;
}

message ListUsersRequest {}

message User {
  int32 id    = 1;
  string name = 2;
  string email= 3;
}

// ——————————————————————————————————————————————————————————————
// Example 2: Server implementation (server.js)
// ——————————————————————————————————————————————————————————————
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('user.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const userProto = grpc.loadPackageDefinition(packageDef).user;

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob',   email: 'bob@example.com' }
];

function GetUser(call, callback) {
  const user = users.find(u => u.id === call.request.id);
  if (user) callback(null, { user });
  else callback({ code: grpc.status.NOT_FOUND, details: 'User not found' });
}

function ListUsers(call) {
  users.forEach(user => call.write(user));
  call.end();
}

const server = new grpc.Server();
server.addService(userProto.UserService.service, { GetUser, ListUsers });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('gRPC server running on 0.0.0.0:50051');
});

// ——————————————————————————————————————————————————————————————
// Example 3: Client implementation (client.js)
// ——————————————————————————————————————————————————————————————
const client = new userProto.UserService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

client.GetUser({ id: 1 }, (err, response) => {
  if (err) console.error('Error:', err);
  else console.log('GetUser response:', response.user);
});

const call = client.ListUsers({});
call.on('data', user => console.log('ListUsers stream:', user));
call.on('end', () => console.log('ListUsers stream ended'));
call.on('error', err => console.error('Stream error:', err));



//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////