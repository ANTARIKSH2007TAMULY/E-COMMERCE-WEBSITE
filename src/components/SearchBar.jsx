const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Search products (laptop, smartphone, headphones...)"
    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-inner outline-none transition focus:border-sky-500 focus:bg-white focus:shadow-sm"
  />
);

export default SearchBar;
