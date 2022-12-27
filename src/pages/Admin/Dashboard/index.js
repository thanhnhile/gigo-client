import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { Icon } from '@iconify/react';
import CustomDataTable from '~/components/CustomDataTable';
import { formatPrice } from '~/utils/format';
import { getAdminStatistics } from '~/apiServices/statisticsServices';

const cx = className.bind(styles);
const data = [
  {
    store: {
      id: 1,
      name: 'Gigo Thu Duc',
      address: 'so 1, Vo Van Ngan',
    },
    countOrders: 50,
  },
  {
    store: {
      id: 1,
      name: 'Gigo Thu Duc',
      address: 'so 1, Vo Van Ngan',
    },
    countOrders: 50,
  },
  {
    store: {
      id: 1,
      name: 'Gigo Thu Duc',
      address: 'so 1, Vo Van Ngan',
    },
    countOrders: 50,
  },
  {
    store: {
      id: 1,
      name: 'Gigo Thu Duc',
      address: 'so 1, Vo Van Ngan',
    },
    countOrders: 50,
  },
];
const countOrderColumns = [
  {
    name: 'ID',
    width: '50px',
    selector: (row) => row.storeId,
  },
  {
    name: 'Tên cửa hàng',
    selector: (row) => row.storeName,
    grow: 2,
  },
  {
    name: 'Địa chỉ',
    selector: (row) => row.storeAddress,
    grow: 2,
  },
  {
    name: 'Tổng số đơn',
    selector: (row) => row.countOrders,
    style: {
      color: 'var(--primary-color)',
      cursor: 'pointer',
      fontSize: '1.8rem',
    },
  },
];
const revenueOrderColumns = [];

const Dashboard = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const getStatistics = async () => {
      const res = await getAdminStatistics();
      if (res.data) {
        console.log(res.data);
        setData(res.data);
      }
    };
    getStatistics();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('header-item', 'order')}>
          <Icon icon='ri:bill-fill' />
          <h5>Đơn hàng Hôm nay</h5>
          <h4>{data.countOrders}</h4>
        </div>
        <div className={cx('header-item', 'total')}>
          <Icon icon='mdi:cash-check' />
          <h5>Doanh thu</h5>
          <h4>{formatPrice(data.total)}</h4>
        </div>
        <div className={cx('header-item', 'product')}>
          <Icon icon='material-symbols:shopping-bag-outline' />
          <h5>Sản phẩm</h5>
          <h4>{data.countProducts}</h4>
        </div>
      </div>
      <div className={cx('order-status')}>
        <div className={cx('order-status-item')}>
          <div className={cx('left')}>
            <Icon icon='material-symbols:pending-actions' />
          </div>
          <div className={cx('right')}>
            <h5>Chờ xác nhận</h5>
            <h4>{data.inProgress}</h4>
          </div>
        </div>
        <div className={cx('order-status-item')}>
          <div className={cx('left')}>
            <Icon icon='mdi:delivery-dining-electric-outline' />
          </div>
          <div className={cx('right')}>
            <h5>Đang giao</h5>
            <h4>{data.delivering}</h4>
          </div>
        </div>
        <div className={cx('order-status-item')}>
          <div className={cx('left')}>
            <Icon icon='icon-park-outline:file-success-one' />
          </div>
          <div className={cx('right')}>
            <h5>Thành công</h5>
            <h4>{data.success}</h4>
          </div>
        </div>
        <div className={cx('order-status-item')}>
          <div className={cx('left')}>
            <Icon icon='mdi:file-cancel-outline' />
          </div>
          <div className={cx('right')}>
            <h5>Đã hủy</h5>
            <h4>{data.canceled}</h4>
          </div>
        </div>
      </div>
      <div className={cx('store')}>
        <h3>Doanh thu trong tuần</h3>
        <CustomDataTable data={data.stores} columns={revenueOrderColumns} />
      </div>
      <div className={cx('store')}>
        <h3>Doanh số theo cửa hàng trong ngày</h3>
        <CustomDataTable data={data.stores} columns={countOrderColumns} />
      </div>
    </div>
  );
};

export default Dashboard;
