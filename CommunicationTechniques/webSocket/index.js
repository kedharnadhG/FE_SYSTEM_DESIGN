const express = require("express");
const {createServer} =require('node:http');
const {join} = require("node:path");
const {Server} = require("socket.io");

const app = express();
const server = createServer(app);

const io = new Server(server); //creating a socket server (ip-op instance) (to this we have to pass the http server, so that it creates like an wrapper on top of the http server, so that anything happens on http-server, it can also leverage)

// Serve the HTML file when user accesses root URL
app.get('/', (req, res) => {
    res.sendFile( join(__dirname, 'index.html'));
})

//(we are listening to the connection which is happening on websocket)(once ws connection happens we will get a socket object)(using that socket we can listen to the any events which are coming from the client)
io.on("connection", (socket)=> {
    console.log("Connection established");    //once a connc is established, (if client/server) anyone is requesting to the server it will create a ws connection (socket) on the root path (/) itself

    //once the connc is established, we wanted to listen to some activity (something which is send from the client)

    //if someone says, eventName is "chat message", please do something
    //if there is a chat message, we want to broadcast/circulate that message to all the connected users (clients)

    // ("chat message" (it could be anything i.e a CUSTOM EVENTS) -> listening to any input-message &)

    //from the client saying that "chat message", & on the server i am listening "chat message" & sending back "chat message" as a event to everyone
    socket.on("chat message", (msg) => {
        console.log('received message in server >', msg);

        io.emit("chat message", msg); // this will broadcast the message to all the connected clients
    })



    //if any dis-connection occurs
    socket.on("disconnect", () => {
        console.log("user disconnected");
    })

})

server.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})