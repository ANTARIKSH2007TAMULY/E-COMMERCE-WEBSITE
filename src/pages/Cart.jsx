import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import StatusView from "../components/StatusView";
import useCart from "../hooks/useCart";
import { formatCurrency } from "../utils/helpers";

const Cart = () => {
  const { cartItems, updateCartQuantity, removeFromCart, subtotal, tax, total } = useCart();

  if (!cartItems.length) return <StatusView message="Your cart is empty." />;

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-3">
        <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm">
          <h1 className="text-2xl font-extrabold">Shopping Cart</h1>
          <p className="mt-1 text-sm text-slate-600">Review your items and proceed to checkout.</p>
        </div>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} onUpdate={updateCartQuantity} onRemove={removeFromCart} />
        ))}
      </div>
      <aside className="h-fit rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm">
        <h2 className="text-lg font-bold">Order Summary</h2>
        <div className="mt-3 space-y-2 text-sm">
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </p>
          <p className="flex justify-between">
            <span>Tax</span>
            <span>{formatCurrency(tax)}</span>
          </p>
          <p className="flex justify-between border-t border-slate-200 pt-2 text-base font-extrabold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </p>
        </div>
        <Link
          to="/checkout"
          className="mt-4 block rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white"
        >
          Checkout
        </Link>
      </aside>
    </section>
  );
};

export default Cart;
