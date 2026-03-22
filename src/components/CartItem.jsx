import { formatCurrency } from "../utils/helpers";

const CartItem = ({ item, onUpdate, onRemove }) => (
  <article className="grid gap-3 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm md:grid-cols-[100px_1fr_auto] md:items-center">
    <div className="rounded-xl bg-slate-50 p-2">
      <img src={item.image} alt={item.title} className="h-20 w-20 object-contain" />
    </div>
    <div>
      <h3 className="line-clamp-2 font-semibold text-slate-800">{item.title}</h3>
      <p className="text-slate-600">{formatCurrency(item.price)}</p>
      <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
        <button onClick={() => onUpdate(item.productKey, item.quantity - 1)} className="rounded-full border bg-white px-2">
          -
        </button>
        <span className="min-w-5 text-center text-sm font-semibold">{item.quantity}</span>
        <button onClick={() => onUpdate(item.productKey, item.quantity + 1)} className="rounded-full border bg-white px-2">
          +
        </button>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold text-slate-900">{formatCurrency(item.price * item.quantity)}</p>
      <button onClick={() => onRemove(item.productKey)} className="mt-2 text-sm font-medium text-rose-600">
        Remove
      </button>
    </div>
  </article>
);

export default CartItem;
