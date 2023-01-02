import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { DELIVERY_METHOD, ORDER_STATUS } from '~/utils/enum';
import Status from '~/components/Status';
import { formatPrice } from '~/utils/format';
import CustomDataTable from '~/components/CustomDataTable';

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
    selector: (row) => formatPrice(row.total),
  },
  {
    name: 'Phương thức',
    selector: (row) => {
      return row.orderType === DELIVERY_METHOD[0].id ? (
        <div>Tại cửa hàng</div>
      ) : (
        <div>Giao hàng</div>
      );
    },
  },
  {
    name: 'Trạng thái',
    selector: (row) => {
      switch (row.status) {
        case 0:
          return <Status text={ORDER_STATUS.IN_PROGRESS.name} inProgress />;
        case 1:
          return <Status text={ORDER_STATUS.DELIVERING.name} delivering />;
        case 2:
          return <Status text={ORDER_STATUS.SUCCESS.name} success />;
        case 3:
          return <Status text={ORDER_STATUS.CANCELED.name} canceled />;
        default:
          return <Status text={ORDER_STATUS.IN_PROGRESS.name} inProgress />;
      }
    },
  },
  {
    name: 'Chi tiết',
    button: true,
    cell: (row) => (
      <Link to={`/employee/order/${row.id}`}>
        {' '}
        <Icon icon='mdi:eye-plus-outline' />
      </Link>
    ),
    style: {
      color: 'var(--primary-color)',
      cursor: 'pointer',
      fontSize: '1.8rem',
    },
  },
  {
    name: 'Nhân viên',
    selector: (row) => row.employee_name,
  },
];
const TableOrder = ({ data }) => {
  return (
    <div className='table-wrapper'>
      <CustomDataTable data={data} columns={columns} />
    </div>
  );
};

export default TableOrder;
