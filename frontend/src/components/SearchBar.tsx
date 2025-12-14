export default function SearchBar({ setSearch }: any) {
  return (
    <input
      className="search"
      placeholder="Search sweets..."
      onChange={e => setSearch(e.target.value)}
    />
  );
}
