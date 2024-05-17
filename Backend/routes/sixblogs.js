const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

// Route to retrieve 6 random blogs with an image
router.get('/', (req, res) => {
    const selectBlogsQuery = `
        SELECT Blogs.id AS blogid, Blogs.title, Blogs.mainImage, Blogs.created_at AS date_posted
        FROM Blogs
        WHERE Blogs.mainImage IS NOT NULL AND Blogs.mainImage <> ''
    `;

    db.all(selectBlogsQuery, (err, blogs) => {
        if (err) {
            console.error('Error retrieving blogs:', err);
            return res.status(500).json({ error: `Error retrieving blogs: ${err.message}` });
        }

        if (blogs.length === 0) {
            return res.status(404).json({ error: 'No blogs with images found' });
        }

        // Randomly select 6 blogs from the results
        const selectedBlogs = [];
        while (selectedBlogs.length < 6 && blogs.length > 0) {
            const randomIndex = Math.floor(Math.random() * blogs.length);
            const blog = blogs.splice(randomIndex, 1)[0]; // Remove the selected blog to avoid duplicates
            selectedBlogs.push(blog);
        }

        // Return an array of blog objects
        res.status(200).json(selectedBlogs);
    });
});

module.exports = router;
