import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

import dotenv from "dotenv";
dotenv.config();

/* ************* */
/* Local Imports */
/* ************* */

import SocketService from "./services/socketService.js";
import connectDB from "./config/db.js";
connectDB();
const socketService = new SocketService();

/* ************* */
/* Routes Import */
/* ************* */

import authRoute from "./routes/authRoute.js";
// import postRoute from './routes/postRoute.js'
import travelRoute from "./routes/travelRoute.js";

/* ***************** */
/* Express APP Logic */
/* ***************** */

const PORT = process.env.PORT || 8000;
const corsOption = {
  credentials: true,
  origin: ["*"],
};

const app = express();

app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/v1/auth", authRoute);
// app.use('/api/v1/post', postRoute);
app.use("/api/v1/travel", travelRoute);

const server = http.createServer(app);
socketService.io.attach(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

socketService.initListeners();

// base
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Wiz Out" });
});
