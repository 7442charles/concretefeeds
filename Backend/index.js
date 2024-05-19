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
const recentPostsRoute = require('./routes/recent_posts')
const mainBlogRoute = require('./routes/mainpost')
const sixBlogsRoute = require('./routes/sixblogs')
const timeSpentRoute = require('./routes/times')
const userRetentionRoute = require('./routes/userRetention')
const blogRouter = require('./routes/blog');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Serve static files from the 'data' directory
app.use('/data', express.static(path.join(__dirname, 'data')));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/newuser', newuserRoute);
app.use('/login', loginRoute);
app.use('/saveblog', saveblogRoute);
app.use('/posts', postsRoute);
app.use('/trendingposts', trendingRoute)
app.use('/uploadImage', uploadImageRoute)
app.use('/recentPosts', recentPostsRoute)
app.use('/mainblog', mainBlogRoute )
app.use('/sixblogs', sixBlogsRoute)
app.use('/timespent', timeSpentRoute)
app.use('/userretention', userRetentionRoute)

app.use(blogRouter);


// Create tables if they don't exist
createTables();
// updateBlogViews()
// resetBlogViews()

app.get( '/', (req, res) =>{
    res.send(`app is live at port ${PORT}`)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
