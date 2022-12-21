import React from 'react';
import DataTable from 'react-data-table-component';
import { Icon } from '@iconify/react';
import { DELIVERY_METHOD, ORDER_STATUS } from '~/utils/enum';

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
    selector: (row) => {
      return row.orderType === DELIVERY_METHOD[0].id ? (
        <div>OFFLINE</div>
      ) : (
        <div>OFFLINE</div>
      );
    },
  },
  {
    name: 'Trạng thái',
    selector: (row) => {
      return (
        <div className={ORDER_STATUS[row.status].name}>
          {ORDER_STATUS[row.status].name}
        </div>
      );
    },
  },
  {
    name: 'Chi tiết',
    button: true,
    cell: (row) => (
      <Icon
        onClick={() => handleViewMore(row.id)}
        icon='mdi:eye-plus-outline'
      />
    ),
    style: {
      color: 'var(--primary-color)',
      cursor: 'pointer',
      fontSize: '1.8rem',
    },
  },
];
const customStyles = {
  rows: {
    style: {
      minHeight: '50px', // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
      fontSize: '1.5rem',
      fontWeight: '500',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
      fontSize: '1.2rem',
    },
  },
};
const handleViewMore = (id) => {
  alert('View more ' + id);
};
const TableOrder = ({ data }) => {
  return (
    <div className='table-wrapper'>
      <DataTable
        pagination
        columns={columns}
        data={data}
        customStyles={customStyles}
      />
    </div>
  );
};

export default TableOrder;
