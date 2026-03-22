import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import ProductGrid from "../components/ProductGrid";
import StatusView from "../components/StatusView";
import useDebounce from "../hooks/useDebounce";
import useProducts from "../hooks/useProducts";

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [source, setSource] = useState("fakestore");

  const debouncedSearch = useDebounce(search, 350);
  const { categories, filteredProducts, loading, error } = useProducts({
    search: debouncedSearch,
    category,
    priceRange,
    sortBy,
    source,
  });

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">Products</h1>
        <p className="mt-1 text-sm text-slate-600">Find items fast with source switch, smart search, tabs, filters and sorting.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm">
        <span className="source-label text-sm font-semibold text-slate-700">Categories:</span>
        <button
          onClick={() => {
            setSource("fakestore");
            setCategory("all");
          }}
          className={`source-chip rounded-xl px-3 py-2 text-sm font-semibold transition ${
            source === "fakestore" ? "source-chip-active" : ""
          }`}
        >
          Electronics and Clothes
        </button>
        <button
          onClick={() => {
            setSource("dummyjson");
            setCategory("all");
          }}
          className={`source-chip rounded-xl px-3 py-2 text-sm font-semibold transition ${
            source === "dummyjson" ? "source-chip-active" : ""
          }`}
        >
          Accesories
        </button>
      </div>

      <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm">
        <SearchBar value={search} onChange={setSearch} />
        <div className="mt-4 flex flex-wrap gap-2">
          {["all", ...categories].map((tab) => (
            <button
              key={tab}
              onClick={() => setCategory(tab)}
              className={`category-chip rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                category === tab ? "category-chip-active" : ""
              }`}
            >
              {tab === "all" ? "All Products" : tab}
            </button>
          ))}
        </div>
      </div>

      <Filters
        categories={categories}
        category={category}
        setCategory={setCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {loading && <StatusView message="Loading products..." />}
      {error && <StatusView message={error} />}
      {!loading && !error && filteredProducts.length === 0 && <StatusView message="No products match your filters." />}
      {!loading && !error && filteredProducts.length > 0 && <ProductGrid products={filteredProducts} />}
    </section>
  );
};

export default Products;
