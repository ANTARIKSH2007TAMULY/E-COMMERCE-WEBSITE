import { Link } from "react-router-dom";
import useWishlist from "../hooks/useWishlist";
import useCart from "../hooks/useCart";
import StatusView from "../components/StatusView";
import { formatCurrency } from "../utils/helpers";

const Wishlist = () => {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!wishlistItems.length) return <StatusView message="Your wishlist is empty." />;

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm">
        <h1 className="text-2xl font-extrabold">Wishlist</h1>
        <p className="mt-1 text-sm text-slate-600">Saved products you might want to buy later.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <article key={item.productKey} className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm">
            <Link to={`/products/${item.productId}?source=${item.source || "fakestore"}`}>
              <div className="rounded-xl bg-slate-50 p-4">
                <img src={item.image} alt={item.title} className="mx-auto h-40 object-contain" />
              </div>
            </Link>
            <h3 className="mt-3 line-clamp-2 font-semibold">{item.title}</h3>
            <p className="mt-1 text-sky-700">{formatCurrency(item.price)}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => addToCart({ ...item, id: item.productId, sourceKey: item.productKey })}
                className="rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist({ ...item, id: item.productId, sourceKey: item.productKey })}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Wishlist;
