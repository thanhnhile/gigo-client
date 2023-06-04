import { toast } from 'react-toastify';
export const initState = { cart: [] };

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const REMOVE_ALL = 'REMOVE_ALL';
export const PLUS_QUANTITY = 'PLUS_QUANTITY';
export const MINUS_QUANTITY = 'MINUS_QUANTITY';

/** 
 * const cartItem = {
      id:
      productId: product.id,
      image: product.img_url,
      name: product.name,
      quantity: quantity,
      size: size,
      price: product.price + surCharge,
    };
*/
const addToCart = (state, cartItem) => {
  const updatedCart = [...state.cart];
  const index = updatedCart.findIndex(
    ({ id, quantity: oldQuantity, ...item }) => {
      const { quantity, ...newItem } = cartItem;
      return JSON.stringify(newItem) === JSON.stringify(item);
    }
  );
  if (index >= 0) {
    const updatedItem = { ...updatedCart[index] };
    updatedItem.quantity += cartItem.quantity;
    updatedCart[index] = updatedItem;
  } else {
    const newItem = { ...cartItem };
    const newId = Math.floor(Date.now() / Math.floor(Math.random() * 1000));
    Object.assign(newItem, { id: newId });
    updatedCart.push(newItem);
  }
  toast.success('Thêm giỏ hàng thành công', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
  });
  return { ...state, cart: updatedCart };
};

const findCartItemIndex = (cart, id) => {
  return cart.findIndex(
    (item) => Number.parseInt(item.id) === Number.parseInt(id)
  );
};

const removeFromCart = (state, id) => {
  const updatedCart = [...state.cart];
  const index = findCartItemIndex(updatedCart, id);
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

const plusQuantity = (state, id) => {
  const updatedCart = [...state.cart];
  const index = findCartItemIndex(updatedCart, id);
  if (index >= 0) {
    const updatedItem = { ...updatedCart[index] };
    updatedItem.quantity++;
    updatedCart[index] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

const minusQuantity = (state, id) => {
  const updatedCart = [...state.cart];
  const index = findCartItemIndex(updatedCart, id);
  if (index >= 0) {
    const updatedItem = { ...updatedCart[index] };
    updatedItem.quantity--;
    updatedCart[index] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addToCart(state, action.payload);
    case REMOVE_PRODUCT:
      return removeFromCart(state, action.payload);
    case REMOVE_ALL:
      return removeAll(state);
    case PLUS_QUANTITY:
      return plusQuantity(state, action.payload);
    case MINUS_QUANTITY:
      return minusQuantity(state, action.payload);
    default:
      return state;
  }
};

export default cartReducer;
