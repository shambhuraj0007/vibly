const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDb = require("./config/db");
require("dotenv").config();
const authRoute = require("./routes/authRoute");
const postRoute=require("./routes/PostRoute")
const userRoute=require("./routes/userRoute");
const passport = require('./controllers/googleController'); // Import the Google authentication controller



const app = express();
app.use(express.json());
app.use(cookieParser());
// use hemet and express rate limit



// Enable CORS to allow requests from the frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true, // Allow cookies to be sent
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

// Connect to MongoDB
connectDb();
app.use(passport.initialize());

//api routes
app.use('/auth', authRoute);
app.use('/users',postRoute)
app.use('/users',userRoute);

PORT = process.env.PORT;
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
