import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaHeart, FaStar } from "react-icons/fa";
import { getProductById } from "../services/api";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import { formatCurrency } from "../utils/helpers";
import StatusView from "../components/StatusView";

const ProductDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source") || "fakestore";
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const { toggleWishlist } = useWishlist();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getProductById(id, source);
        setProduct(data);
      } catch {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, source]);

  if (loading) return <StatusView message="Loading details..." />;
  if (error) return <StatusView message={error} />;
  if (!product) return <StatusView message="Product not found." />;

  return (
    <section className="grid gap-8 rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg md:grid-cols-2 md:p-8">
      <div className="rounded-2xl bg-slate-50 p-4">
      <Swiper className="w-full">
        {(product.images?.length ? product.images : [product.image, product.image]).map((img, index) => (
          <SwiperSlide key={`${img}-${index}`}>
            <img src={img} alt={product.title} className="mx-auto h-80 object-contain" />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
      <div className="space-y-4">
        <p className="inline-block rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sky-700">
          {product.category}
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-slate-900">{product.title}</h1>
        <p className="text-slate-600">{product.description}</p>
        <p className="flex items-center gap-1 text-amber-600">
          <FaStar /> {product.rating?.rate ?? 0} ({product.rating?.count ?? 0})
        </p>
        <p className="text-4xl font-extrabold text-slate-900">{formatCurrency(product.price)}</p>
        <div className="flex gap-2">
          <button
            onClick={() => addToCart(product)}
            className="rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:from-sky-700 hover:to-indigo-700"
          >
            Add to Cart
          </button>
          <button
            onClick={() => toggleWishlist(product)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-rose-50"
          >
            <FaHeart /> Add to Wishlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
