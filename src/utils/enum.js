export const LOCAL_STORAGE_KEY = 'GIGO_USER';
export const ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  EMPLOYEE: 'EMPLOYEE',
};
export const DELIVERY_METHOD = [
  {
    id: 1,
    name: 'Trực tiếp',
    price: 0,
  },
  {
    id: 2,
    name: 'Giao hàng',
    price: 20000,
  },
];

export const ORDER_STATUS = [
  {
    id: 0,
    name: 'Chờ xác nhận',
  },
  {
    id: 1,
    name: 'Đang giao',
  },
  {
    id: 2,
    name: 'Giao thành công',
  },
  {
    id: 3,
    name: 'Đã hủy',
  },
];
