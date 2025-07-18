// require("dotenv").config({ path: "./env" });
import dotenve from "dotenv";
import connnectDB from "./db/index.js";
import { app } from "./app.js";

dotenve.config({
  path: "./env",
});

connnectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("MONGODB connection failed!!!"));

/*
import express from "express";
const app = express();

// ifi approach
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR", error);
      throw errors;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on PORT ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
})();
*/
