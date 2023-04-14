import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import className from 'classnames/bind';
import styles from './CustomerListAddress.module.scss';
import Clickable from '~/components/Clickable';
import { httpGetAllCustomerInfo } from '~/apiServices/accountServices';
import { httpPutSetCustomerInfoDefault } from '~/apiServices/accountServices';
import { httpDeleteCustomer } from '~/apiServices/customerServices';
import { FORM_ACTION } from '~/utils/enum';

const cx = className.bind(styles);

const ListCustomerAddress = ({ selected, setSelected }) => {
  const [listAddress, setListAddress] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const getListCustomerInfoOfAccount = async () => {
      const res = await httpGetAllCustomerInfo();
      if (res.data) {
        setListAddress(res.data);
        const defaultItem = res?.data.find((item) => item.isDefault);
        defaultItem && setSelected((prev) => ({ ...prev, ...defaultItem }));
      }
    };
    getListCustomerInfoOfAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);
  const handleSetCustomerDefault = async () => {
    console.log(selected.id);
    const res = await httpPutSetCustomerInfoDefault(selected.id);
    if (res.data) {
      setSelected(res.data);
      toast.success('Lưu địa chỉ mặc định thành công!', {
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
      setReload(!reload);
      toast.success('Xóa địa chỉ thành công', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else
      toast.error(res.errMsg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
  };
  return (
    <div className='min-container'>
      <div>
        <RadioGroupAddress
          selected={selected}
          setSelected={setSelected}
          listAddress={listAddress}
        />
        <div className={cx('action')}>
          <Clickable
            text='Đặt mặc định'
            primary
            onClick={handleSetCustomerDefault}
            disable={listAddress.length <= 0}
          />
          <div className={cx('distance')}></div>
          <Clickable
            text='Xóa'
            outline
            onClick={handleDeleteCustomerInfo}
            disable={listAddress.length <= 0}
          />
        </div>
      </div>
    </div>
  );
};

const RadioGroupAddress = ({ selected, setSelected, listAddress }) => {
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/customer-info`, {
      state: { customerId: id, action: FORM_ACTION.EDIT },
    });
  };
  return (
    <div className={cx('radio-group-wrapper')}>
      <form>
        {listAddress.length > 0
          ? listAddress.map((item) => {
              return (
                <li className={cx('address-item')} key={item.id}>
                  <label className={cx('radio-label')} for={item.id}>
                    <input
                      id={item.id}
                      type='radio'
                      name='address'
                      hidden
                      checked={item.id === selected.id}
                      onChange={() =>
                        setSelected((prev) => ({ ...prev, ...item }))
                      }
                    />
                    <div className={cx('radio-button')}></div>
                  </label>
                  <div className={cx('customer-info')}>
                    <div className={cx('customer-info_first')}>
                      <h4>{item.name}</h4>
                      <h5>{item.phone}</h5>
                    </div>
                    <p className={cx('customer-info_last')}>{item.address}</p>
                  </div>
                  <div className={cx('customer-action')}>
                    <button type='button' onClick={(e) => handleEdit(item.id)}>
                      Sửa
                    </button>
                  </div>
                </li>
              );
            })
          : 'Không có địa chỉ nào được lưu'}
      </form>
    </div>
  );
};

export default ListCustomerAddress;
