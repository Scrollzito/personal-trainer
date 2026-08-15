import './SearchBar.css';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <svg aria-hidden="true" className="search-bar__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        className="search-bar__input"
        type="text"
        aria-label="Search machines"
        placeholder="Search machines (e.g. chest, legs, treadmill...)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button type="button" className="search-bar__clear" onClick={() => onChange('')} aria-label="Clear search">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
