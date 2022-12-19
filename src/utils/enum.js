export const LOCAL_STORAGE_KEY = 'GIGO_USER';
export const ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
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

export const ORDER_STATUS = {
  0: 'Chờ xác nhận',
  1: 'Đang giao',
  2: 'Giao thành công',
  3: 'Đã hủy',
};
