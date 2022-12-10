export const initState = { cart: [] };

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

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
  return { ...state, cart: updatedCart };
};
const removeFromCart = (state, productId) => {
  console.log(state.cart);
  console.log('REMOVING FROM CART');
  const updatedCart = [...state.cart];
  const index = updatedCart.findIndex(
    (item) => Number.parseInt(item.id) === Number.parseInt(productId)
  );
  if (index >= 0) {
    updatedCart.splice(index, 1);
  }
  return { ...state, cart: updatedCart };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addToCart(state, action.payload);
    case REMOVE_PRODUCT:
      return removeFromCart(state, action.payload);
    default:
      return state;
  }
};

export default cartReducer;
