import { useEffect, useRef } from "react";
import { TimelineEvent } from "../types";

interface EventModalProps {
  event: TimelineEvent | null;
  onClose: () => void;
  triggerElement: HTMLElement | null; 
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose, triggerElement }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!event || !modalRef.current) return;

    const modal = modalRef.current;
    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusable[0];
    const lastEl = focusable[focusable.length - 1];
    firstEl?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      }

      if (e.key === "Tab" && focusable.length > 0) {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [event]);

  const closeModal = () => {
    triggerElement?.focus();
    onClose();
  };
  if (!event) return null;

  return (
    <div
      ref={modalRef}
      className="modal show"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-text"
    >
      <button onClick={closeModal} className="close" type="button">
        Close
      </button>
      <p id="modal-text">
        {event.moreInfo || "No extra info to show here."}
      </p>
    </div>
  );
};

export default EventModal;
