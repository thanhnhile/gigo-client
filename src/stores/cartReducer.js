import { toast } from 'react-toastify';
export const initState = { cart: [] };

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const REMOVE_ALL = 'REMOVE_ALL';

const addToCart = (state, product) => {
  console.log(state.cart);
  console.log('ADDING TO CART ', product.id);
  const updatedCart = [...state.cart];
  const index = updatedCart.findIndex(
    (item) =>
      Number.parseInt(item.id) === Number.parseInt(product.id) &&
      item.size === product.size
  );
  if (index >= 0) {
    const updatedItem = { ...updatedCart[index] };
    updatedItem.quantity += product.quantity;
    updatedCart[index] = updatedItem;
  } else {
    updatedCart.push(product);
  }
  toast.success('Thêm giỏ hàng thành công', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
  });
  return { ...state, cart: updatedCart };
};
const removeFromCart = (state, productId) => {
  console.log(state.cart);
  const updatedCart = [...state.cart];
  const index = updatedCart.findIndex(
    (item) => Number.parseInt(item.id) === Number.parseInt(productId)
  );
  if (index >= 0) {
    updatedCart.splice(index, 1);
  }
  toast.success('Xóa sản phẩm khỏi giỏ hàng', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
  });
  return { ...state, cart: updatedCart };
};
const removeAll = (state) => {
  return { ...state, cart: [] };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addToCart(state, action.payload);
    case REMOVE_PRODUCT:
      return removeFromCart(state, action.payload);
    case REMOVE_ALL:
      return removeAll(state);
    default:
      return state;
  }
};

export default cartReducer;
