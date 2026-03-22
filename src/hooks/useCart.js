import { useContext, useMemo } from "react";
import StoreContext from "../context/StoreContext";
import { calculateCartSubtotal, calculateTax } from "../utils/helpers";

const useCart = () => {
  const ctx = useContext(StoreContext);
  const subtotal = useMemo(() => calculateCartSubtotal(ctx.cartItems), [ctx.cartItems]);
  const tax = useMemo(() => calculateTax(subtotal), [subtotal]);
  const total = subtotal + tax;
  return { ...ctx, subtotal, tax, total };
};

export default useCart;
