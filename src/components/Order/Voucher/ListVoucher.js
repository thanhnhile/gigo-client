import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import styles from './Voucher.module.scss';
import Clickable from '../../Clickable';
import { formatPrice } from '~/utils/format';
import { getDistanceFromNowToDate, compareWithNow } from '~/utils/dateFormat';
import useOrder from '~/hooks/useOrder';

import {
  getVoucherByAccount,
  getVoucherByCode,
} from '~/apiServices/voucherService';

const cx = classNames.bind(styles);

const mapVoucherData = (data) => {
  return data.map((item) => ({
    ...item,
    disabled: compareWithNow(item.startDate) > 0,
  }));
};
const ListVoucher = ({ seleted, setSelected }) => {
  const { orderDetail, caclTotalCart } = useOrder();
  const voucherCodeRef = useRef();
  const [vouchers, setVouchers] = useState([]);
  useEffect(() => {
    const getVoucherForAccount = async () => {
      const res = await getVoucherByAccount();
      if (res?.data) {
        setVouchers(mapVoucherData(res.data));
      }
    };
    getVoucherForAccount();
  }, []);
  const handleChange = (item) => {
    const sumPrice = caclTotalCart(orderDetail?.details);
    if (sumPrice < item?.minimumOrderValue) {
      toast.warning(
        `Bạn cần mua thêm ${formatPrice(
          item?.minimumOrderValue - sumPrice
        )} để sử dụng voucher này!`,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        }
      );
      return;
    }
    setSelected(item);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    const code = voucherCodeRef.current.value;
    if (code) {
      let result = vouchers.find(
        (item) => item.code.toUpperCase() === code.toUpperCase()
      );
      if (result) {
        setSelected(result);
      } else {
        const res = await getVoucherByCode(code);
        if (res?.data) {
          setVouchers((prev) => [res.data, ...prev]);
          setSelected(res.data);
        } else {
          toast.info('Voucher có mã ' + code + ' không tồn tại', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
      }
    }
  };
  return (
    <div className={cx('min-container', 'list-voucher')}>
      <form className={cx('form-voucher-code')} onSubmit={handleSearch}>
        <input type='text' ref={voucherCodeRef} placeholder='Nhập mã voucher' />
        <Clickable text='Áp dụng' noMargin primary />
      </form>
      <div className={cx('radio-group-wrapper')}>
        <h3>
          Mã giảm giá dành cho bạn{' '}
          <button onClick={() => setSelected({})}>Bỏ chọn</button>
        </h3>
        <p>Có thể chọn 1 Voucher</p>
        <form className={cx('group-voucher')}>
          {vouchers?.length > 0
            ? vouchers.map((item) => (
                <li className={cx('voucher-item')} key={item.id}>
                  {item.disabled && (
                    <div className={cx('voucher-item-cover')}></div>
                  )}
                  <label className={cx('radio-label')} for={item.id}>
                    <input
                      id={item.id}
                      type='radio'
                      name='voucher'
                      checked={item.id === seleted?.id}
                      onChange={() => handleChange(item)}
                      hidden
                      disabled={item.disabled}
                    />
                    <div className={cx('radio-button')}></div>
                  </label>
                  <VoucherLabel voucher={item} />
                  <div className={cx('voucher-info')}>
                    <h4>{item?.name}</h4>
                    <p>Đơn tối thiểu {formatPrice(item?.minimumOrderValue)}</p>
                    <p>Tối đa {formatPrice(item?.maximumDiscountAmount)}</p>
                    <h5>{getDistanceFromNowToDate(item?.endDate)}</h5>
                  </div>
                </li>
              ))
            : 'Không có'}
        </form>
      </div>
    </div>
  );
};

const VoucherLabel = ({ voucher }) => {
  const { value, maximumDiscountAmount } = voucher;
  const valueLabel =
    value === 1 ? formatPrice(maximumDiscountAmount) : `${value * 100}%`;
  return <label className={cx('voucher-label')}>{valueLabel}</label>;
};
export default ListVoucher;
