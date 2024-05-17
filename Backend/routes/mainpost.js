const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

router.get('/', (req, res) => {
    const selectRecentBlogQuery = `
        SELECT Blogs.id AS blogid, Blogs.title, Users.username AS author, Blogs.mainImage, Blogs.created_at AS date_posted
        FROM Blogs
        INNER JOIN Users ON Blogs.user_id = Users.id
        WHERE Blogs.mainImage IS NOT NULL AND Blogs.mainImage <> '' -- Ensure mainImage is not empty
        ORDER BY Blogs.created_at DESC
        LIMIT 1; -- Limit to 1 most recent blog with an image
    `;

    db.get(selectRecentBlogQuery, (err, recentBlog) => {
        if (err) {
            console.error('Error retrieving recent blog with image:', err);
            return res.status(500).json({ error: `Error retrieving recent blog with image: ${err.message}` });
        }

        if (!recentBlog) {
            return res.status(404).json({ error: 'No recent blog with an image found' });
        }

        res.status(200).json(recentBlog);
    });
});

module.exports = router;
