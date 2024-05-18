const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

// Route to handle receiving time spent data
router.post('/', (req, res) => {
    const { timeSpent } = req.body;
    const date = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format

    // Log the received time spent data
    console.log('Time spent data received:', timeSpent);

    const insertOrUpdateQuery = `
        INSERT INTO Retention (date, total_minutes)
        VALUES (?, ?)
        ON CONFLICT(date) DO UPDATE SET total_minutes = total_minutes + ?;
    `;

    db.run(insertOrUpdateQuery, [date, timeSpent, timeSpent], function(err) {
        if (err) {
            console.error('Error updating retention data:', err);
            return res.status(500).json({ error: `Error updating retention data: ${err.message}` });
        }

        res.status(200).json({ message: 'Time spent data received and updated successfully' });
    });
});

module.exports = router;
