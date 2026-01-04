const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    errorMsg.style.display = "none";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            errorMsg.textContent = data.message || "Login failed";
            errorMsg.style.display = "block";
            return;
        }

        window.location.href = data.redirectTo;

    } catch (err) {
        errorMsg.textContent = "Something went wrong";
        errorMsg.style.display = "block";
    }
});