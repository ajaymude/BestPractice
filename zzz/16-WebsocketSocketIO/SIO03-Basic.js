


// backend 

// npm install express socket.io cors


const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React client
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`🔴 User disconnected: ${socket.id}`);
  });
});

server.listen(5000, () => {
  console.log("🚀 Backend running at http://localhost:5000");
});













// frontend
// npm install socket.io-client


import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to backend

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    socket.emit("send_message", { message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data.message]);
    });

    // Clean up
    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>💬 Real-Time Chat</h2>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        <h4>Messages:</h4>
        <ul>
          {chat.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;













// reserved event 

// on for the event catch or for the listen 
// emit for the create the event 

// send for the send message 
socket.send('type your data here ');
socket.on('message',(data)=>{ console.log(data)})



// custom event 

socket.emit('custom_event_name', {msg:'you data is here '});
socket.on('custom_event_name', (data)=>{console.log(data)})




// broadcast 
io.socket.emit('broadcast', user);  // for the global data  for the all new as well as old user also 
socket.broadcast.emit('broadcast_for_existed_user', users); // for the existed user 



// namespace 
// it is like path for the routing 
// / is the default route for the name 


// const cnsp = io.of('/custom-path');
// cnsp.emit('conn', user)

// const socket= io('/custom-path')
// socket.on('conn', (data)=>{console.log(data)});





// rooms 
// one to one 
// group chat 

// 
socket.join('room1');
io.socket.in("room1").emit('room1msg', 'you are in room1 ');




//  error handling 
socket.on('connect_failde',(data)=>{console.log(data )});


