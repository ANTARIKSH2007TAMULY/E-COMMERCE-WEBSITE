import { useEffect, useMemo, useState } from "react";
import { getCategories, getProducts } from "../services/api";

const inPriceRange = (price, range) => {
  if (range === "all") return true;
  if (range === "0-100") return price < 100;
  if (range === "100-500") return price >= 100 && price < 500;
  if (range === "500-1000") return price >= 500 && price < 1000;
  return price >= 1000;
};

const useProducts = ({ search, category, priceRange, sortBy, source }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const [productsData, categoriesData] = await Promise.all([getProducts(source), getCategories(source)]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [source]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      result = result.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (category !== "all") {
      result = result.filter((product) => product.category === category);
    }
    result = result.filter((product) => inPriceRange(product.price, priceRange));

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
    if (sortBy === "newest") result.sort((a, b) => b.id - a.id);

    return result;
  }, [products, search, category, priceRange, sortBy]);

  return { categories, filteredProducts, loading, error };
};

export default useProducts;
