import { createContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const StoreContext = createContext(null);

const readStorage = (key, fallback = []) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => readStorage("cartItems"));
  const [wishlistItems, setWishlistItems] = useState(() => readStorage("wishlistItems"));

  const persist = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const getProductKey = (product) => product.sourceKey || `${product.source || "fakestore"}-${product.id}`;

  const addToCart = (product) => {
    const productKey = getProductKey(product);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productKey === productKey);
      const next = existing
        ? prev.map((item) =>
            item.productKey === productKey ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [
            ...prev,
            {
              id: uuidv4(),
              productId: product.id,
              productKey,
              source: product.source || "fakestore",
              title: product.title,
              image: product.image,
              price: product.price,
              quantity: 1,
            },
          ];
      persist("cartItems", next);
      return next;
    });
    toast.success("Added to cart");
  };

  const removeFromCart = (productKey) => {
    setCartItems((prev) => {
      const next = prev.filter((item) => item.productKey !== productKey);
      persist("cartItems", next);
      return next;
    });
  };

  const updateCartQuantity = (productKey, quantity) => {
    setCartItems((prev) => {
      const next =
        quantity <= 0
          ? prev.filter((item) => item.productKey !== productKey)
          : prev.map((item) => (item.productKey === productKey ? { ...item, quantity } : item));
      persist("cartItems", next);
      return next;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    persist("cartItems", []);
  };

  const toggleWishlist = (product) => {
    const productKey = getProductKey(product);
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.productKey === productKey);
      const next = exists
        ? prev.filter((item) => item.productKey !== productKey)
        : [
            ...prev,
            {
              productId: product.id,
              productKey,
              source: product.source || "fakestore",
              title: product.title,
              image: product.image,
              price: product.price,
            },
          ];
      persist("wishlistItems", next);
      toast.info(exists ? "Removed from wishlist" : "Added to wishlist");
      return next;
    });
  };

  const value = useMemo(
    () => ({
      cartItems,
      wishlistItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
    }),
    [cartItems, wishlistItems]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export default StoreContext;
