import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { loadEnvVariable } from "./config/env";
const PORT = loadEnvVariable().PORT;
const DB_URL = loadEnvVariable().MONGODB_URL;



(async function (url) {
  // recive parameter as url

  try {
    await mongoose.connect(url);
    console.log("DB CONNECTED");

     app.listen(PORT, () => {
      console.log(`server runing on this port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})(DB_URL);
// pass argument as ur
// 










// server shoutdown proces
