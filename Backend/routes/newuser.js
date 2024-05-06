const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

// Route to handle new user creation
router.post('/', (req, res) => {
    const { username, email, password } = req.body;
    console.log('Request body:', req.body);

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please provide username, email, and password.' });
    }

    const insertUserQuery = `
        INSERT INTO Users (username, email, password)
        VALUES (?, ?, ?);
    `;

    db.run(insertUserQuery, [username, email, password], function (err) {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ error: `Error creating user: ${err.message}` });
        }

        console.log(`User ${username} created successfully with ID ${this.lastID}`);
        res.status(201).json({ message: 'User created successfully.' });
    });
});

module.exports = router;
