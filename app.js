import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config();

/* ************* */
/* Local Imports */
/* ************* */

import connectDB from './config/db.js'
connectDB();

/* ************* */
/* Routes Import */
/* ************* */

import authRoute from './routes/authRoute.js'
// import postRoute from './routes/postRoute.js'
import travelRoute from './routes/travelRoute.js'

/* ***************** */
/* Express APP Logic */
/* ***************** */

const PORT = process.env.PORT || 8000;
const corsOption = {
    credentials: true,
    origin: [
        "*"
    ],
};

const app = express();

app.use(cors(corsOption))
app.use(cookieParser());
app.use(express.json());

// routes
app.use('/api/v1/auth', authRoute);
// app.use('/api/v1/post', postRoute);
app.use('/api/v1/travel', travelRoute);

app.listen(PORT, () => {
    console.log(`app is listening at port ${PORT}`);
})

// base
app.get("/", (req, res) => {
    res.status(200).json({ msg: "Wiz Out" });
});
