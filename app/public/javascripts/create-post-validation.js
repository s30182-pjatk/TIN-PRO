const form = document.getElementById("createPostForm");
const title = document.getElementById("title");
const content = document.getElementById("content");

form.addEventListener("submit", (e) => {
    let isValid = true;

    clearErrors();

    // Title validation
    if (!title.value.trim()) {
        setError(title, "Post title is required");
        isValid = false;
    } else if (title.value.trim().length < 3) {
        setError(title, "Title must be at least 3 characters");
        isValid = false;
    }

    // Content validation
    if (!content.value.trim()) {
        setError(content, "Post content is required");
        isValid = false;
    } else if (content.value.trim().length < 10) {
        setError(content, "Post content must be at least 10 characters");
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
});

// Clear errors while typing
[title, content].forEach(field => {
    field.addEventListener("input", () => clearError(field));
});

function setError(field, message) {
    const error = field.parentElement.querySelector(".error");
    error.textContent = message;
}

function clearError(field) {
    const error = field.parentElement.querySelector(".error");
    error.textContent = "";
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(err => err.textContent = "");
}
