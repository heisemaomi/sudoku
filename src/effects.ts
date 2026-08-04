export function celebrate() {
    const emojis = [
        "🎉",
        "🎊",
        "✨",
        "⭐",
        "🥳"
    ];

    const container = document.createElement("div");
    container.id = "confetti";

    document.body.appendChild(container);

    for (let i = 0; i < 80; i++) {
        const e = document.createElement("div");

        e.className = "emoji";
        e.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

        e.style.left = `${Math.random() * 100}vw`;

        e.style.animationDelay =
            `${Math.random()}s`;

        e.style.fontSize =
            `${24 + Math.random() * 24}px`;

        container.appendChild(e);
    }

    setTimeout(() => {
        container.remove();
    }, 4000);
}