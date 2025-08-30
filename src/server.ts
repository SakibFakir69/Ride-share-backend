import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { loadEnvVariable } from "./config/env";
const PORT = loadEnvVariable().PORT;
const DB_URL = loadEnvVariable().MONGODB_URL;
import { Server } from "socket.io";

import http from 'http'
import cors from 'cors'
const server = http.createServer(app);



export const io = new Server(server,{

  cors:{
    origin:"*",
    methods:['GET',"POST"]
  }

});






(async function (url) {
  // recive parameter as url

  try {
    await mongoose.connect(url);
    console.log("DB CONNECTED");

     server.listen(PORT, () => {
      console.log(`server runing on this port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})(DB_URL);
// pass argument as ur
// 









