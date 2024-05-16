const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

// Route to retrieve the 5 most recent posts from the database
router.get('/', (req, res) => {
    const selectRecentPostsQuery = `
        SELECT Blogs.title, Blogs.views, Blogs.created_at AS dateposted
        FROM Blogs
        ORDER BY Blogs.created_at DESC
        LIMIT 5; // Limit to 5 most recent posts
    `;

    db.all(selectRecentPostsQuery, (err, recentPosts) => {
        if (err) {
            console.error('Error retrieving recent posts:', err);
            return res.status(500).json({ error: `Error retrieving recent posts: ${err.message}` });
        }

        res.status(200).json(recentPosts);
    });
});

module.exports = router;
