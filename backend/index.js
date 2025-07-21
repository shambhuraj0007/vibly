const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDb = require("./config/db");
require("dotenv").config();

const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/PostRoute");
const userRoute = require("./routes/userRoute");
const passport = require('./controllers/googleController');

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS Setup
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
const allowedOrigins = [
  "https://vibly-iota.vercel.app",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// Connect to DB
connectDb();
app.use(passport.initialize());

// ✅ API Routes
app.use('/auth', authRoute);
app.use('/posts', postRoute);
app.use('/users', userRoute);
app.use('/api/stories', postRoute); // ✅ Now your delete endpoint will work

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server listening on ${PORT}`));
