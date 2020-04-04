const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Route files
const quizzes = require("./routes/quizzes");
const users = require("./routes/users");
const words = require("./routes/words");
const auth = require("./routes/auth");
const reviews = require("./routes/reviews");

// Connect to db
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(logger);

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/api/v1/quizzes", quizzes);
app.use("/api/v1/users", users);
app.use("/api/v1/words", words);
app.use("/api/v1/auth", auth);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  // close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
