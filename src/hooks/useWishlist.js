import { useContext } from "react";
import StoreContext from "../context/StoreContext";

const useWishlist = () => {
  const { wishlistItems, toggleWishlist } = useContext(StoreContext);
  return { wishlistItems, toggleWishlist };
};

export default useWishlist;
