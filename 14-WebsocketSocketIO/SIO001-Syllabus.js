// ======================
// Socket.IO Full Syllabus
// (Beginner to Expert)
// ======================

// 📘 BASICS & SETUP
// 01 - What is Socket.IO and when to use it
// 02 - Differences between WebSockets, long polling, and Server-Sent Events
// 03 - Installing Socket.IO: npm install socket.io socket.io-client
// 04 - Basic server setup: creating an HTTP server and attaching Socket.IO
// 05 - Basic client setup: including socket.io-client in browser or Node.js
// 06 - Version compatibility: matching server and client versions
// 07 - Debugging with DEBUG=socket.io* environment variable
// 08 - CORS configuration for cross-origin connections

// 🔤 CORE CONCEPTS & ARCHITECTURE
// 09 - Engine.IO vs Socket.IO: transport layer abstraction
// 10 - The handshake and upgrade process: polling → WebSocket
// 11 - Heartbeats and timeouts: pingInterval, pingTimeout
// 12 - Acknowledgements: callback functions for reliable delivery
// 13 - Built-in events: connect, disconnect, error, reconnect, reconnect_attempt

// 🔄 EVENTS & COMMUNICATION
// 14 - Emitting events from server to client: socket.emit()
// 15 - Listening for events on client: socket.on()
// 16 - Broadcasting to all clients: io.emit()
// 17 - Emitting to all except sender: socket.broadcast.emit()
// 18 - Emitting to a specific socket ID
// 19 - Volatile emits: socket.volatile.emit() for best-effort messages
// 20 - Binary data support: sending ArrayBuffers, Blobs
// 21 - Custom event payloads: JSON structures, nested data

// 🔀 NAMESPACES & ROOMS
// 22 - Namespaces: logical separation under different URIs
// 23 - Default namespace (‘/’) vs custom namespaces
// 24 - Handling middleware per namespace
// 25 - Joining and leaving rooms: socket.join(room), socket.leave(room)
// 26 - Broadcasting to a room: io.to(room).emit()
// 27 - Omitting rooms: socket.broadcast.to(room).emit()
// 28 - Getting a list of clients in a room: io.in(room).allSockets()
// 29 - Creating private and public rooms, cleaning up empty rooms

// 💬 MIDDLEWARE & AUTHENTICATION
// 30 - Using middleware on connection: io.use((socket,next) => { … })
// 31 - Authenticating on handshake: parsing token from query or headers
// 32 - Rejecting unauthorized connections: next(new Error('unauthorized'))
// 33 - Per-namespace and per-room auth strategies
// 34 - Rate-limiting events via middleware

// ⚙️ SERVER-SIDE IMPLEMENTATION
// 35 - Integrating with Express/Koa/Hapi: sharing HTTP server
// 36 - Scaling across multiple nodes: Sticky sessions requirement
// 37 - Using Redis adapter for horizontal scaling: socket.io-redis
// 38 - Alternative adapters: NATS, Kafka, MQTT
// 39 - Capturing and handling disconnect reasons
// 40 - Graceful shutdown: closing sockets on server stop
// 41 - Serving static files over the same HTTP server
// 42 - Namespaced event handlers: io.of('/chat').on('connection', …)

– Note: numbering continues…

// 🌐 CLIENT-SIDE IMPLEMENTATION
// 43 - Connecting from browser: const socket = io(url, options)
// 44 - Connecting from Node.js: const socket = require('socket.io-client')(url)
// 45 - Connection options: reconnection, reconnectionAttempts, transports
// 46 - Handling reconnection logic and exponential backoff
// 47 - Joining rooms from client-side using custom events
// 48 - Emitting events with acknowledgement: socket.emit('event', data, ack => { … })
// 49 - Handling binary data on client
// 50 - Disconnecting manually: socket.disconnect()

// 🔄 SCALING & DEPLOYMENT
// 51 - Why sticky sessions matter for Socket.IO
// 52 - Configuring NGINX/HAProxy for WebSocket proxying
// 53 - Deploying on Kubernetes: ConfigMaps, Services with ws support
// 54 - Using socket.io-redis adapter for Pub/Sub across pods
// 55 - Monitoring cluster health and socket counts
// 56 - Using a message broker (RabbitMQ/Kafka) as an adapter

