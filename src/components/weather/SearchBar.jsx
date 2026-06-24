export default function SearchBar({
  value,
  onChange,
  onSubmit,
  recentSearches,
  onSelectRecent,
  onClearHistory,
}) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search City..."
        ></input>
        <button type="submit">Search</button>
        {recentSearches.length > 0 ? (
          <div>
            <p>Recent Searches</p>
            {recentSearches.map((city) => (
              <button
                type="button"
                key={city}
                onClick={() => onSelectRecent(city)}
              >
                {city}
              </button>
            ))}
            <button type="button" onClick={onClearHistory}>
              Clear History
            </button>
          </div>
        ) : null}
      </form>
    </>
  );
}
