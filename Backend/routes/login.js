const express = require('express');
const router = express.Router();
const { db } = require('../config/database');
const cookieParser = require('cookie-parser');

// Use cookie-parser middleware
router.use(cookieParser());

// Route to handle user login
router.post('/', (req, res) => {
    const { email, password } = req.body;
    console.log('Login request body:', req.body);

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password.' });
    }

    const getUserQuery = `
        SELECT * FROM Users
        WHERE email = ? AND password = ?;
    `;

    db.get(getUserQuery, [email, password], (err, user) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: `Error fetching user: ${err.message}` });
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Set a cookie with 30-day expiration (in milliseconds)
        const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        res.cookie('auth_token', user.id, { expires: expiryDate, httpOnly: false });

        console.log('User logged in:', user);
        res.status(200).json({ message: 'Login successful.', user });
    });
});

module.exports = router;
