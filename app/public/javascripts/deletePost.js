async function deletePost(event, postId) {
    event.preventDefault();
    event.stopPropagation();

    if (!confirm("Are you sure you want to delete this post?")) {
        return;
    }

    try {
        const response = await fetch(`/api/post/delete/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const data = await response.json();
            alert(data.message || "Failed to delete post");
            return;
        }

        const postElement = document.getElementById(`post-${postId}`);
        if (postElement) {
            postElement.remove();
        }

        const remainingPosts = document.querySelectorAll(".post-card");
        const noPostsMsg = document.getElementById("no-posts-msg");

        if (remainingPosts.length === 0 && noPostsMsg) {
            noPostsMsg.style.display = "block";
        }

    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    }
}
