const slides = Array.from(document.querySelectorAll("[data-slide]"));
const currentEl = document.querySelector("[data-current]");
const totalEl = document.querySelector("[data-total]");
const prevButton = document.querySelector("[data-prev]");
const nextButton = document.querySelector("[data-next]");

let currentIndex = 0;

function pad(number) {
  return String(number).padStart(2, "0");
}

function updateSlide(nextIndex) {
  const boundedIndex = Math.max(0, Math.min(nextIndex, slides.length - 1));

  if (boundedIndex === currentIndex && slides[currentIndex].classList.contains("is-active")) {
    return;
  }

  slides[currentIndex]?.classList.remove("is-active");
  currentIndex = boundedIndex;
  slides[currentIndex].classList.add("is-active");

  currentEl.textContent = pad(currentIndex + 1);
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === slides.length - 1;
}

function nextSlide() {
  updateSlide(currentIndex + 1);
}

function prevSlide() {
  updateSlide(currentIndex - 1);
}

document.querySelectorAll(".phone-frame img, .notification-frame img").forEach((image) => {
  if (image.complete && image.naturalWidth === 0) {
    image.classList.add("is-missing");
  }

  image.addEventListener("error", () => {
    image.classList.add("is-missing");
  });
});

document.addEventListener("keydown", (event) => {
  const activeElement = document.activeElement;
  const isEditable =
    activeElement &&
    (activeElement.tagName === "INPUT" ||
      activeElement.tagName === "TEXTAREA" ||
      activeElement.isContentEditable);

  if (isEditable) {
    return;
  }

  if (event.key === "ArrowRight" || event.key === " ") {
    event.preventDefault();
    nextSlide();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    prevSlide();
  }
});

prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);

totalEl.textContent = pad(slides.length);
updateSlide(0);
