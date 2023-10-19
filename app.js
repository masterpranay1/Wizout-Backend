const express = require("express");
const app = express();
const cookieParser=require('cookie-parser')
app.use(cookieParser());
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const connectDB = require("./config/db");
const bcrypt =require('bcrypt');
connectDB();
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/post', postRoute);





app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
})

