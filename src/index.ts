import type { TimelineEvent } from "./types.js";
import { initModal, openModal } from "./modal.js";
import { loadEvents } from "./fetcher.js";
import { setActiveButton, renderDefaultCard, renderEvent, renderNoEvent } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
  const yearButtons = document.querySelectorAll(".year-btn, nav.year button");
  const flashcardContainer = document.querySelector("#timeline") as HTMLElement;
  const defaultCardHTML = (document.querySelector("#default-card") as HTMLElement).innerHTML;
  const defaultYear = "1977";

  let events: TimelineEvent[] = [];

  const { modal } = initModal();

  flashcardContainer.addEventListener("click", e => {
    const btn = (e.target as HTMLElement).closest(".toggle-btn") as HTMLElement | null;
    if (!btn) return;
    openModal(btn.dataset.more || "No additional details available.");
  });

  const handleYearClick = (btn: HTMLElement) => {
    const year = (btn.dataset.year || btn.textContent || "").trim();
    setActiveButton(year, yearButtons);

    if (year === defaultYear) {
      renderDefaultCard(flashcardContainer, defaultCardHTML);
      return;
    }

    const eventData = events.find(e => String(e.year) === year);
    eventData ? renderEvent(flashcardContainer, eventData) : renderNoEvent(flashcardContainer, year);
  };

  yearButtons.forEach(btn => {
    btn.addEventListener("click", () => handleYearClick(btn as HTMLElement));
  });

  document.getElementById("theme-switch")?.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme");
  });

  (async () => {
    events = await loadEvents();
    renderDefaultCard(flashcardContainer, defaultCardHTML);
  })();
});
