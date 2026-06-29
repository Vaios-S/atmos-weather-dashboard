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
      <form
        className="w-full rounded-3xl border border-white/15 bg-white/10 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            className="min-h-14 flex-1 rounded-2xl border border-white/15 bg-white/10 px-5 text-sm text-white shadow-lg shadow-black/10 outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-white/45 focus:border-white/30 focus:bg-white/15 focus:ring-4 focus:ring-white/10"
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search for a city..."
          />

          <button
            className="min-h-14 rounded-2xl border border-white/15 bg-white/15 px-8 text-sm font-medium text-white shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/20 active:scale-[0.98]"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
}
