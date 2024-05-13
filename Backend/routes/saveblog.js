const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

// Function to sanitize HTML and extract text
const sanitizeHTML = (html) => {
    const regex = /<\/?(h[1-6]|strong|em|u|span)[^>]*>/gi; // Allow only specified tags
    return html.replace(regex, '');
};

// Route to handle receiving and saving a blog
router.post('/', (req, res) => {
    const { userId, content } = req.body;

    // Clean the title text by extracting <h1> or <h2> tags and removing other HTML tags
    let title = 'Untitled Blog';
    const titleMatch = content.match(/<(h1|h2)>(.*?)<\/(h1|h2)>/);
    if (titleMatch) {
        title = sanitizeHTML(titleMatch[2]); // Extract the text inside the <h1> or <h2> tag and sanitize HTML
    }

    // Extract the entire data URI from the image src attribute in the content
    const imgMatch = content.match(/<img.*?src="(data:image\/[^;]+;base64,[^"]+)".*?>/);
    const mainImage = imgMatch ? imgMatch[1] : ''; // Set mainImage to empty string if no image found

    // Insert the blog into the database with cleaned title and mainImage data
    const insertBlogQuery = `
        INSERT INTO Blogs (title, content, user_id, mainImage)
        VALUES (?, ?, ?, ?);
    `;

    db.run(insertBlogQuery, [title, content, userId, mainImage], (err) => {
        if (err) {
            console.error('Error saving blog:', err);
            return res.status(500).json({ error: `Error saving blog: ${err.message}` });
        }

        console.log('Blog saved successfully');
        res.status(200).json({ message: 'Blog saved successfully' });
    });
});

module.exports = router;
