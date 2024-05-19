const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Route to display a single blog post
router.get('/blog/:id', (req, res) => {
    const blogId = req.params.id;
    const blogQuery = `
        SELECT Blogs.id AS blogid, Blogs.title, Blogs.mainImage, Blogs.created_at AS date_posted, Blogs.content, Users.username AS author
        FROM Blogs
        INNER JOIN Users ON Blogs.user_id = Users.id
        WHERE Blogs.id = ?;
    `;
    const latestBlogsQuery = `
        SELECT Blogs.id AS blogid, Blogs.title, Blogs.created_at AS date_posted, Blogs.mainImage, Users.username AS author
        FROM Blogs
        INNER JOIN Users ON Blogs.user_id = Users.id
        ORDER BY Blogs.created_at DESC
        LIMIT 5;
    `;

    db.get(blogQuery, [blogId], (err, blog) => {
        if (err) {
            console.error('Error retrieving blog:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        db.all(latestBlogsQuery, (err, latestBlogs) => {
            if (err) {
                console.error('Error retrieving latest blogs:', err);
                return res.status(500).send('Internal Server Error');
            }

            res.render('blog', {
                blog,
                latestBlogs,
                formatDate
            });
        });
    });
});

module.exports = router;
