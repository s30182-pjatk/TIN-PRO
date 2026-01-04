let currentFeed = window.INITIAL_FEED;
let currentPage = window.INITIAL_PAGE;
let totalPages = 1;

const postsContainer = document.getElementById("postsContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const feedButtons = document.querySelectorAll(".feed-btn");

async function loadPosts() {
    const res = await fetch(`/api/home?feed=${currentFeed}&page=${currentPage}`);
    const data = await res.json();

    totalPages = data.totalPages;
    renderPosts(data.posts);
    updatePagination();
}

function renderPosts(posts) {
    postsContainer.innerHTML = "";

    if (posts.length === 0) {
        postsContainer.innerHTML = `
            <p class="no-posts">
                ${currentFeed === "subscribed"
            ? "No posts from subscribed authors yet."
            : "No posts yet."}
            </p>
        `;
        return;
    }

    posts.forEach(post => {
        postsContainer.innerHTML += `
            <article class="post-card">
                <a href="/api/post/${post._id}" class="post-link">
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-content">${post.content}</p>
                </a>
                <div class="post-meta">
                    <span>
                        By <a href="/api/user/${post.author._id}" class="author-link">
                            <strong>${post.author.username}</strong>
                        </a>
                    </span>
                    <span>• ${new Date(post.postDate).toLocaleDateString()}</span>
                </div>
            </article>
        `;
    });
}

function updatePagination() {
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
}

prevBtn.onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        loadPosts();
    }
};

nextBtn.onclick = () => {
    if (currentPage < totalPages) {
        currentPage++;
        loadPosts();
    }
};

feedButtons.forEach(btn => {
    btn.onclick = () => {
        feedButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentFeed = btn.dataset.feed;
        currentPage = 1;
        loadPosts();
    };
});

loadPosts();
