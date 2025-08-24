interface EventMarkerProps {
  year: string | number;
  onClick: () => void;
  isActive: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  tabIndex: number;
}

const EventMarker: React.FC<EventMarkerProps> = ({ year, onClick, isActive, onKeyDown, tabIndex }) => {
  return (
    <button
      className={`year-btn ${isActive ? 'active' : ''}`}
      data-year={year}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
    >
      {year}
    </button>
  );
};

export default EventMarker;


