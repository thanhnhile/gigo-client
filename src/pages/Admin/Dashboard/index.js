import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { Icon } from '@iconify/react';
import CustomDataTable from '~/components/CustomDataTable';
import { formatPrice } from '~/utils/format';
import { getAdminStatistics } from '~/apiServices/statisticsServices';
import { httpGetAllOrders } from '../../../apiServices/orderServices';
import { httpGetAllStore } from '~/apiServices/storeServices';
import { ORDER_STATUS } from '~/utils/enum';
import Clickable from '~/components/Clickable';
import Status from '~/components/Status';
import Select from 'react-select';

const cx = className.bind(styles);
const countOrderColumns = [
  {
    name: 'ID',
    width: '50px',
    selector: (row) => row.storeId,
  },
  {
    name: 'Tên cửa hàng',
    selector: (row) => row.storeName,
  },
  {
    name: 'Tổng số đơn',
    width: '150px',
    selector: (row) => row.countOrders,
    style: {
      color: 'var(--primary-color)',
      cursor: 'pointer',
      fontSize: '1.8rem',
    },
  },
  {
    name: 'Địa chỉ',
    selector: (row) => row.storeAddress,
    grow: 2,
  },
];
const revenueOrderColumns = [
  {
    name: 'Ngày',
    selector: (row) => row.date.split('-').reverse().join('/'),
  },
  {
    name: 'Doanh Thu',
    selector: (row) => formatPrice(row.revenue),
  },
  {
    name: 'Đơn thành công',
    selector: (row) => row.countOrders,
  },
];

const orderColumns = [
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
    name: 'Cửa hàng',
    grow: 3,
    selector: (row) => row.store.storeName,
  },
  {
    name: 'Tổng đơn',
    selector: (row) => formatPrice(row.total),
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
    name: 'Nhân viên',
    selector: (row) => row.employee_name,
  },
];

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

  const [orderData, setOrderData] = useState([]);
  const [dataRow, setDataRow] = useState(orderData);
  const [store, setStore] = useState();
  const [status, setStatus] = useState('');
  const getAllOrders = async () => {
    const res = await httpGetAllOrders();
    if (res.data) {
      console.log('orders', res.data);
      setOrderData(res.data);
      setDataRow(res.data);
    }
  };
  const [stores, setStores] = useState([]);
  useEffect(() => {
    const getAllStore = async () => {
      const response = await httpGetAllStore();
      setStores(response.data);
    };
    getAllStore();
  }, []);

  const options = stores.map(s => ({
    label: s.storeName,
    value: s.id
}));
  const handleFilterByStore = async (e) => {
    setStore(e.value);
    const result = orderData.filter(
        (item) => item?.store?.id === Number.parseInt(e.value)
      );
      setDataRow(result);
  };
  const handleFilterByStatus = async (e) => {
    setStatus(e.target.value);
    const result = orderData.filter(
      (item) => item.status === Number.parseInt(e.target.value)
    );
    console.log(result);
    setDataRow(result);
  };
  useEffect(() => {
    getAllOrders();
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
        <h3>Quản lý đơn hàng</h3>
        <div className={cx('filter')}>
          <div className={cx('filter-item', 'icon')}>
            <Icon
              onClick={() => {
                getAllOrders();
              }}
              icon='mdi:reload'
            />
          </div>
          <div className={cx('filter-item')}>
            <Select className={cx('Select')} value={options.find(obj => obj.value === store)}
                    onChange={(e) => handleFilterByStore(e)} options={options} />
          </div>
          <div className={cx('filter-item')}>
            <select
              name='order-status'
              value={status}
              onChange={(e) => handleFilterByStatus(e)}
            >
              {Object.values(ORDER_STATUS).map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className={cx('filter-item')}>
            <Clickable primary text='Downloads' />
          </div>
        </div>
        <CustomDataTable data={dataRow} columns={orderColumns} />
      </div>

      <div className={cx('store')}>
        <h3>Doanh thu theo ngày</h3>
        <CustomDataTable
          data={data.weeklyRevenue}
          columns={revenueOrderColumns}
        />
      </div>

      <div className={cx('store')}>
        <h3>Doanh số theo cửa hàng trong ngày</h3>
        <CustomDataTable data={data.stores} columns={countOrderColumns} />
      </div>
    </div>
  );
};

export default Dashboard;
