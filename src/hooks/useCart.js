import { useContext, useDebugValue } from 'react';
import { CartContext } from '../contexts/CartProvider';
const useCart = () => {
  const { cart } = useContext(CartContext);
  useDebugValue(cart, (auth) => (auth?.length ? 'Cart' : 'Empty cart'));
  return useContext(CartContext);
};
export default useCart;
