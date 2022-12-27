import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomDataTable from '~/components/CustomDataTable';
import { httpGetOrderByStoreId } from '~/apiServices/orderServices';
import { useAuth } from '~/hooks';
import { ORDER_STATUS } from '~/utils/enum';
import { formatPrice } from '~/utils/format';
import { DELIVERY_METHOD } from '~/utils/enum';
import { Icon } from '@iconify/react';

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
    name: 'Nhân viên',
    selector: (row) => row.employee_name,
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
];
const style = {
  tableWrapper: {
    marginTop: '25px',
  },
};
const Dashboard = () => {
  const { auth } = useAuth();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getOrderByStoreId = async () => {
      const res = await httpGetOrderByStoreId(auth?.employeeInfo?.storeId);
      if (res.data) {
        const rowData = res.data.filter(
          (item) => item.status === ORDER_STATUS.IN_PROGRESS.id
        );
        setData(rowData);
      }
    };
    getOrderByStoreId();
  }, []);
  return (
    <div>
      <h1>Đơn hàng gần đây</h1>
      <div style={style.tableWrapper}>
        <CustomDataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
