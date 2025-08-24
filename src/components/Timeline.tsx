import { useState, useRef, useEffect } from 'react';
import { TimelineEvent } from '../types';
import EventMarker from './EventMarker';

interface TimelineProps {
  onSelectYear: (year: string | number) => void;
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ onSelectYear, events }) => {
  const [activeYear, setActiveYear] = useState('1977');
  const years = events.map(event => event.year);
  const uniqueYears = [...new Set(years)].sort();
  const timelineNavRef = useRef<HTMLElement>(null);

  const handleYearClick = (year: string | number) => {
    setActiveYear(String(year));
    onSelectYear(year);
  };

  useEffect(() => {
    const activeBtn = timelineNavRef.current?.querySelector(`.year-btn.active`) as HTMLElement;
    if (activeBtn) {
      activeBtn.focus();
    }
  }, [activeYear]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const buttons = Array.from(timelineNavRef.current?.querySelectorAll<HTMLButtonElement>('.year-btn') || []);
    let newIndex = index;

    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % buttons.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + buttons.length) % buttons.length;
    }

    if (newIndex !== index) {
      e.preventDefault();
      const newActiveYear = buttons[newIndex].dataset.year;
      if (newActiveYear) {
        handleYearClick(newActiveYear);
      }
    }
  };

  return (
    <nav className="year" ref={timelineNavRef} role="navigation" aria-label="Timeline navigation">
      {uniqueYears.map((year, index) => (
        <EventMarker
          key={year}
          year={year}
          onClick={() => handleYearClick(year)}
          isActive={year === activeYear}
          onKeyDown={(e) => handleKeyDown(e, index)}
          tabIndex={index === 0 ? 0 : -1}
        />
      ))}
    </nav>
  );
};

export default Timeline;


