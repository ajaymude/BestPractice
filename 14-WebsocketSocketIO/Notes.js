// emit is the create the event
// on is the listen the event
// io.on is the listen the event for the all user
// socket.on is the listen the event for the current user   
// socket.broadcast.emit is the listen the event for the all user except the current user
// io.emit is the listen the event for the all user including the current user

//socket.on("connect", () => {
//socket.emit("disconnect", () => {
// emit is the create the event
// on is the listen the event
// room is the group of the user
// socket.join("room1") is the join the room
// io.to("room1").emit("message", "Hello Room 1") is the send the message to the room
//