/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useReducer } from 'react';
import cartReducer, {
  initState,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  REMOVE_ALL,
} from '../stores/cartReducer';
import { useLocalStorage } from '~/hooks';
import { LOCAL_CART_KEY } from '~/utils/enum';

export const CartContext = createContext();
const CartProvider = ({ children }) => {
  const { storedValue, setValue } = useLocalStorage(LOCAL_CART_KEY, initState);
  const [cartState, dispatch] = useReducer(cartReducer, storedValue);
  useEffect(() => {
    setValue(cartState);
  }, [cartState]);

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

  const removeAll = () => {
    dispatch({
      type: REMOVE_ALL,
    });
  };
  return (
    <CartContext.Provider
      value={{
        cart: cartState.cart,
        addToCart,
        removeFromCart,
        removeAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
