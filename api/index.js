import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js";
import storeRoutes from "./routes/store.js"
import gameCopyRoutes from "./routes/gameCopy.js"
import gameRoutes from "./routes/game.js"

const app = express();

app.use(express.json());
dotenv.config()
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  next()
})

app.use("/api/auth", authRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/gameCopy", gameCopyRoutes);
app.use("/api/game", gameRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection succesful"))
  .catch((err) => console.log(err));

app.listen(9000, () => {
  console.log("Backend server is running");
});
