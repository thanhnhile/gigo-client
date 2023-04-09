import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Voucher.module.scss';
import Clickable from '../../Clickable';
import { formatPrice } from '~/utils/format';
import { formatDate } from '~/utils/dateFormat';

import {
  getVoucherByAccount,
  getVoucherByCode,
} from '~/apiServices/voucherService';

const cx = classNames.bind(styles);
// const vouchers = [
//   {
//     id: 1,
//     name: 'Khach hang moi',
//     value: 0.15,
//     startDate: '2023-04-08T00:00:00.000+00:00',
//     endDate: '2023-05-08T00:00:00.000+00:00',
//     code: 'KHACHHANGMOI',
//     minimumOrderValue: 0.0,
//     maximumDiscountAmount: 20000.0,
//   },
//   {
//     id: 2,
//     name: 'Khach hang moi',
//     value: 1,
//     startDate: '2023-04-01T00:00:00.000+00:00',
//     endDate: '2023-05-05T00:00:00.000+00:00',
//     code: 'KHACHHANGMOI',
//     minimumOrderValue: 0.0,
//     maximumDiscountAmount: 20000.0,
//   },
//   {
//     id: 3,
//     name: 'Mien phi van chuyen',
//     value: 1,
//     startDate: '2023-04-01T00:00:00.000+00:00',
//     endDate: '2023-05-05T00:00:00.000+00:00',
//     code: 'KHACHHANGMOI',
//     minimumOrderValue: 0.0,
//     maximumDiscountAmount: 20000.0,
//   },
//   {
//     id: 4,
//     name: 'Khach hang moi',
//     value: 0.15,
//     startDate: '2023-04-01T00:00:00.000+00:00',
//     endDate: '2023-05-05T00:00:00.000+00:00',
//     code: 'KHACHHANGMOI',
//     minimumOrderValue: 0.0,
//     maximumDiscountAmount: 20000.0,
//   },
// ];
const ListVoucher = ({ seleted, setSelected }) => {
  const voucherCodeRef = useRef();
  const [vouchers, setVouchers] = useState([]);
  useEffect(() => {
    const getVoucherForAccount = async () => {
      const res = await getVoucherByAccount();
      if (res?.data) {
        setVouchers(res.data);
      }
    };
    getVoucherForAccount();
  }, []);
  const handleSearch = async (e) => {
    e.preventDefault();
    const code = voucherCodeRef.current.value;
    if (code) {
      const res = await getVoucherByCode(code);
      if (res?.data) {
        setVouchers((prev) => [res.data, ...prev]);
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
        <h3>Mã giảm giá dành cho bạn</h3>
        <p>Có thể chọn 1 Voucher</p>
        <RadioGroupVoucher
          listVoucher={vouchers}
          seleted={seleted}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};
const RadioGroupVoucher = ({ listVoucher, seleted, setSelected }) => {
  return (
    <form className={cx('group-voucher')}>
      {listVoucher?.length > 0
        ? listVoucher.map((item) => (
            <li className={cx('voucher-item')} key={item.id}>
              <label className={cx('radio-label')} for={item.id}>
                <input
                  id={item.id}
                  type='radio'
                  name='voucher'
                  checked={item.id === seleted.id}
                  onChange={() => setSelected(item)}
                  hidden
                />
                <div className={cx('radio-button')}></div>
              </label>
              <VoucherLabel voucher={item} />
              <div className={cx('voucher-info')}>
                <h4>{item?.name}</h4>
                <p>Đơn tối thiểu {formatPrice(item?.minimumOrderValue)}</p>
                <p>Tối đa {formatPrice(item?.maximumDiscountAmount)}</p>
                <h5>HSD: {formatDate(item?.endDate)}</h5>
              </div>
            </li>
          ))
        : 'Không có'}
    </form>
  );
};
const VoucherLabel = ({ voucher }) => {
  const { value, maximumDiscountAmount } = voucher;
  const valueLabel =
    value === 1 ? formatPrice(maximumDiscountAmount) : `${value * 100}%`;
  return <label className={cx('voucher-label')}>{valueLabel}</label>;
};
export default ListVoucher;
