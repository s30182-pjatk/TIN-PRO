async function saveEdit(postId, button) {
    const postCard = button.closest(".post-card");

    const titleInput = postCard.querySelector(".edit-title");
    const contentInput = postCard.querySelector(".edit-content");

    let isValid = true;

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    clearErrors();

    if (!title) {
        setError(titleInput, "Post title is required");
        isValid = false;
    } else if (title.length < 3) {
        setError(titleInput, "Title must be at least 3 characters");
        isValid = false;
    }

    if (!content) {
        setError(contentInput, "Post content is required");
        isValid = false;
    } else if (content.length < 10) {
        setError(contentInput, "Post content must be at least 10 characters");
        isValid = false;
    }

    if (!isValid) return;

    // ✅ Continue save if valid
    const response = await fetch(`/api/post/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
        postCard.querySelector(".post-title").textContent = title;
        postCard.querySelector(".post-content").textContent = content;

        disableEdit(postCard);
    } else {
        alert("Failed to update post");
    }
}

function setError(field, message) {
    let error = field.parentElement.querySelector(".error");

    if (!error) {
        error = document.createElement("div");
        error.className = "error";
        field.parentElement.appendChild(error);
    }

    error.textContent = message;
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
}

function enableEdit(button) {
    const postCard = button.closest(".post-card");

    postCard.querySelector(".post-title").style.display = "none";
    postCard.querySelector(".post-content").style.display = "none";

    postCard.querySelector(".edit-title").style.display = "block";
    postCard.querySelector(".edit-content").style.display = "block";

    button.style.display = "none";
    postCard.querySelector(".save-btn").style.display = "inline-block";
}

function disableEdit(postCard) {
    // Show text
    postCard.querySelector(".post-title").style.display = "block";
    postCard.querySelector(".post-content").style.display = "block";

    // Hide inputs
    postCard.querySelector(".edit-title").style.display = "none";
    postCard.querySelector(".edit-content").style.display = "none";

    // Toggle buttons
    postCard.querySelector(".edit-btn").style.display = "inline-block";
    postCard.querySelector(".save-btn").style.display = "none";

    // Clear validation errors
    postCard.querySelectorAll(".error").forEach(e => e.textContent = "");
}

