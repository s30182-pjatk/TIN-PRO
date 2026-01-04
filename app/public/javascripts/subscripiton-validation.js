const subscribeBtn = document.getElementById("subscribeBtn");

if (subscribeBtn) {
    subscribeBtn.addEventListener("click", async () => {
        const userId = subscribeBtn.dataset.userId;

        try {
            const res = await fetch(`/api/subscribe/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();
            console.log(data);

            if (!res.ok) {
                alert(data.message || "Subscription failed");
                return;
            }

            if (data.subscribed) {
                subscribeBtn.textContent = "Unsubscribe";
                subscribeBtn.classList.add("subscribed");
            } else {
                subscribeBtn.textContent = "Subscribe";
                subscribeBtn.classList.remove("subscribed");
            }

        } catch (err) {
            console.error(err)
            alert(userId);
        }
    });
}