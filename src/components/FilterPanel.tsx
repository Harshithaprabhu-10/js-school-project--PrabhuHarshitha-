import { useState } from "react";

interface FilterPanelProps {
  onFilter: (from: number, to: number) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilter }) => {
  const [from, setFrom] = useState(1970);
  const [to, setTo] = useState(2025);

  const applyFilter = () => {
    onFilter(from, to);
  };

  return (
    <div className="filter-panel">
      <label>
        From:
        <input
          type="number"
          value={from}
          onChange={e => setFrom(Number(e.target.value))}
        />
      </label>
      <label>
        To:
        <input
          type="number"
          value={to}
          onChange={e => setTo(Number(e.target.value))}
        />
      </label>
      <button onClick={applyFilter}>Apply Filter</button>
    </div>
  );
};

export default FilterPanel;
