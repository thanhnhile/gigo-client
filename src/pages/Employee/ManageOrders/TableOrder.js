import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'ID',
    width: '50px',
    selector: (row) => row.id,
  },
  {
    name: 'Ngày',
    selector: (row) =>
      row.createdDate.slice(0, 10).split('-').reverse().join('/'),
  },
  {
    name: 'Địa chỉ',
    grow: 3,
    selector: (row) => row.customer.address,
  },
  {
    name: 'SĐT',
    selector: (row) => row.customer.phone,
  },
  {
    name: 'Tổng đơn',
    selector: (row) => row.total,
  },
  {
    name: 'Phương thức',
    selector: (row) => row.orderType,
  },
  {
    name: 'Trạng thái',
    selector: (row) => row.status,
  },
  {
    name: 'Chi tiết',
    selector: (row) => row.status,
  },
];

const data = [
  {
    id: 16,
    status: 0,
    orderType: 2,
    pay: false,
    total: 185000.0,
    details: [
      {
        detail_id: 25,
        price: 110000.0,
        quantity: 2,
        size: 'M',
        product_id: 1,
        productName: 'Tra sua full topping 2',
        imgURL:
          'https://product.hstatic.net/1000075078/product/1669736893_hi-tea-vai_82726e3ec8b445d8a76e2960b9a16f67_large.png',
      },
      {
        detail_id: 26,
        price: 55000.0,
        quantity: 1,
        size: 'S',
        product_id: 1,
        productName: 'Tra sua full topping 2',
        imgURL:
          'https://product.hstatic.net/1000075078/product/1669736893_hi-tea-vai_82726e3ec8b445d8a76e2960b9a16f67_large.png',
      },
    ],
    customer: {
      id: 1,
      name: 'le thanh nhi',
      phone: '0975802555',
      address: 'số 10, vo van ngan',
      provinceId: 1,
      districtId: 1,
      accountUsername: null,
    },
    employee_name: null,
    store: {
      id: 3,
      storeName: 'Gigo Thu Duc 5',
      provinceId: 1,
      districtId: 1,
      address: 'so 1, vo van ngan',
    },
    createdDate: '2022-12-19T07:27:18.000+00:00',
    account_username: '0975802554',
  },
  {
    id: 15,
    status: 0,
    orderType: 1,
    pay: false,
    total: 55000.0,
    details: [
      {
        detail_id: 22,
        price: 55000.0,
        quantity: 1,
        size: 'S',
        product_id: 3,
        productName: 'Tra sua full topping 2',
        imgURL:
          'https://product.hstatic.net/1000075078/product/1669736893_hi-tea-vai_82726e3ec8b445d8a76e2960b9a16f67_large.png',
      },
    ],
    customer: {
      id: 15,
      name: 'Lê Thị Thanh Nhi',
      phone: '0975802554',
      address: 'Long Đại, Long Vĩnh, Châu Thành',
      provinceId: 1,
      districtId: 1,
      accountUsername: null,
    },
    employee_name: null,
    store: {
      id: 3,
      storeName: 'Gigo Thu Duc 5',
      provinceId: 1,
      districtId: 1,
      address: 'so 1, vo van ngan',
    },
    createdDate: '2022-12-18T04:15:26.000+00:00',
    account_username: null,
  },
  {
    id: 12,
    status: 0,
    orderType: 2,
    pay: false,
    total: 55000.0,
    details: [
      {
        detail_id: 12,
        price: 35000.0,
        quantity: 1,
        size: 'S',
        product_id: 2,
        productName: 'Tra sua full topping 2',
        imgURL:
          'https://product.hstatic.net/1000075078/product/1669736893_hi-tea-vai_82726e3ec8b445d8a76e2960b9a16f67_large.png',
      },
    ],
    customer: {
      id: 14,
      name: 'Lê Thị Thanh Nhi',
      phone: '0975802554',
      address: 'Long Đại, Long Vĩnh, Châu Thành',
      provinceId: 1,
      districtId: 1,
      accountUsername: null,
    },
    employee_name: null,
    store: {
      id: 3,
      storeName: 'Gigo Thu Duc 5',
      provinceId: 1,
      districtId: 1,
      address: 'so 1, vo van ngan',
    },
    createdDate: '2022-12-18T04:04:34.000+00:00',
    account_username: null,
  },
  {
    id: 11,
    status: 0,
    orderType: 1,
    pay: false,
    total: 35000.0,
    details: [
      {
        detail_id: 10,
        price: 35000.0,
        quantity: 1,
        size: 'S',
        product_id: 2,
        productName: 'Tra sua full topping 2',
        imgURL:
          'https://product.hstatic.net/1000075078/product/1669736893_hi-tea-vai_82726e3ec8b445d8a76e2960b9a16f67_large.png',
      },
    ],
    customer: {
      id: 13,
      name: 'Lê Thị Thanh Nhi',
      phone: '0975802554',
      address: 'Long Đại, Long Vĩnh, Châu Thành',
      provinceId: 1,
      districtId: 1,
      accountUsername: null,
    },
    employee_name: null,
    store: {
      id: 3,
      storeName: 'Gigo Thu Duc 5',
      provinceId: 1,
      districtId: 1,
      address: 'so 1, vo van ngan',
    },
    createdDate: '2022-12-18T03:57:31.000+00:00',
    account_username: null,
  },
  {
    id: 9,
    status: 0,
    orderType: 1,
    pay: false,
    total: 70000.0,
    details: [
      {
        detail_id: 6,
        price: 35000.0,
        quantity: 1,
        size: null,
        product_id: 2,
        productName: 'Tra sua full topping 2',
        imgURL:
          'https://product.hstatic.net/1000075078/product/1669736893_hi-tea-vai_82726e3ec8b445d8a76e2960b9a16f67_large.png',
      },
    ],
    customer: {
      id: 1,
      name: 'le thanh nhi',
      phone: '0975802555',
      address: 'số 10, vo van ngan',
      provinceId: 1,
      districtId: 1,
      accountUsername: null,
    },
    employee_name: null,
    store: {
      id: 3,
      storeName: 'Gigo Thu Duc 5',
      provinceId: 1,
      districtId: 1,
      address: 'so 1, vo van ngan',
    },
    createdDate: '2022-12-18T03:51:07.000+00:00',
    account_username: '0975802554',
  },
  {
    id: 7,
    status: 0,
    orderType: 2,
    pay: false,
    total: 55000.0,
    details: [],
    customer: {
      id: 1,
      name: 'le thanh nhi',
      phone: '0975802555',
      address: 'số 10, vo van ngan',
      provinceId: 1,
      districtId: 1,
      accountUsername: null,
    },
    employee_name: null,
    store: {
      id: 3,
      storeName: 'Gigo Thu Duc 5',
      provinceId: 1,
      districtId: 1,
      address: 'so 1, vo van ngan',
    },
    createdDate: '2022-12-17T17:12:06.000+00:00',
    account_username: '0975802554',
  },
];

const TableOrder = ({ list }) => {
  return (
    <div className='table-wrapper'>
      <DataTable pagination columns={columns} data={data} />
    </div>
  );
};

export default TableOrder;
