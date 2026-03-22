import { NavLink } from "react-router-dom";
import { FaCartShopping, FaHeart, FaMoon, FaStore, FaSun } from "react-icons/fa6";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

const navClass = (isDark) => ({ isActive }) =>
  `rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${
    isActive
      ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-sm"
      : isDark
        ? "text-slate-200 hover:bg-slate-800 hover:text-white"
        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
  }`;

const Navbar = ({ isDark, onToggleTheme }) => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  return (
    <header
      className={`sticky top-0 z-20 border-b backdrop-blur-xl ${
        isDark ? "border-slate-700/60 bg-slate-950/70" : "border-white/40 bg-white/65"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6 lg:px-10">
        <NavLink
          to="/"
          className={`group flex items-center gap-2 text-lg font-extrabold ${isDark ? "text-slate-100" : "text-slate-900"}`}
        >
          <FaStore className="text-sky-600 drop-shadow-sm transition group-hover:scale-110" />
          Product Explorer
        </NavLink>
        <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
          <button
            onClick={onToggleTheme}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
              isDark
                ? "border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {isDark ? <FaSun /> : <FaMoon />}
            {isDark ? "Light" : "Dark"}
          </button>
          <NavLink to="/products" className={navClass(isDark)}>
            Products
          </NavLink>
          <NavLink to="/wishlist" className={navClass(isDark)}>
            <span className="inline-flex items-center gap-1">
              <FaHeart /> Wishlist ({wishlistItems.length})
            </span>
          </NavLink>
          <NavLink to="/cart" className={navClass(isDark)}>
            <span className="inline-flex items-center gap-1">
              <FaCartShopping /> Cart ({cartItems.length})
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
