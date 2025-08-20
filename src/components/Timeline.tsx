import { useState } from 'react';
import { TimelineEvent } from '../types';
import EventMarker from './EventMarker';

interface TimelineProps {
  onSelectYear: (year: string | number) => void;
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ onSelectYear, events }) => {
  const [activeYear, setActiveYear] = useState('1977');
  const years = events.map(event => event.year);
  const uniqueYears = [...new Set([...years, '1977'])].sort();

  const handleYearClick = (year: string | number) => {
    setActiveYear(String(year));
    onSelectYear(year);
  };

  return (
    <nav className="year">
      {uniqueYears.map(year => (
        <EventMarker
          key={year}
          year={year}
          onClick={() => handleYearClick(year)}
          isActive={year === activeYear}
        />
      ))}
    </nav>
  );
};

export default Timeline;
