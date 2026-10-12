const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  primaryNav.classList.toggle("is-open", !isExpanded);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("is-open");
  }
});

const archiveSearch = document.querySelector("#archive-search");
const yearFilter = document.querySelector("#year-filter");
const archiveCards = [...document.querySelectorAll(".archive-card")];
const emptyState = document.querySelector("#empty-state");

function filterArchive() {
  const query = archiveSearch.value.trim().toLowerCase();
  const year = yearFilter.value;
  let visibleCount = 0;

  archiveCards.forEach((card) => {
    const matchesQuery = card.dataset.search.includes(query);
    const matchesYear = year === "all" || card.dataset.year === year;
    const isVisible = matchesQuery && matchesYear;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

archiveSearch.addEventListener("input", filterArchive);
yearFilter.addEventListener("change", filterArchive);
document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-page-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    const destination = button.dataset.pageJump === "top" ? 0 : document.documentElement.scrollHeight;
    window.scrollTo({ top: destination, behavior: "instant" });
  });
});
