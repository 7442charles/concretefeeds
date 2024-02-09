document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Fetch data from the backend server
        const response = await fetch('http://localhost:3000/TopBlogs');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data received:', data);

        // Check if data is an array
        if (Array.isArray(data)) {
            // Process the data and create the blog layout
            createBlogLayout(data);
        } else {
            console.error('Invalid data structure:', data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

function createBlogLayout(data) {
    // Call individual functions to create each part
    createPartOneBlog(data[0]);
    createCenterBlog(data[1]);
    createPartTwoBlog(data.slice(2, 4)); // Slice the array for part_two_blog
}

function createPartOneBlog(blog) {
    const blogContainer = document.getElementById('part_one_blog');
    createBlogElement(blogContainer, blog, 'mb-30 v-height gradient');
}

function createCenterBlog(blog) {
    const blogContainer = document.getElementById('center_blog');
    createBlogElement(blogContainer, blog, 'img-5 h-100 gradient');
}

function createPartTwoBlog(blogArray) {
    const blogContainer = document.getElementById('part_two_blog');
    blogArray.forEach(blog => {
        createBlogElement(blogContainer, blog, 'mb-30 v-height gradient');
    });
}

function createBlogElement(container, blog, linkClass) {
    const blogElement = document.createElement('div');
    blogElement.className = 'col-md-4';

    const blogLink = document.createElement('a');
    blogLink.href = `single.html?id=${blog.id}`;
    blogLink.className = linkClass;

    const featuredImg = document.createElement('div');
    featuredImg.className = 'featured-img';
    featuredImg.style.backgroundImage = `url('${blog.imageUrl}')`;

    const text = document.createElement('div');
    text.className = 'text';

    const dateSpan = document.createElement('span');
    dateSpan.className = 'date';
    dateSpan.textContent = formatDateString(blog.datePosted); // Format the date string if needed

    const titleHeading = document.createElement('h2');
    titleHeading.innerHTML = blog.description; // Use the 'description' property in the h2 tag

    // Append elements to build the blog structure
    text.appendChild(dateSpan);
    text.appendChild(titleHeading);
    blogLink.appendChild(featuredImg);
    blogLink.appendChild(text);
    blogElement.appendChild(blogLink);
    container.appendChild(blogElement);
}

function formatDateString(dateString) {
    // Add your date formatting logic here if needed
    return dateString;
}
