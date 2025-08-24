interface EventMarkerProps {
  year: string | number;
  onClick: () => void;
  isActive: boolean;
}

const EventMarker: React.FC<EventMarkerProps> = ({ year, onClick, isActive }) => {
  return (
    <button
      className={`year-btn ${isActive ? 'active' : ''}`}
      data-year={year}
      onClick={onClick}
    >
      {year}
    </button>
  );
};

export default EventMarker;
