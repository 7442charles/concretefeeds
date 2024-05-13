const express = require('express');
const router = express.Router();
const { db } = require('../config/database');
const cheerio = require('cheerio');

function extractHeadingText(html) {
  // Load the HTML content with cheerio
  const $ = cheerio.load(html);

  // Find all <h1> and <h2> elements
  const headings = $('h1, h2');

  // Extract the text content from each heading
  const headingTexts = [];
  headings.each((index, element) => {
    const headingText = $(element).text();
    headingTexts.push(headingText);
  });

  return headingTexts;
}

// Function to sanitize HTML and extract text
const sanitizeHTML = (html) => {
  const regex = /<\/?(?!h[1-6]|strong|em|u|span\b)[^>]*>/gi; // Allow only specified tags
  return html.replace(regex, '');
};

// Route to handle receiving and saving a blog
router.post('/', (req, res) => {
  const { userId, content } = req.body;

  // Extract the text from <h1> or <h2> tags and remove other HTML tags
  const extractedHeadings = extractHeadingText(content);
  let title = extractedHeadings.length > 0 ? extractedHeadings[0] : 'Untitled Blog';
  title = sanitizeHTML(title); // Sanitize the title

  // Extract the entire data URI from the image src attribute in the content
  const imgMatch = content.match(/<img.*?src="(data:image\/[^;]+;base64,[^"]+)".*?>/);
  const mainImage = imgMatch ? imgMatch[1] : '';

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