
const images = Array.from(document.querySelectorAll(".image"));
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const caption = document.getElementById("caption");

let currentIndex = 0;
let visibleImages = images;

function filterImages(category, button) {
    document.querySelectorAll(".filters button").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    images.forEach(image => {
        if (category === "all" ||
            image.dataset.category === category) {
            image.style.display = "block";
        } else {
            image.style.display = "none";
        }
    });

    visibleImages = images.filter(image =>
        image.style.display !== "none"
    );
}

function openLightbox(index) {
    visibleImages = images.filter(image =>
        image.style.display !== "none"
    );

    currentIndex = visibleImages.indexOf(images[index]);

    if (currentIndex === -1) return;

    showImage();
    lightbox.classList.add("show");
}

function showImage() {
    const selected = visibleImages[currentIndex];
    const img = selected.querySelector("img");

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    caption.textContent =
        selected.querySelector("p").textContent;
}

function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    }

    if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }

    showImage();
}

function closeLightbox() {
    lightbox.classList.remove("show");
}

lightbox.addEventListener("click", function(event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener("keydown", function(event) {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") {
        changeImage(1);
    } else if (event.key === "ArrowLeft") {
        changeImage(-1);
    } else if (event.key === "Escape") {
        closeLightbox();
    }
});
