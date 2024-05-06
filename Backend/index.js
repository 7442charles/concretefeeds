const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db, createTables } = require('./config/database'); 
const newuserRoute = require('./routes/newuser');
const loginRoute = require('./routes/login');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Uncomment this line if using x-www-form-urlencoded

// Routes
app.use('/newuser', newuserRoute);
app.use('/login', loginRoute);

// Create tables if they don't exist
createTables();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
