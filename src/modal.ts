const modal = document.getElementById("modal") as HTMLElement;
const modalText = document.getElementById("modal-text") as HTMLElement;

export const initModal = () => {
  const closeModal = () => modal.classList.remove("show");

  modal.querySelector(".close")?.addEventListener("click", closeModal);

  window.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  return { modal, modalText };
};

export const openModal = (text: string) => {
  modalText.textContent = text || "No additional details available.";
  modal.classList.add("show");
};