// 🛠 INTEGRATION & EXTENSIONS
// 57 - Integrating with Passport.js for session-based auth
// 58 - Using JWT tokens in handshake
// 59 - Integrating with GraphQL subscriptions vs Socket.IO
// 60 - Building a chat application: event design, message persistence
// 61 - Real-time notifications: push notifications via Socket.IO
// 62 - Collaborative editing use case: operational transform or CRDT integration

// 📝 MONITORING & DEBUGGING
// 63 - Logging connection and event flows
// 64 - Emitting connection metrics to Prometheus
// 65 - Using Grafana to visualize socket metrics
// 66 - Debugging handshake failures
// 67 - Inspecting WebSocket frames in browser DevTools

// 🔒 SECURITY & BEST PRACTICES
// 68 - Validating and sanitizing event data
// 69 - Preventing unauthorized room joins
// 70 - Throttling event emissions to prevent DoS
// 71 - Securing transports: enforce WebSocket only
// 72 - Using HTTPS/WSS to encrypt traffic

// 🧪 TESTING & QUALITY ASSURANCE
// 73 - Unit testing socket handlers with sinon or jest mocks
// 74 - Integration testing with supertest and socket.io-client
// 75 - Simulating network failures and reconnections
// 76 - Load testing with custom scripts or artillery.io
// 77 - Validating message order and delivery guarantees

// 🚀 PERFORMANCE OPTIMIZATION
// 78 - Minimizing event payload sizes
// 79 - Using rooms for targeted broadcasts
// 80 - Avoiding memory leaks: cleaning up event listeners on disconnect
// 81 - Leveraging volatile emits for non-critical updates
// 82 - Offloading heavy work to worker threads or separate services

// 🌐 FRAMEWORK & LIBRARY INTEGRATIONS
// 83 - NestJS Socket.IO module: decorators and gateways
// 84 - Integrating with React (useEffect, context for socket)
– Continues numbering…

// ⚙️ TYPE SCRIPTING SUPPORT
// 85 - Installing types: npm install --save-dev @types/socket.io @types/socket.io-client
// 86 - Typing custom events: interface SocketEvents { … }
// 87 - Using generics for typed emits and on handlers
// 88 - Integrating with NestJS for typed gateways
// 89 - VSCode IntelliSense for Socket.IO methods

// 🏆 CAREER & COMMUNITY
// 90 - Common interview questions on WebSockets vs Socket.IO
// 91 - Contributing to the Socket.IO GitHub repo
// 92 - Following Socket.IO changelog and RFCs
// 93 - Exploring alternative real-time frameworks: ws, uWebSockets.js, Faye
// 94 - Building open-source Socket.IO plugins
// 95 - Participating in Socket.IO community on GitHub and Discord

// — END OF SOCKET.IO SYLLABUS —  






// ======================
// Socket.IO Full Syllabus
// (Beginner to Expert)
// ======================

// 📘 BASICS & SETUP
// 01 - What is Socket.IO and when to use it
// 02 - Differences between WebSockets, long polling, and Server-Sent Events
// 03 - Installing Socket.IO: npm install socket.io socket.io-client
// 04 - Basic server setup: creating an HTTP server and attaching Socket.IO
// 05 - Basic client setup: including socket.io-client in browser or Node.js
// 06 - Version compatibility: matching server and client versions
// 07 - Debugging with DEBUG=socket.io* environment variable
// 08 - CORS configuration for cross-origin connections

// 🔤 CORE CONCEPTS & ARCHITECTURE
// 09 - Engine.IO vs Socket.IO: transport layer abstraction
// 10 - The handshake and upgrade process: polling → WebSocket
// 11 - Heartbeats and timeouts: pingInterval, pingTimeout
// 12 - Acknowledgements: callback functions for reliable delivery
// 13 - Built-in events: connect, disconnect, error, reconnect, reconnect_attempt

// 🔄 EVENTS & COMMUNICATION
// 14 - Emitting events from server to client: socket.emit()
// 15 - Listening for events on client: socket.on()
// 16 - Broadcasting to all clients: io.emit()
// 17 - Emitting to all except sender: socket.broadcast.emit()
// 18 - Emitting to a specific socket ID
// 19 - Volatile emits: socket.volatile.emit() for best-effort messages
// 20 - Binary data support: sending ArrayBuffers, Blobs
// 21 - Custom event payloads: JSON structures, nested data

