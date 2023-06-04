/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useReducer } from 'react';
import cartReducer, {
  initState,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  REMOVE_ALL,
  PLUS_QUANTITY,
  MINUS_QUANTITY,
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
  const removeFromCart = (id) => {
    dispatch({
      type: REMOVE_PRODUCT,
      payload: id,
    });
  };

  const removeAll = () => {
    dispatch({
      type: REMOVE_ALL,
    });
  };

  const plusQuantity = (id) => {
    dispatch({
      type: PLUS_QUANTITY,
      payload: id,
    });
  };

  const minusQuantity = (id) => {
    dispatch({
      type: MINUS_QUANTITY,
      payload: id,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart: cartState.cart,
        addToCart,
        removeFromCart,
        removeAll,
        plusQuantity,
        minusQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
