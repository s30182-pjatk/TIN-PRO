function enableEdit(button) {
    const post = button.closest(".post-card");

    post.querySelector(".post-title").style.display = "none";
    post.querySelector(".post-content").style.display = "none";

    post.querySelector(".edit-title").style.display = "block";
    post.querySelector(".edit-content").style.display = "block";

    button.style.display = "none";
    post.querySelector(".save-btn").style.display = "inline-block";
}

async function saveEdit(postId, button) {
    const post = button.closest(".post-card");

    const title = post.querySelector(".edit-title").value;
    const content = post.querySelector(".edit-content").value;

    try {
        const res = await fetch(`/api/post/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, content })
        });

        if (!res.ok) throw new Error("Failed to update");

        // Update UI
        post.querySelector(".post-title").textContent = title;
        post.querySelector(".post-content").textContent = content;

        post.querySelector(".post-title").style.display = "block";
        post.querySelector(".post-content").style.display = "block";

        post.querySelector(".edit-title").style.display = "none";
        post.querySelector(".edit-content").style.display = "none";

        button.style.display = "none";
        post.querySelector(".edit-btn").style.display = "inline-block";
    } catch (err) {
        alert("Error updating post");
        console.error(err);
    }
}
