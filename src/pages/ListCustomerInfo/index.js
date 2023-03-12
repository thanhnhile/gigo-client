import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import className from 'classnames/bind';
import styles from './ListCustomerInfo.module.scss';
import Customerinfo from '~/components/Personal/CustomerInfo';
import ListAddress from '../../components/Personal/CustomerListAddress';
import Clickable from '~/components/Clickable';
import { FORM_ACTION } from '../../utils/enum';
import { httpPutSetCustomerInfoDefault } from '~/apiServices/accountServices';
import { httpDeleteCustomer } from '../../apiServices/customerServices';

const cx = className.bind(styles);

const ListCustomerInfo = () => {
  const location = useLocation();
  const { customerId, action } = location.state;
  const [selected, setSelected] = useState([]);
  const [reLoadList, setReloadList] = useState(true);
  const handleSetCustomerDefault = async () => {
    console.log(selected.id);
    const res = await httpPutSetCustomerInfoDefault(selected.id);
    if (res.data) {
      setSelected(res.data);
      toast.success('Lưu thông tin thành công!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else
      toast.error(res.errMsg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
  };
  const handleDeleteCustomerInfo = async () => {
    const res = await httpDeleteCustomer(selected.id);
    if (res.data) {
      setReloadList(true);
      toast.success('Xóa thành công', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else
      toast.error(res.errMsg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
  };
  if (action === FORM_ACTION.VIEW) {
    return (
      <div className='min-container'>
        <h2>Sổ địa chỉ</h2>
        <div className={cx('wrapper')}>
          <ListAddress selected={selected} setSelected={setSelected} />
          <div className={cx('action')}>
            <Clickable
              text='Đặt mặc định'
              primary
              onClick={handleSetCustomerDefault}
            />
            <div className={cx('distance')}></div>
            <Clickable text='Xóa' outline onClick={handleDeleteCustomerInfo} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='min-container'>
      <h2>Thông tin giao hàng</h2>
      <Customerinfo customerId={customerId} action={action} />
    </div>
  );
};

export default ListCustomerInfo;
