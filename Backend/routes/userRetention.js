const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

// Route to get total user retention per day
router.get('/', (req, res) => {
    const getRetentionQuery = `
        SELECT * FROM Retention ORDER BY date DESC;
    `;

    db.all(getRetentionQuery, (err, rows) => {
        if (err) {
            console.error('Error retrieving retention data:', err);
            return res.status(500).json({ error: `Error retrieving retention data: ${err.message}` });
        }

        res.status(200).json(rows);
    });
});

module.exports = router;
