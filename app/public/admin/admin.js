/* ===================== GENERIC HELPERS ===================== */

async function submitForm(form, method, url) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    location.reload();
}

async function deleteItem(url) {
    await fetch(url, { method: "DELETE" });
    location.reload();
}

/* ===================== POSTS ===================== */

function showEditPost(id, title, content) {
    document.getElementById(`edit-post-${id}`).style.display = "block";
}

/* ===================== USERS ===================== */

function showEditUser(id) {
    document.getElementById(`edit-user-${id}`).style.display = "block";
}
