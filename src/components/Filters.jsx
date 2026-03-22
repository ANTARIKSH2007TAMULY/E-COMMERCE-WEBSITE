const selectClass =
  "rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-sky-500";

const Filters = ({ categories, category, setCategory, priceRange, setPriceRange, sortBy, setSortBy }) => (
  <section className="grid gap-3 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm md:grid-cols-3">
    <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
      <option value="all">All Categories</option>
      {categories.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>

    <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className={selectClass}>
      <option value="all">All Prices</option>
      <option value="0-100">0-100</option>
      <option value="100-500">100-500</option>
      <option value="500-1000">500-1000</option>
      <option value="1000+">1000+</option>
    </select>

    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={selectClass}>
      <option value="newest">Newest</option>
      <option value="price-asc">Price Low to High</option>
      <option value="price-desc">Price High to Low</option>
      <option value="rating">Top Rated</option>
    </select>
  </section>
);

export default Filters;
