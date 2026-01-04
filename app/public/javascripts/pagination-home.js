let currentPage = window.INIT_PAGE;
let totalPages = window.TOTAL_PAGES;

const postsContainer = document.getElementById("postsContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

async function loadPage(page) {
    if (page < 1 || page > totalPages) return;

    const res = await fetch(`/api/posts?page=${page}`)
    const data = await res.json();



    currentPage = data.currentPage;
    totalPages = data.totalPages;

    renderPosts(data.posts);
    updatePagination();
}

function renderPosts(posts) {
    postsContainer.innerHTML = "";

    posts.forEach(post => {
        postsContainer.innerHTML += `
            <article class="post-card">
                <a href="/api/post/${post._id}" class="post-link">
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-content">${post.content}</p>
                </a>
                <div class="post-meta">
                    <span>
                        By
                        <a href="/api/user/${post.author._id}" class="author-link">
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

prevBtn.addEventListener("click", () => loadPage(currentPage - 1));
nextBtn.addEventListener("click", () => loadPage(currentPage + 1));
