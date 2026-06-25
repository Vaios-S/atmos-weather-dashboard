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
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            className="min-h-14 flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 text-white outline-none transition placeholder:text-white/40 focus:border-blue-500 focus:bg-white/10"
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search City..."
          ></input>
          <button
            className="min-h-14 rounded-2xl bg-blue-600 px-8 font-semibold transition hover:bg-blue-500 sm:w-auto"
            type="submit"
          >
            Search
          </button>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          {recentSearches.length > 0 ? (
            <div>
              <p className="mb-3 text-sm font-semibold text-white/60">
                Recent Searches
              </p>
              {recentSearches.map((city) => (
                <button
                  className="mb-2 mr-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-blue-600"
                  type="button"
                  key={city}
                  onClick={() => onSelectRecent(city)}
                >
                  {city}
                </button>
              ))}
              <button
                className="mt-2 text-sm text-red-400 transition hover:text-red-300"
                type="button"
                onClick={onClearHistory}
              >
                Clear History
              </button>
            </div>
          ) : null}
        </div>
      </form>
    </>
  );
}
