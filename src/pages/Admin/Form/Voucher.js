import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Form.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import FormValidation from '~/components/Form/FormValidation';
import FormInput from '~/components/Form/FormInput';
import ValidationRegex from '~/utils/validationRegex';
import Clickable from '~/components/Clickable';
import {
  httpGetVoucherById,
  httpPostVoucher,
  httpPutVoucher,
} from '~/apiServices/voucherService';
import moment from 'moment-timezone';

const cx = className.bind(styles);
const initValue = {
  name: '',
  value: 0,
  startDate: '',
  endDate: '',
  code: '',
  minimumOrderValue: 0,
  maximumDiscountAmount: 0,
};
function Voucher() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [voucher, setVoucher] = useState(initValue);

  useEffect(() => {
    if (id === 'add') {
      return;
    } else {
      getVoucherById();
    }
  }, [id]);

  const getVoucherById = async () => {
    const response = await httpGetVoucherById(id);
    console.log(response.data);
    setVoucher(response.data);
  };

  const handleChange = (e) => {
    setVoucher((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e, formValidated) => {
    try {
      e.preventDefault();
      if (!formValidated) {
        return;
      }
      if (id === 'add') {
        const res = await httpPostVoucher(voucher);
        if (res.data) {
          console.log(res.data);
        } else console.log(res.errMsg);
      } else {
        const res = await httpPutVoucher(voucher.id, voucher);
        if (res.data) {
          console.log(res.data);
        } else console.log(res.errMsg);
      }
    } catch (error) {
      console.log(error);
    }
    navigate('/admin/vouchers');
  };
  const formInputs = [
    {
      id: 1,
      name: 'name',
      title: 'Tên mã giảm giá',
      type: 'text',
      placeholder: 'VD: Ưu đãi khách hàng mới',
      required: true,
      pattern: ValidationRegex.name.pattern,
      message: ValidationRegex.name.message,
    },
    {
      id: 2,
      name: 'value',
      title: 'Giá trị',
      type: 'number',
      placeholder: 'VD: 0.1',
      required: true,
    },
    {
      id: 3,
      name: 'code',
      title: 'Mã code',
      type: 'text',
      placeholder: 'VD: KHACHMOI',
      required: true,
      pattern: ValidationRegex.code.pattern,
      message: ValidationRegex.code.message,

    },
    {
      id: 4,
      name: 'minimumOrderValue',
      title: 'Đơn tối thiểu',
      type: 'number',
      placeholder: 'VD: 5000',
      required: true,
      pattern: ValidationRegex.price.pattern,
      message: ValidationRegex.price.message,

    },
    {
      id: 1,
      name: 'maximumDiscountAmount',
      title: 'Giảm tối đa',
      type: 'text',
      placeholder: 'VD: 10000',
      required: true,
      pattern: ValidationRegex.price.pattern,
      message: ValidationRegex.price.message,

    }
  ];
  return (
    <div className={cx('wrapper')}>
      <FormValidation>
        {({ setValidated, formValidated }) => (
          <form
            onSubmit={(e) => handleSubmit(e, formValidated)}
            className={cx('form')}
          >
            <h1>Mã giảm giá</h1>

            {formInputs.map((formInput) => (
              <FormInput
                key={formInput.id}
                value={voucher[formInput.name]}
                onChange={handleChange}
                setValidated={setValidated}
                {...formInput}
              />
            ))}
            <label>Ngày bắt đầu</label>
            <input
              type='datetime-local'
              name='startDate'
              value={moment(voucher.startDate).format('YYYY-MM-DDTHH:mm')}
              onChange={handleChange}
              required
            />

            <label>Ngày kết thúc</label>
            <input
              type='datetime-local'
              name='endDate'
              value={moment(voucher.endDate).format('YYYY-MM-DDTHH:mm')}
              onChange={handleChange}
              required
            />
            <span className={cx('height')} />
            <Clickable text='Gửi' primary />
          </form>
        )}
      </FormValidation>
      
    </div>
  );
}
export default Voucher;
