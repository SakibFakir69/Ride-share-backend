"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
// socket initilaization
server_1.io.on("connection", (socket) => {
    if (socket) {
        console.log("socket conncted");
    }
    socket.on("disconnect", () => {
        console.log("❌ Socket disconnected:", socket.id);
    });
});
