const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB using Mongoose
mongoose
  .connect("mongodb://localhost:27017/learningPlatform", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Add session middleware
app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/learningPlatform",
    }),
  })
);

// Set Pug as the view engine
app.set("view engine", "jade");
// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(authRoutes);
app.use(dashboardRoutes);

// Home page route (render Pug template)
app.get("/", (req, res) => {
  res.render("home");
});

// Login page route
app.get("/login", (req, res) => {
  res.render("login");
});

// Signup page route
app.get("/signup", (req, res) => {
  res.render("signup");
});

// Logout route (redirect to login)
app.get("/logout", (req, res) => {
  res.redirect("/login");
});

// Courses page route
app.get("/courses", (req, res) => {
  res.render("course");
});

// Start server
app.listen(3000, () => {
  console.log("Server is running at http://127.0.0.1:3000");
});
