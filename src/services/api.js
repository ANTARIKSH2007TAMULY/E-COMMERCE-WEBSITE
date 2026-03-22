import axios from "axios";

const fakeStoreApi = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
});

const dummyApi = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

const normalizeFakeProduct = (item) => ({
  id: item.id,
  source: "fakestore",
  sourceId: item.id,
  sourceKey: `fakestore-${item.id}`,
  title: item.title,
  description: item.description,
  category: item.category,
  price: item.price,
  image: item.image,
  images: [item.image].filter(Boolean),
  rating: { rate: item.rating?.rate ?? 0, count: item.rating?.count ?? 0 },
});

const normalizeDummyProduct = (item) => ({
  id: item.id,
  source: "dummyjson",
  sourceId: item.id,
  sourceKey: `dummyjson-${item.id}`,
  title: item.title,
  description: item.description,
  category: item.category,
  price: item.price,
  image: item.thumbnail || item.images?.[0] || "",
  images: item.images?.length ? item.images : [item.thumbnail].filter(Boolean),
  rating: { rate: item.rating ?? 0, count: item.stock ?? 0 },
});

export const getProducts = async (source = "fakestore") => {
  if (source === "dummyjson") {
    const { data } = await dummyApi.get("/products?limit=100");
    return data.products.map(normalizeDummyProduct);
  }
  const { data } = await fakeStoreApi.get("/products");
  return data.map(normalizeFakeProduct);
};

export const getCategories = async (source = "fakestore") => {
  if (source === "dummyjson") {
    const { data } = await dummyApi.get("/products/categories");
    if (Array.isArray(data) && typeof data[0] === "string") return data;
    return (data || []).map((item) => item.slug || item.name).filter(Boolean);
  }
  const { data } = await fakeStoreApi.get("/products/categories");
  return data;
};

export const getProductById = async (id, source = "fakestore") => {
  if (source === "dummyjson") {
    const { data } = await dummyApi.get(`/products/${id}`);
    return normalizeDummyProduct(data);
  }
  const { data } = await fakeStoreApi.get(`/products/${id}`);
  return normalizeFakeProduct(data);
};
