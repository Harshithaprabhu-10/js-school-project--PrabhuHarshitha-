var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initModal, openModal } from "./modal.js";
import { loadEvents } from "./fetcher.js";
import { setActiveButton, renderDefaultCard, renderEvent, renderNoEvent } from "./render.js";
document.addEventListener("DOMContentLoaded", () => {
    var _a;
    const yearButtons = document.querySelectorAll(".year-btn, nav.year button");
    const flashcardContainer = document.querySelector("#timeline");
    const defaultCardHTML = document.querySelector("#default-card").innerHTML;
    const defaultYear = "1977";
    let events = [];
    const { modal } = initModal();
    flashcardContainer.addEventListener("click", e => {
        const btn = e.target.closest(".toggle-btn");
        if (!btn)
            return;
        openModal(btn.dataset.more || "No additional details available.");
    });
    const handleYearClick = (btn) => {
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
        btn.addEventListener("click", () => handleYearClick(btn));
    });
    (_a = document.getElementById("theme-switch")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", () => {
        document.body.classList.toggle("dark-theme");
    });
    (() => __awaiter(void 0, void 0, void 0, function* () {
        events = yield loadEvents();
        renderDefaultCard(flashcardContainer, defaultCardHTML);
    }))();
});
//# sourceMappingURL=index.js.map