// 🔀 NAMESPACES & ROOMS
// 22 - Namespaces: logical separation under different URIs
// 23 - Default namespace (‘/’) vs custom namespaces
// 24 - Handling middleware per namespace
// 25 - Joining and leaving rooms: socket.join(room), socket.leave(room)
// 26 - Broadcasting to a room: io.to(room).emit()
// 27 - Omitting rooms: socket.broadcast.to(room).emit()
// 28 - Getting a list of clients in a room: io.in(room).allSockets()
// 29 - Creating private and public rooms, cleaning up empty rooms

// 💬 MIDDLEWARE & AUTHENTICATION
// 30 - Using middleware on connection: io.use((socket,next) => { … })
// 31 - Authenticating on handshake: parsing token from query or headers
// 32 - Rejecting unauthorized connections: next(new Error('unauthorized'))
// 33 - Per-namespace and per-room auth strategies
// 34 - Rate-limiting events via middleware

// ⚙️ SERVER-SIDE IMPLEMENTATION
// 35 - Integrating with Express/Koa/Hapi: sharing HTTP server
// 36 - Scaling across multiple nodes: Sticky sessions requirement
// 37 - Using Redis adapter for horizontal scaling: socket.io-redis
// 38 - Alternative adapters: NATS, Kafka, MQTT
// 39 - Capturing and handling disconnect reasons
// 40 - Graceful shutdown: closing sockets on server stop
// 41 - Serving static files over the same HTTP server
// 42 - Namespaced event handlers: io.of('/chat').on('connection', …)

– Note: numbering continues…

// 🌐 CLIENT-SIDE IMPLEMENTATION
// 43 - Connecting from browser: const socket = io(url, options)
// 44 - Connecting from Node.js: const socket = require('socket.io-client')(url)
// 45 - Connection options: reconnection, reconnectionAttempts, transports
// 46 - Handling reconnection logic and exponential backoff
// 47 - Joining rooms from client-side using custom events
// 48 - Emitting events with acknowledgement: socket.emit('event', data, ack => { … })
// 49 - Handling binary data on client
// 50 - Disconnecting manually: socket.disconnect()

// 🔄 SCALING & DEPLOYMENT
// 51 - Why sticky sessions matter for Socket.IO
// 52 - Configuring NGINX/HAProxy for WebSocket proxying
// 53 - Deploying on Kubernetes: ConfigMaps, Services with ws support
// 54 - Using socket.io-redis adapter for Pub/Sub across pods
// 55 - Monitoring cluster health and socket counts
// 56 - Using a message broker (RabbitMQ/Kafka) as an adapter

// 🛠 INTEGRATION & EXTENSIONS
// 57 - Integrating with Passport.js for session-based auth
// 58 - Using JWT tokens in handshake
// 59 - Integrating with GraphQL subscriptions vs Socket.IO
// 60 - Building a chat application: event design, message persistence
// 61 - Real-time notifications: push notifications via Socket.IO
// 62 - Collaborative editing use case: operational transform or CRDT integration

// 📝 MONITORING & DEBUGGING
// 63 - Logging connection and event flows
// 64 - Emitting connection metrics to Prometheus
// 65 - Using Grafana to visualize socket metrics
// 66 - Debugging handshake failures
// 67 - Inspecting WebSocket frames in browser DevTools

// 🔒 SECURITY & BEST PRACTICES
// 68 - Validating and sanitizing event data
// 69 - Preventing unauthorized room joins
// 70 - Throttling event emissions to prevent DoS
// 71 - Securing transports: enforce WebSocket only
// 72 - Using HTTPS/WSS to encrypt traffic

// 🧪 TESTING & QUALITY ASSURANCE
// 73 - Unit testing socket handlers with sinon or jest mocks
// 74 - Integration testing with supertest and socket.io-client
// 75 - Simulating network failures and reconnections
// 76 - Load testing with custom scripts or artillery.io
// 77 - Validating message order and delivery guarantees

// 🚀 PERFORMANCE OPTIMIZATION
// 78 - Minimizing event payload sizes
// 79 - Using rooms for targeted broadcasts
// 80 - Avoiding memory leaks: cleaning up event listeners on disconnect
// 81 - Leveraging volatile emits for non-critical updates
// 82 - Offloading heavy work to worker threads or separate services

