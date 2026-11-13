const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const yearElement = document.getElementById("currentYear");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// AMONG US LOADING SCREEN

const loader = document.getElementById("loaderScreen");
const progress = document.getElementById("loaderProgress");
const percentage = document.getElementById("loaderPercentage");
const message = document.getElementById("loaderMessage");
const skipButton = document.getElementById("skipLoader");

let loaderFinished = false;
let startTime;
let loadingInterval;
let fallbackTimer;

const duration = 7000;

const messages = [
    "Loading portfolio assets...",
    "Preparing your projects...",
    "Connecting to the universe...",
    "Almost ready, crewmate!"
];

function finishLoader() {
    if (loaderFinished) return;

    loaderFinished = true;
    clearInterval(loadingInterval);
    clearTimeout(fallbackTimer);

    progress.style.width = "100%";
    percentage.textContent = "100%";
    message.textContent = "Welcome, crewmate!";

    setTimeout(() => {
        loader.classList.add("hide-loader");
        document.body.setAttribute("aria-busy", "false");
    }, 400);
}

function updateLoader() {
    const elapsed = Date.now() - startTime;
    const value = Math.min((elapsed / duration) * 100, 100);

    progress.style.width = value + "%";
    percentage.textContent = Math.floor(value) + "%";

    const index = Math.min(
        Math.floor(value / 25),
        messages.length - 1
    );

    message.textContent = messages[index];

    if (value >= 100) {
        finishLoader();
    }
}

function startLoader() {
    if (loaderFinished) return;

    startTime = Date.now();
    loadingInterval = setInterval(updateLoader, 50);
}

skipButton.addEventListener("click", finishLoader);

if (document.readyState === "complete") {
    startLoader();
} else {
    window.addEventListener("load", startLoader, { once: true });
}

// Safety fallback
fallbackTimer = setTimeout(finishLoader, 10000);