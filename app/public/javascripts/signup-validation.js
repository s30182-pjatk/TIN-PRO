console.log("✅ signup-validation.js LOADED");

const form = document.getElementById("signupForm");

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // ⛔ stop normal submit

    let isValid = true;
    clearErrors();

    // ---------- FRONTEND VALIDATION ----------

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

    // ❌ Stop if frontend validation failed
    if (!isValid) return;

    // ---------- SEND TO SERVER ----------

    try {
        const response = await fetch(form.action, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            },
            body: new URLSearchParams({
                username: username.value.trim(),
                email: email.value.trim(),
                password: password.value
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

// ---------- LIVE ERROR CLEAR ----------
[username, email, password].forEach(input => {
    input.addEventListener("input", () => clearError(input));
});

// ---------- HELPERS ----------
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

// ---------- SERVER ERROR HANDLING ----------
function showServerError(data) {
    if (data.field) {
        const input = document.getElementById(data.field);
        if (input) {
            setError(input, data.message);
            return;
        }
    }
    // fallback
    alert(data.message || "Signup failed");
}