// 🌐 FRAMEWORK & LIBRARY INTEGRATIONS
// 83 - NestJS Socket.IO module: decorators and gateways
// 84 - Integrating with React (useEffect, context for socket)
– Continues numbering…

// ⚙️ TYPE SCRIPTING SUPPORT
// 85 - Installing types: npm install --save-dev @types/socket.io @types/socket.io-client
// 86 - Typing custom events: interface SocketEvents { … }
// 87 - Using generics for typed emits and on handlers
// 88 - Integrating with NestJS for typed gateways
// 89 - VSCode IntelliSense for Socket.IO methods

// 🏆 CAREER & COMMUNITY
// 90 - Common interview questions on WebSockets vs Socket.IO
// 91 - Contributing to the Socket.IO GitHub repo
// 92 - Following Socket.IO changelog and RFCs
// 93 - Exploring alternative real-time frameworks: ws, uWebSockets.js, Faye
// 94 - Building open-source Socket.IO plugins
// 95 - Participating in Socket.IO community on GitHub and Discord

// — END OF SOCKET.IO SYLLABUS —  



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
01 - What is Socket.IO and when to use it

🔸 What is Socket.IO?
Socket.IO is a JavaScript library that enables real-time, bidirectional, and event-based communication between web clients and servers.

It is built on top of WebSockets but adds extra features such as:
✅ Automatic reconnections
✅ Broadcasting to multiple clients
✅ Support for rooms and namespaces
✅ Fallback to HTTP long-polling when WebSocket is not available
✅ Middleware support for authentication

Socket.IO uses a server-side package (`socket.io`) and a client-side package (`socket.io-client`).

📦 Server: `npm install socket.io`
📦 Client: `npm install socket.io-client`

🔸 Architecture
Socket.IO is built on top of Engine.IO, which handles the underlying transport layer (polling or WebSockets).
This allows Socket.IO to provide more reliability and compatibility than raw WebSocket implementations.

🔸 When to use Socket.IO?
Use it when your app needs **real-time updates** between server and client, such as:

📌 Chat applications
📌 Live notifications (e.g. social media, email, dashboard alerts)
📌 Collaborative tools (e.g. Google Docs-style editors)
📌 Real-time games
📌 Live location tracking
📌 Stock/crypto price updates
📌 IoT dashboards and sensor data streaming

🔸 When NOT to use it?
If your app does **not** need continuous two-way communication or real-time updates, then using traditional REST APIs or GraphQL might be a better choice due to simplicity and scalability.

*/

/*
🎯 Scenario: You're building a chat application.

🧩 Using raw WebSocket (without Socket.IO):
- You have to manually:
  ✅ Handle reconnection logic if the socket closes
  ✅ Implement your own message format and event system
  ✅ Handle heartbeats (ping/pong) to detect disconnected clients
  ✅ Manage rooms/groups manually (like broadcasting to "chat rooms")
  ✅ Ensure compatibility across browsers with fallback options

💡 This can be error-prone and time-consuming.

🚀 Using Socket.IO:
- You get all of the above features automatically:
  ✅ Built-in reconnect logic
  ✅ Event-based messaging: `socket.emit('chat', data)`
  ✅ Built-in heartbeat (pingInterval, pingTimeout)
  ✅ Rooms and namespaces for broadcasting
  ✅ Fallbacks to long polling if WebSockets are blocked or unsupported
  ✅ Debugging with `DEBUG=socket.io*`

✅ Example Code:

// Server
const io = require("socket.io")(3000);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat", (message) => {
    io.emit("chat", message); // Broadcast to all
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Client
const socket = io("http://localhost:3000");

socket.on("chat", (msg) => {
  console.log("New message:", msg);
});

socket.emit("chat", "Hello everyone!");

📌 With just a few lines, you have:
- Real-time messaging
- Automatic reconnection
- Broadcasting
- Event handling
- Disconnection tracking
*/

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
02 - Differences between WebSockets, long polling, and Server-Sent Events

🔹 WebSocket
  • Full–duplex, persistent TCP connection between client and server.
  • Truly bidirectional: both sides can push at any time.
  • Low overhead after handshake (single HTTP Upgrade request).
  • Built-in ping/pong heartbeats.
  • Use when you need high-frequency, low-latency, two-way communication (e.g., multiplayer games, live chat).

