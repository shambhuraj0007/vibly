const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDb = require("./config/db");
require("dotenv").config();
const authRoute = require("./routes/authRoute");


const app = express();
app.use(express.json());
app.use(cookieParser());
// use hemet and express rate limit

connectDb();

//api routes
app.use('/auth', authRoute);


const PORT = 3000;
app.listen(PORT, () => console.log(`server listening on ${PORT}`));
