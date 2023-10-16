const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const connectDB = require("./config/db");
connectDB();
const authRoute = require("./routes/authRoute");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// routes
app.use('/api/v1/auth', authRoute);






app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
})

