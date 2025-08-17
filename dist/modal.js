const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
export const initModal = () => {
    var _a;
    const closeModal = () => modal.classList.remove("show");
    (_a = modal.querySelector(".close")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", closeModal);
    window.addEventListener("click", e => {
        if (e.target === modal)
            closeModal();
    });
    return { modal, modalText };
};
export const openModal = (text) => {
    modalText.textContent = text || "No additional details available.";
    modal.classList.add("show");
};
//# sourceMappingURL=modal.js.map