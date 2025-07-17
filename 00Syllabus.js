
////////////////////////////////////////////////////////////////////

// Node.js Syllabus
// REPL
// fs
// path
// os
// http
// crypto
// events
// stream
// cluster
// worker_threads
// util

// events  , EventEmitter 
    // res.on('data', (chunk) => {
    //   console.log(`Received chunk: ${chunk}`);   
//   });
//   res.on('end', () => {
//     console.log('Response ended');
//   });

// stream

// timer , setTimeout, setInterval, clearTimeout, clearInterval
// non blocking  
// import/export of the moudules


////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// full stack project steps 


////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


// chat applicatino 

// project setup

// create the backend 
		// npm init -y
		// npm create vite@latest
		
// for the frontend 
		// frontend packages
				// toast
		// create a library for this , element component , page like this  
		//  dont repeat the css , always reuse the css , 
		// use the tailwind css for the styling 
		// use the proper color , combination so we can use easy switch the dark and light mode 
		// use the variable for the color 
		// create a seperate file for the routing , folder , handle there all  the navigation logic , protected route
		
		
		
		
// for the backend 
		// middleware packages 
				// cors , morgon , helmet , cookie-parsor , compression , express-fileupload , express-mongo-sanitize
		// handle the error properly , dev error , prod error , global error handler , what is the use of the next middleware 
		// validation package 
				// use the express-validator package for the validating the incoming data from the frontend 
		// use the error  loger  to  store the , like the 
		// use the async wrapper to avoit  the try catch repitaton  
		// use the mongooe , pre middleware for the password save , use the mongoose.method also 
				// use the mongoose validator for the creating the schema to validate the data 
		// create the two script for the dev and the prod 
		// handle the uncaughtException . unhandledRejection  , in  the index.js file 
		// auth 
				// create a user model 
				// use the accessToken and the refreshToken logic , use the mongoose method
				// -   to generate the token save the token in the cookies , use the jwt for the token 
				// use the bcrupt for the protecting the password 
				// use the bcrupt with the mongoosse method for the compare and save the password 
				// list of api for auth , signup , signin, singout , getuser  , refreshToken, 
				// use the auth middleware for the validating  the user 
				// use the cluster for the handling the multiple request at the same time
                // use the pm2 for the managing the node js application

				

// project strucure  , 
// project name 
		// backend src
				// controllers
				// models
				// routes
				// configs
				// middlewares 
				// utils 
				// services 
				// index.js 
		    // app.js 	
		// client 
				// src
						// library
								// element 
								
						// component 
						// page 
						// hooks
						// store , it should have the  rtk query , for the calling the api , all state management 
						// routes 
						// main.js
						// App.js
						// index.js 
		// package.json
		
		
		
		// redux setup 
				// configureStore, conbineReducers , createSlice , reducers , extraReducres , asyncThunk 
				// Provider , store 
				// redux persist , for the data store , persistReducer , persistStore 
				// useSelector , useDispatch , 
		
		
		
	
		// socket.io setup 
		
		// create a two file for the socket.io , and app.js it maintain the index.js file 
		
		// how to create the socket.io server 
		const { Server } = require('socket.io');
		const server = http.createServer(app);
		const io = new Server(server);  // attach socket.io to the HTTP server
		// Listen for connections
		io.on('connection', (socket) => {
	  console.log('A user connected:', socket.id);

  // listen to custom event
  socket.on('chat message', (msg) => {
    console.log('Message: ', msg);
    // send to all connected clients
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});



// on means the define a fuction 
// emit means call a function 

// io.on('connection', (socket) => {  // it is the use for the create the connection 
// socket.on('disconnect', () => {   // it is use for the socket disconnection 
// io.emit()  //  broadcast to all connected client 
// socket.it  // unique id for the each connected client 
// socket.broadcast.emit('user joined', 'A new user joined!');  // send all except the sender 
// io.emit('announcement', 'Server maintenance soon!'); // emit to all client 
// Namespaces: create multiple channels of communication
// Rooms: group clients and send messages to specific rooms
// Middleware: authenticate sockets before connection
// Scaling: using Redis Adapter for multiple servers
// Error Handling
//   socket.join('chatRoom')  // join to a room
//  socket.leave(roomName) — Removes the socket from the room.
// io.to(roomName).emit() — Sends to everyone in that room.
// socket.to(roomName).emit() — Sends to everyone in the room except the sender.
// socket.in(conversation).emit("typing", conversation);  //  It excludes the current socket (sender) from receiving the event.
// 


// logic for the track history of online user 
	
	let onlineUsers = [];
    //add joined user to online users
    if (!onlineUsers.some((u) => u.userId === user)) {
      onlineUsers.push({ userId: user, socketId: socket.id });
    }
		
		
		
		// topic to learn 
				// how to upload file from  the frontend  and how to save the file in the backend .
				// - learn about the how to save the uploaded file in the cloudinory or the any service 
				// - aws or blob storage 
				// 
​

		
		
		
		// topic to learn 
				// how to upload file from  the frontend  and how to save the file in the backend .
				// - learn about the how to save the uploaded file in the cloudinory or the any service 
				// - aws or blob storage 
				// learn about the node js clustering
                // - how to use the node js clustering to handle the multiple request at the same time
                // - how to use the pm2 to manage the node js application   
                // learn about the the pagination and the sorting in the mongodb
                // - how to use the mongoose-paginate-v2 package for the pagination and the
                // - how to use the mongoose-aggregate-paginate-v2 package for the pagination and the sorting
                // - how to use the mongoose-aggregate-paginate-v2 package for the pagination
                // 