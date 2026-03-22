import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import { formatCurrency } from "../utils/helpers";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const isSaved = wishlistItems.some((item) => item.productKey === product.sourceKey);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-4 shadow-md shadow-slate-200/60 transition"
    >
      <div className="pointer-events-none absolute -right-14 -top-14 h-28 w-28 rounded-full bg-sky-200/30 blur-2xl" />
      <Link to={`/products/${product.sourceId}?source=${product.source}`}>
        <div className="rounded-xl bg-slate-50 p-4">
          <img
            src={product.image}
            alt={product.title}
            className="mx-auto h-44 w-full object-contain transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="mt-4 space-y-2">
        <p className="line-clamp-2 min-h-12 font-semibold text-slate-800">{product.title}</p>
        <p className="inline-block rounded-full border border-sky-100 bg-sky-50 px-2 py-1 text-xs uppercase tracking-wide text-sky-700">
          {product.category}
        </p>
        <p className="flex items-center gap-1 text-sm text-amber-600">
          <FaStar /> {product.rating?.rate ?? 0} ({product.rating?.count ?? 0})
        </p>
        <p className="text-xl font-extrabold text-slate-900">{formatCurrency(product.price)}</p>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:from-sky-700 hover:to-indigo-700"
        >
          Add to Cart
        </button>
        <button
          onClick={() => toggleWishlist(product)}
          className="rounded-xl border border-slate-200 px-3 py-2 transition hover:border-rose-200 hover:bg-rose-50"
        >
          {isSaved ? <FaHeart className="text-rose-500" /> : <FaRegHeart />}
        </button>
      </div>
    </motion.article>
  );
};

export default ProductCard;
