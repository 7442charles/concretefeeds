// Fetch data from the API endpoint
fetch(`${URL}/posts`)
    .then(response => response.json())
    .then(data => {
        // Get the container where the blog rows will be added
        const blogListContainer = document.getElementById('post-blog-list');

        // Loop through the data and create blog rows dynamically
        data.forEach(blog => {
            // Create elements for the blog row
            const blogRow = document.createElement('div');
            blogRow.classList.add('row-like-container', 'd-flex', 'align-items-start', 'justify-content-between', 'mb-3', 'border-1', 'rounded-3');

            const blogInfo = document.createElement('div');
            blogInfo.classList.add('d-flex', 'flex-column');

            const blogTitle = document.createElement('span');
            blogTitle.classList.add('Post-blog-title', 'fw-bolder');
            blogTitle.textContent = blog.blog_title;

            const postDate = document.createElement('span');
            postDate.classList.add('post-date', 'text-muted');
            postDate.textContent = new Date(blog.date_posted).toDateString(); // Format date as desired

            const postAuthor = document.createElement('span');
            postAuthor.classList.add('post-author', 'text-muted');
            postAuthor.textContent = `by ${blog.username}`;

            // Append elements to the blog row
            blogInfo.appendChild(blogTitle);
            blogInfo.appendChild(postDate);
            blogInfo.appendChild(postAuthor);

            blogRow.appendChild(blogInfo);

            const button = document.createElement('button');
            button.classList.add('btn', 'btn-outline-secondary', 'align-self-center');
            button.innerHTML = '<i class="bi bi-bar-chart"></i>';
            
            // Attach blogid to the button
            button.dataset.blogid = blog.blogid;
            // console.log(blog.blogid);

            // Add click event listener to the button
            button.addEventListener('click', handleDeleteButtonClick);

            blogRow.appendChild(button);

            // Append the blog row to the container
            blogListContainer.appendChild(blogRow);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Function to handle button click
function handleDeleteButtonClick(event) {
    const blogId = event.target.dataset.blogid;
    console.log('Clicked Blog ID:', blogId); // Log the blog ID

    Swal.fire({
        title: "What changes do you want to make?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Edit",
        denyButtonText: `Delete`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      }
    );
}
