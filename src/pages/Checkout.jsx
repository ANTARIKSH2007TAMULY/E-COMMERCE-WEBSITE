import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import useCart from "../hooks/useCart";
import { formatCurrency } from "../utils/helpers";

const schema = yup.object({
  fullName: yup.string().min(3).required(),
  email: yup.string().email().required(),
  address: yup.string().min(8).required(),
});

const Checkout = () => {
  const { cartItems, subtotal, tax, total, clearCart } = useCart();
  const [validationError, setValidationError] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (values) => {
    try {
      setValidationError("");
      await schema.validate(values);
      toast.success("Order placed successfully");
      clearCart();
      reset();
    } catch (error) {
      setValidationError(error.message || "Please check your details");
    }
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm">
        <h1 className="text-2xl font-extrabold">Checkout</h1>
        <input
          {...register("fullName")}
          placeholder="Full Name"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-sky-500"
        />
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-sky-500"
        />
        <textarea
          {...register("address")}
          placeholder="Shipping Address"
          className="h-28 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-sky-500"
        />
        {validationError && <p className="text-sm text-rose-600">{validationError}</p>}
        <button type="submit" className="rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white">
          Place Order
        </button>
      </form>

      <aside className="h-fit rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm">
        <h2 className="text-lg font-bold">Order Summary</h2>
        <div className="mt-2 space-y-2">
          {cartItems.map((item) => (
            <p key={item.id} className="flex justify-between text-sm">
              <span className="line-clamp-1">{item.title} x {item.quantity}</span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </p>
          ))}
        </div>
        <div className="mt-4 space-y-2 border-t pt-3 text-sm">
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </p>
          <p className="flex justify-between">
            <span>Tax</span>
            <span>{formatCurrency(tax)}</span>
          </p>
          <p className="flex justify-between text-base font-extrabold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </p>
        </div>
      </aside>
    </section>
  );
};

export default Checkout;
