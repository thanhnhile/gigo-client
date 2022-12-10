import { createContext, useReducer } from 'react';
import cartReducer, {
  initState,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
} from '../stores/cartReducer';

export const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initState);

  const addToCart = (product) => {
    dispatch({
      type: ADD_PRODUCT,
      payload: product,
    });
  };
  const removeFromCart = (productId) => {
    dispatch({
      type: REMOVE_PRODUCT,
      payload: productId,
    });
  };
  return (
    <CartContext.Provider
      value={{
        cart: cartState.cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
