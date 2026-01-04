console.log("✅ signup-validation.js LOADED");


const form = document.getElementById("signupForm");

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", (e) => {
    let isValid = true;

    clearErrors();

    // Username
    if (!username.value.trim()) {
        setError(username, "Username is required");
        isValid = false;
    } else if (username.value.trim().length < 3) {
        setError(username, "Username must be at least 3 characters");
        isValid = false;
    }

    // Email
    if (!email.value.trim()) {
        setError(email, "Email is required");
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        setError(email, "Enter a valid email address");
        isValid = false;
    }

    // Password
    if (!password.value) {
        setError(password, "Password is required");
        isValid = false;
    } else if (password.value.length < 6) {
        setError(password, "Password must be at least 6 characters");
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
});

// Clear error when user types
[username, email, password].forEach(input => {
    input.addEventListener("input", () => {
        clearError(input);
    });
});

function setError(input, message) {
    const error = input.parentElement.querySelector(".error");
    error.textContent = message;
}

function clearError(input) {
    const error = input.parentElement.querySelector(".error");
    error.textContent = "";
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(err => err.textContent = "");
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
