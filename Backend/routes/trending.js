const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

// Route to fetch random 5 blogs with title, author's name, and blog ID
router.get('/', (req, res) => {
    const randomQuery = `
        SELECT Blogs.id AS blogid, Blogs.title AS blog_title, Users.username AS author_name
        FROM Blogs
        INNER JOIN Users ON Blogs.user_id = Users.id
        ORDER BY RANDOM()
        LIMIT 5; 
    `;

    db.all(randomQuery, (err, randomBlogs) => {
        if (err) {
            console.error('Error fetching random blogs:', err.message);
            return res.status(500).json({ error: 'Error fetching random blogs.' });
        }

        res.status(200).json(randomBlogs);
    });
});

module.exports = router;
