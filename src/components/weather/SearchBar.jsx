export default function SearchBar({ value, onChange, onSubmit }) {
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
      </form>
    </>
  );
}
