const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { db, createTables } = require('./config/database'); 
const {updateBlogViews, resetBlogViews} = require('./routes/updateBlogsview')
const newuserRoute = require('./routes/newuser');
const loginRoute = require('./routes/login');
const saveblogRoute = require('./routes/saveblog');
const postsRoute = require('./routes/posts');
const trendingRoute = require('./routes/trending')
const uploadImageRoute = require('./routes/imagesupload')

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Uncomment this line if using x-www-form-urlencoded

// Serve static files from the 'data' directory
app.use('/data', express.static(path.join(__dirname, 'data')));

// Routes
app.use('/newuser', newuserRoute);
app.use('/login', loginRoute);
app.use('/saveblog', saveblogRoute);
app.use('/posts', postsRoute);
app.use('/trendingposts', trendingRoute)
app.use('/uploadImage', uploadImageRoute)

// Create tables if they don't exist
createTables();
// updateBlogViews()
// resetBlogViews()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
