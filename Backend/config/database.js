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

const createTables = () => {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            email TEXT UNIQUE,
            password TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const createBlogsTable = `
        CREATE TABLE IF NOT EXISTS Blogs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            content TEXT,
            user_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            views INTEGER DEFAULT 0,
            mainImage TEXT DEFAULT '', 
            FOREIGN KEY (user_id) REFERENCES Users(id)
        );
    `;

    // const alterBlogsTable = `
    //     ALTER TABLE Blogs
    //     ADD COLUMN mainImage TEXT DEFAULT '';
    // `;

    db.serialize(() => {
        db.run(createUsersTable);
        db.run(createBlogsTable);
        // db.run(alterBlogsTable);  
    });
};

module.exports = { db, createTables };
