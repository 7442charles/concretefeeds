const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'blog.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

const updateBlogViews = () => {
    const updateQuery = `
        UPDATE Blogs
        SET views = 10 + CAST(RANDOM() * (999 - 10 + 1) AS INTEGER); -- Generate random numbers between 10 and 999
    `;

    db.run(updateQuery, (err) => {
        if (err) {
            console.error('Error updating blog views:', err.message);
        } else {
            console.log('Blog views updated successfully.');
        }
    });
};

const resetBlogViews = () => {
    const resetQuery = `
        UPDATE Blogs
        SET views = 0; -- Set views to 0 for all records
    `;

    db.run(resetQuery, (err) => {
        if (err) {
            console.error('Error resetting blog views:', err.message);
        } else {
            console.log('Blog views reset to 0 successfully.');
        }
    });
};




module.exports = { db, updateBlogViews, resetBlogViews };
