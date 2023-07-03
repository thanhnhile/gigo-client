import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomDataTable from '~/components/CustomDataTable';
import { useAuth } from '~/hooks';
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
      <Link to={`/employee/orders/${row.id}`}>
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
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const url = `http://localhost:8089/subscribe/stores/${auth?.employeeInfo?.storeId}/employees/${auth?.employeeInfo?.employeeId}`;
    const eventSource = new EventSource(url);
    eventSource.addEventListener('LIST_ORDERS_UPDATE', (event) => {
      const data = JSON.parse(event.data);
      if (data.length > 0) {
        setData(data);
        setIsLoading(false);
      }
    });
    eventSource.onopen = (e) => console.log('SSE is connected');
    eventSource.onerror = (event) => {
      if (event.target.readyState === EventSource.CLOSED) {
        console.log('SSE closed (' + event.target.readyState + ')');
        eventSource.close();
      }
    };
    return () => {
      eventSource.close();
      console.log('SSE is closed');
    };
  }, []);
  return (
    <div>
      <h1>Đơn hàng gần đây - {data?.length || 0}</h1>
      {isLoading ? (
        <div className='loader'></div>
      ) : (
        <div style={style.tableWrapper}>
          <CustomDataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
