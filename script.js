// Hearts rising from bottom of page
const heartsContainer = document.getElementById('hearts-container');
const heartChars = ['❤️', '💕', '💗', '💖', '💓', '💝'];

function createRisingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (8 + Math.random() * 6) + 's';
    heart.style.fontSize = (1 + Math.random() * 1.5) + 'em';
    heartsContainer.appendChild(heart);

    const duration = parseFloat(heart.style.animationDuration) * 1000;
    setTimeout(() => heart.remove(), duration);
}

// Start hearts rising from bottom
setInterval(createRisingHeart, 400);
for (let i = 0; i < 8; i++) {
    setTimeout(createRisingHeart, i * 200);
}

// Gallery Animation
const galleryImages = document.querySelectorAll('.gallery-img');
galleryImages.forEach((img, index) => {
    img.style.animationDelay = `${index * 0.2}s`;
});

// Background music – start muted until user interacts (e.g. clicks music button)
const bgMusic = document.getElementById('bg-music');
if (bgMusic) {
    bgMusic.volume = 0.3;
}

// Music On/Off button and volume – in last section. Try to auto-play on load.
(function() {
    const music = document.getElementById('bg-music');
    const toggleBtn = document.getElementById('music-toggle');
    const volumeInput = document.getElementById('music-volume');
    if (!music) return;

    function updateToggleLabel() {
        if (!toggleBtn) return;
        const isPaused = music.paused;
        toggleBtn.textContent = isPaused ? '🔇 Music Off' : '🔊 Music On';
        toggleBtn.classList.toggle('off', isPaused);
    }

    // Try to auto-play as soon as page loads (may still be blocked by some browsers)
    window.addEventListener('load', () => {
        if (music.paused) {
            music.muted = false;
            music.volume = (volumeInput ? Number(volumeInput.value) / 100 : 0.3);
            music.play().then(updateToggleLabel).catch(() => {
                // If blocked, keep button so user can start manually
                updateToggleLabel();
            });
        }
    });

    if (!toggleBtn || !volumeInput) return;

    toggleBtn.addEventListener('click', function() {
        if (music.paused) {
            music.muted = false;
            music.play();
        } else {
            music.pause();
        }
        updateToggleLabel();
    });

    volumeInput.addEventListener('input', function() {
        const v = Number(volumeInput.value) / 100;
        music.volume = Math.max(0, Math.min(1, v));
    });

    updateToggleLabel();
})();

// Secret – password protected kisses
(function() {
    const SECRET_PASSWORD = "161311"; // Change this to your password
    const revealBtn = document.getElementById("reveal-btn");
    const secretMsg = document.getElementById("secret-msg");
    const kissesSlot = document.getElementById("kisses-slot");
    const kissesGallery = document.getElementById("kisses-gallery");
    const kissUpload = document.getElementById("kiss-upload");

    if (!revealBtn || !kissesSlot) return;

    revealBtn.addEventListener("click", function() {
        const password = prompt("Enter the password to reveal 💕");
        if (password === null) return; // User cancelled

        if (password.trim().toLowerCase() === SECRET_PASSWORD.toLowerCase()) {
            secretMsg.style.display = "block";
            kissesSlot.style.display = "block";
            revealBtn.style.display = "none";
        } else {
            alert("Wrong password. Try again! 💕");
        }
    });

    // Add more kiss pics
    if (kissUpload && kissesGallery) {
        kissUpload.addEventListener("change", function(e) {
            const files = e.target.files;
            if (!files || files.length === 0) return;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!file.type.startsWith("image/")) continue;

                const reader = new FileReader();
                reader.onload = function(ev) {
                    const div = document.createElement("div");
                    div.className = "kiss-frame";
                    div.innerHTML = '<img src="' + ev.target.result + '" alt="Kiss">';
                    kissesGallery.appendChild(div);
                };
                reader.readAsDataURL(file);
            }
            kissUpload.value = "";
        });
    }
})();

// Countdown to Love
const startDate = new Date("2005-04-11"); // 💡 change to YOUR date
const today = new Date();
const diffTime = today - startDate;
const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

document.getElementById("days-count").innerText =
    `We’ve been in this bond for ${days} beautiful days ❤️`;

document.querySelectorAll('.polaroid').forEach(p => {
    const angle = Math.random() * 6 - 3;
    p.style.setProperty('--polaroid-angle', angle + 'deg');
});