import { createPortal } from 'react-dom';
import { TimelineEvent } from '../types';

interface EventModalProps {
  event: TimelineEvent | null;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  return createPortal(
    <div className="modal show" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="close">Close</button>
        <p id="modal-text">{event.moreInfo || "No additional details available."}</p>
      </div>
    </div>,
    document.body
  );
};

export default EventModal;
