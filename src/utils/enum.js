export const LOCAL_STORAGE_KEY = 'GIGO_USER';
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

export const ORDER_STATUS = [
  {
    id: 0,
    name: 'In Progress',
    status: 'inProgress',
  },
  {
    id: 1,
    name: 'Delivering',
    status: 'delivering',
  },
  {
    id: 2,
    name: 'Success',
    status: 'success',
  },
  {
    id: 3,
    name: 'Canceled',
    status: 'canceled',
  },
];
export const STATUS = [
  {
    id:0,
    value: true,
    name: 'Hoạt động',
  },
  {
    id:1,
    value: false,
    name: 'Ẩn',
  },
];
