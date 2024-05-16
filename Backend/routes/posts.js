const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

// Route to retrieve posts from the database
router.get('/', (req, res) => {
    const selectPostsQuery = `
        SELECT Blogs.id AS blogid, Users.username, Blogs.title AS blog_title, Blogs.created_at AS date_posted
        FROM Blogs
        INNER JOIN Users ON Blogs.user_id = Users.id
        ORDER BY Blogs.created_at DESC; // Sort by most recent first
    `;

    db.all(selectPostsQuery, (err, posts) => {
        if (err) {
            console.error('Error retrieving posts:', err);
            return res.status(500).json({ error: `Error retrieving posts: ${err.message}` });
        }

        res.status(200).json(posts);
    });
});

module.exports = router;
