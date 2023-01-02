export const LOCAL_STORAGE_KEY = 'GOGI_USER';
export const LOCAL_CART_KEY = 'GOGI_CART';
export const ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  EMPLOYEE: 'EMPLOYEE',
};
export const DELIVERY_METHOD = [
  {
    id: 0,
    name: 'Trực tiếp',
    price: 0,
  },
  {
    id: 1,
    name: 'Giao hàng',
    price: 20000,
  },
];

export const ORDER_STATUS = {
  IN_PROGRESS: {
    id: 0,
    name: 'In Progress',
    status: 'inProgress',
  },
  DELIVERING: {
    id: 1,
    name: 'Delivering',
    status: 'delivering',
  },
  SUCCESS: {
    id: 2,
    name: 'Success',
    status: 'success',
  },
  CANCELED: {
    id: 3,
    name: 'Canceled',
    status: 'canceled',
  },
};
export const STATUS = [
  {
    id: 0,
    value: true,
    name: 'Hoạt động',
  },
  {
    id: 1,
    value: false,
    name: 'Ẩn',
  },
];
