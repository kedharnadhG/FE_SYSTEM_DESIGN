# 1:1 Private Chat with Socket.IO - Detailed Guide

This guide explains how to implement a private 1-on-1 chat system using Socket.IO in Node.js and JavaScript. It also shows how to simulate multiple clients without creating multiple HTML files.

---

## Step 1: Setup the Server with Express and Socket.IO

Create a basic server using Express and integrate it with Socket.IO.

```js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public"))); // Serve client files

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

### Explanation:

* `express` sets up a basic server.
* `http.createServer(app)` creates a raw HTTP server to attach Socket.IO.
* `io = new Server(server)` attaches WebSocket functionality.
* `express.static` is used to serve your HTML/JS files from the `public` directory.

---

## Step 2: Track Connected Users

Maintain a map of userIds to their socket IDs for private communication.

```js
const users = new Map();

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  // Register user
  socket.on("register", (userId) => {
    users.set(userId, socket.id);
    console.log(`Registered user: ${userId} with socket ID: ${socket.id}`);
  });

  // Private messaging
  socket.on("private message", ({ to, message, from }) => {
    const targetSocketId = users.get(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit("private message", { from, message });
    } else {
      socket.emit("user not found", to);
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    for (const [userId, sockId] of users.entries()) {
      if (sockId === socket.id) {
        users.delete(userId);
        console.log(`User ${userId} disconnected.`);
        break;
      }
    }
  });
});
```

---

## Step 3: Client-Side Implementation

Create a single HTML file that lets you choose a username and target user dynamically.

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>1:1 Private Chat</title>
  <script src="/socket.io/socket.io.js"></script>
</head>
<body>
  <h2>1:1 Chat</h2>
  <label>Your ID: <input type="text" id="myId" /></label><br/>
  <button onclick="registerUser()">Register</button><br/><br/>

  <label>Send To: <input type="text" id="targetId" /></label><br/>
  <input type="text" id="message" placeholder="Type message..." />
  <button onclick="sendMessage()">Send</button>

  <ul id="messages"></ul>

  <script>
    const socket = io();

    function registerUser() {
      const myId = document.getElementById("myId").value;
      socket.emit("register", myId);
    }

    function sendMessage() {
      const to = document.getElementById("targetId").value;
      const message = document.getElementById("message").value;
      const from = document.getElementById("myId").value;
      socket.emit("private message", { to, message, from });
    }

    socket.on("private message", ({ from, message }) => {
      const msgList = document.getElementById("messages");
      const item = document.createElement("li");
      item.textContent = `From ${from}: ${message}`;
      msgList.appendChild(item);
    });

    socket.on("user not found", (userId) => {
      alert(`User ${userId} not found.`);
    });
  </script>
</body>
</html>
```

### Explanation:

* Register a user by ID using an input field.
* Target any user by ID and send them a private message.
* One HTML file can simulate multiple users by opening it in multiple tabs or browsers.

---

## ✅ Summary Checklist

| Step                  | Description                                          |
| --------------------- | ---------------------------------------------------- |
| Setup Server          | Express + HTTP + Socket.IO                           |
| Track Users           | Map userId to socket.id                              |
| Send Private Messages | Use userId to emit to specific sockets               |
| Client HTML           | Single HTML handles registration, messaging, display |
| Multiple Clients      | Open multiple tabs/windows to simulate users         |

---

## How to Simulate Multiple Clients

You **do not** need multiple HTML files.

**Steps:**

1. Open the same HTML file in different tabs or incognito windows.
2. Register each with a different `userId` (e.g., `user1`, `user2`).
3. Use the input fields to send private messages between them.

This method is efficient and easy for testing private messaging!

You now have a complete, working 1-on-1 real-time chat system using Socket.IO!
