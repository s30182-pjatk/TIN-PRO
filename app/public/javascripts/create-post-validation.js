
const form = document.getElementById("createPostForm");
const title = document.getElementById("title");
const content = document.getElementById("content");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;
    clearErrors();


    // Title
    if (!title.value.trim()) {
        setError(title, "Post title is required");
        isValid = false;
    } else if (title.value.trim().length < 3) {
        setError(title, "Title must be at least 3 characters");
        isValid = false;
    }

    if (!content.value.trim()) {
        setError(content, "Post content is required");
        isValid = false;
    } else if (content.value.trim().length < 10) {
        setError(content, "Post content must be at least 10 characters");
        isValid = false;
    }

    if (!isValid) return;

    try {
        const response = await fetch(form.action, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            },
            body: new URLSearchParams({
                title: title.value.trim(),
                content: content.value.trim()
            })
        });

        const data = await response.json();

        // ❌ Server-side validation error
        if (!response.ok) {
            showServerError(data);
            return;
        }

        // ✅ Success → redirect
        if (data.redirectTo) {
            window.location.href = data.redirectTo;
        }

    } catch (err) {
        console.error(err);
        alert("Server error. Please try again later.");
    }
});

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

function showServerError(data) {
    if (data.field) {
        const input = document.getElementById(data.field);
        if (input) {
            setError(input, data.message);
            return;
        }
    }

    alert(data.message || "Failed to create post");
}