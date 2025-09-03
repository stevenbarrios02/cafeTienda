function MySweetAlert(options) {
    return new Promise(resolve => {

        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0,0,0,0.6)";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "9999";
        overlay.style.animation = "fadeIn 0.3s";

        const modal = document.createElement("div");
        modal.style.background = "#fff";
        modal.style.borderRadius = "12px";
        modal.style.padding = "25px";
        modal.style.width = "90%";
        modal.style.maxWidth = "400px";
        modal.style.textAlign = "center";
        modal.style.animation = "popIn 0.4s ease";

        if (options.type) {
            const icon = document.createElement("div");
            icon.style.fontSize = "50px";
            icon.style.marginBottom = "10px";
            if (options.type === "success") icon.textContent = "✅";
            if (options.type === "error") icon.textContent = "❌";
            if (options.type === "warning") icon.textContent = "⚠️";
            if (options.type === "info") icon.textContent = "ℹ️";
            modal.appendChild(icon);
        }

        if (options.imageUrl) {
            const img = document.createElement("img");
            img.src = options.imageUrl;
            img.style.width = "100px";
            img.style.borderRadius = "8px";
            img.style.marginBottom = "10px";
            modal.appendChild(img);
        }

        if (options.title) {
            const title = document.createElement("h2");
            title.textContent = options.title;
            title.style.marginBottom = "10px";
            title.style.color = "#333";
            modal.appendChild(title);
        }

        if (options.html) {
            const content = document.createElement("div");
            content.innerHTML = options.html;
            content.style.marginBottom = "15px";
            modal.appendChild(content);
        } else if (options.text) {
            const text = document.createElement("p");
            text.textContent = options.text;
            text.style.marginBottom = "15px";
            text.style.color = "#555";
            modal.appendChild(text);
        }

        const btn = document.createElement("button");
        btn.textContent = options.confirmText || "OK";
        btn.style.background = "#8d6e63";
        btn.style.color = "white";
        btn.style.border = "none";
        btn.style.padding = "10px 20px";
        btn.style.borderRadius = "6px";
        btn.style.fontWeight = "bold";
        btn.style.cursor = "pointer";
        btn.style.transition = "background 0.3s";
        btn.addEventListener("mouseenter", () => (btn.style.background = "#6d4c41"));
        btn.addEventListener("mouseleave", () => (btn.style.background = "#8d6e63"));

        btn.addEventListener("click", () => {
            overlay.remove();
            resolve();
        });

        modal.appendChild(btn);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

    
        const style = document.createElement("style");
        style.innerHTML = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes popIn {
                from { transform: scale(0.7); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    });
}
