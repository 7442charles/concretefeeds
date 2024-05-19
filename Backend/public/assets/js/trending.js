// Fetch data from the API endpoint
fetch(`${URL}/trendingposts`)
    .then(response => response.json())
    .then(data => {
        // Get the container where the trending posts will be added
        const trendingContainer = document.querySelector('.trending-ul');

        // Loop through the data and create list items for each post
        data.slice(0, 5).forEach((post, index) => { // Limit to the first 5 posts and use index for numbering
            // Create elements for the post
            const listItem = document.createElement('li');

            const postLink = document.createElement('a');
            postLink.href = `single-post.html?id=${post.blogid}`; // Assuming you have a page to display individual posts

            const postNumber = document.createElement('span');
            postNumber.classList.add('number');
            postNumber.textContent = index + 1; // Index starts from 0, so add 1 to get the correct number

            const postTitle = document.createElement('h3');
            postTitle.textContent = post.blog_title; // Assuming blog_title is the title of the post

            const postAuthor = document.createElement('span');
            postAuthor.classList.add('author');
            postAuthor.textContent = post.author_name; // Assuming author_name is the name of the post author

            // Append elements to the post link
            postLink.appendChild(postNumber);
            postLink.appendChild(postTitle);
            postLink.appendChild(postAuthor);

            // Append post link to list item
            listItem.appendChild(postLink);

            // Append list item to trending container
            trendingContainer.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching trending posts:', error);
    });
