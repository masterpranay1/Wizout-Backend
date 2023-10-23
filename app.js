const express = require("express");
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config();

const postRoute = require("./routes/postRoute");
const authRoute = require("./routes/authRoute");

const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;
const corsOption = {
    credentials: true,
    origin: [
        "*"
    ],
};

// routes
app.use(cors(corsOption))
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/post', postRoute);

app.listen(PORT, () => {
    console.log(`app is listening at port ${PORT}`);
})

// base
app.get("/", (req, res) => {
    res.status(200).json({ msg: "Wiz Out" });
});
