const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Route files
const quizzes = require('./routes/quizzes');
const users = require('./routes/users');
const words = require('./routes/words');

// Connect to db
connectDB();

const app = express();

// Body parser
app.use(express.json());


// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(logger);

// Mount routers
app.use('/api/v1/quizzes', quizzes);
app.use('/api/v1/users', users);
app.use('/api/v1/words', words);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    // close server and exit process
    server.close(() => {
        process.exit(1);
    })
});