🔹 Long Polling
  • Client sends an HTTP request; server holds it until there’s new data or a timeout.
  • After response, client immediately sends a new request.
  • Emulates “push” over plain HTTP—no persistent socket.
  • Higher overhead (many HTTP requests).
  • Use when WebSockets aren’t available or you need to support older proxies/firewalls.

🔹 Server-Sent Events (SSE)
  • Unidirectional, persistent connection: server → client only.
  • Uses HTTP “text/event-stream” MIME type.
  • Automatic reconnection support built into browsers.
  • Lower overhead than long polling, but client cannot send messages—must use separate HTTP POST.
  • Ideal for live news feeds, stock tickers, log streaming where only server pushes are needed.

📊 Comparison
  • Directionality: WebSocket (↔), Long Polling (↔ but request-response), SSE (→ only)
  • Overhead: WebSocket (low), SSE (medium), Long Polling (high)
  • Browser support: SSE (EventSource API), WebSocket (WebSocket API), Long Polling (XHR/fetch)
  • Firewalls/proxies: WebSocket may be blocked; long polling/SSE more likely to work.

✔️ When to choose:
  – **WebSocket** for rich interactive apps needing two-way real time.
  – **Long Polling** for maximum compatibility if WebSocket/SSE fail.
  – **SSE** for server-to-client streams where client interactivity is minimal.
*/

// — Examples —

// WebSocket example (Node.js server + browser client)

// Server (ws library)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('message', msg => {
    console.log('Received:', msg);
    ws.send(`Echo: ${msg}`); // two-way
  });
  ws.on('close', () => console.log('Client disconnected'));
});

// Client (browser)
const ws = new WebSocket('ws://localhost:8080');
ws.onopen   = () => ws.send('Hello Server');
ws.onmessage = e => console.log('Server says:', e.data);


// Long Polling example (Express + fetch)

// Server
const express = require('express');
const app = express();
let latestData = 'Initial';
app.get('/poll', (req, res) => {
  // simulate waiting for new data
  setTimeout(() => res.json({ data: latestData }), 10000);
});
app.post('/update', express.json(), (req, res) => {
  latestData = req.body.data;
  res.sendStatus(204);
});
app.listen(3000);

// Client (browser)
async function poll() {
  const res = await fetch('/poll');
  const { data } = await res.json();
  console.log('Polled data:', data);
  poll(); // immediately poll again
}
poll();


// Server-Sent Events example (Express + EventSource)

// Server
const express = require('express');
const app = express();
app.get('/events', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  let counter = 0;
  const iv = setInterval(() => {
    res.write(`data: message ${++counter}\n\n`);
  }, 2000);
  req.on('close', () => clearInterval(iv));
});
app.listen(4000);

// Client (browser)
const es = new EventSource('http://localhost:4000/events');
es.onmessage = e => console.log('SSE message:', e.data);

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/*
03 - Installing Socket.IO in a MERN Application

Theory:
• You need two packages:
    – socket.io        (server-side)
    – socket.io-client (client-side)
• In a MERN app you’ll install on both:
    – /server   (Express + Socket.IO server)
    – /client   (React + socket.io-client)
• Ensure matching versions in both package.json files to avoid protocol mismatches.
*/

// =========================
// SERVER SIDE (server/server.js)
// =========================

const express = require("express");        // Express framework
const http = require("http");              // HTTP server
const { Server } = require("socket.io");   // Socket.IO server class

const app = express();
const server = http.createServer(app);     // attach Express app
const io = new Server(server, {
  cors: { origin: "*" }                   // allow all origins (for dev)
});

io.on("connection", socket => {
  console.log("✅ Client connected:", socket.id);

  // handle disconnection
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));


// =========================
// CLIENT SIDE (client/src/App.jsx)
// =========================

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";   // Socket.IO client library

const SOCKET_SERVER_URL = "http://localhost:5000";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // establish connection
    const newSocket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"]           // force WebSocket transport
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("🔗 Connected to server with ID:", newSocket.id);
    });

    // cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>🔌 MERN + Socket.IO</h1>
      {socket 
        ? <p>Socket ID: {socket.id}</p> 
        : <p>Connecting to server...</p>}
    </div>
  );
}

export default App;


// how to setup the socket with the express.js (backend)


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
