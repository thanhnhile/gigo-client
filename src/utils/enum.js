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
    name: 'Chờ xử lý',
    status: 'InProgress',
  },
  DELIVERING: {
    id: 1,
    name: 'Đang giao',
    status: 'Delivering',
  },
  SUCCESS: {
    id: 2,
    name: 'Thành công',
    status: 'Success',
  },
  CANCELED: {
    id: 3,
    name: 'Đã hủy',
    status: 'Canceled',
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
