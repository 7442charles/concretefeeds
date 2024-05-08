const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

// Route to handle receiving and saving a blog
router.post('/', (req, res) => {
    const { userId, content } = req.body;

    // Extract the title text from the first <h1> tag in the content
    const titleMatch = content.match(/<h1>(.*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1] : 'Untitled Blog';

    // Insert the blog into the database
    const insertBlogQuery = `
        INSERT INTO Blogs (title, content, user_id)
        VALUES (?, ?, ?);
    `;

    db.run(insertBlogQuery, [title, content, userId], (err) => {
        if (err) {
            console.error('Error saving blog:', err);
            return res.status(500).json({ error: `Error saving blog: ${err.message}` });
        }

        console.log('Blog saved successfully');
        res.status(200).json({ message: 'Blog saved successfully' });
    });
});

module.exports = router;
