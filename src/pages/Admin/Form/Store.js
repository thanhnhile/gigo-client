import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import SelectAddress from '~/components/SelectAddress';
import styles from './Form.module.scss';
import {
  httpGetStoreById,
  httpPostStore,
  httpPutStore,
} from '~/apiServices/storeServices';
import FormValidation from '~/components/Form/FormValidation';
import FormInput from '~/components/Form/FormInput';
import ValidationRegex from '~/utils/validationRegex';
import { useNavigate, useParams } from 'react-router-dom';
import Clickable from '~/components/Clickable';

const cx = className.bind(styles);
const initValue = {
  storeName: '',
  provinceId: '',
  districtId: '',
  address: '',
};
function Store() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(initValue);
  const [err, setErr] = useState('');

  const [address, setAddress] = useState({
    provinceId: '',
    districtId: '',
  });

  useEffect(() => {
    if (id === 'add') {
      setStore({ ...store, provinceId: -1 });
    } else {
      GetStoreById();
    }
  }, [id]);

  const GetStoreById = async () => {
    const response = await httpGetStoreById(id);
    console.log(response.data);
    setStore(response.data);
    setAddress((prev) => {
      return {
        ...prev,
        provinceId: response.data.provinceId,
        districtId: response.data.districtId,
      };
    });
  };

  const handleChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, formValidated) => {
    try {
      e.preventDefault();
      if (!formValidated) {
        return;
      }
      let fullAddress = store.address;
      if (id === 'add') {
        fullAddress = `${address}, ${address.districtName}, ${address.provinceName}`;
      }
      if (address.districtId !== store.districtId || address.provinceId !== store.provinceId) {
        const index = fullAddress.includes('huyện')
          ? fullAddress.indexOf('huyện')
          : fullAddress.includes('quận')
            ? fullAddress.indexOf('quận')
            : fullAddress.indexOf('thành phố');

        const prefix =
          index > 0 ? store.address.slice(0, index - 2) : store.address;
        fullAddress = `${prefix}, ${address.districtName}, ${address.provinceName}`;
      }
      const newStore = {
        ...store,
        provinceId: address.provinceId,
        districtId: address.districtId,
        address: fullAddress.toLowerCase(),
      };
      if (address.districtId === '' || address.provinceId === '') {
        setErr('Chọn địa chỉ');
      } else {
        console.log(newStore);
        if (id === 'add') {
          const res = await httpPostStore(newStore);
          if (res.data) {
            console.log(res.data);
          } else console.log(res.errMsg);
        } else {
          const res = await httpPutStore(store.id, newStore);
          if (res.data) {
            console.log(res.data);
          } else console.log(res.errMsg);
        }
        navigate('/admin/stores');
      }

    } catch (error) {
      console.log(error);
    }

  };
  const formInputs = [
    {
      id: 1,
      name: 'storeName',
      type: 'text',
      title: 'Tên cửa hàng',
      placeholder: 'VD: Gogi Thủ Đức',
      required: true,
      pattern: ValidationRegex.name.pattern,
      message: ValidationRegex.name.message,
    },
    {
      id: 2,
      name: 'address',
      type: 'text',
      title: 'Địa chỉ chi tiết',
      placeholder: 'VD: 134 Kha Vạn Cân, phường Linh Trung',
      required: true,
      pattern: ValidationRegex.address.pattern,
      message: ValidationRegex.address.message,
    },
  ];
  return (
    store.provinceId && (
      <div className={cx('wrapper')}>
        <FormValidation>
          {({ setValidated, formValidated }) => (
            <form
              onSubmit={(e) => handleSubmit(e, formValidated)}
              className={cx('form')}
            >
              <h1>Cửa hàng</h1>
              {formInputs.map((formInput) => (
                <FormInput
                  key={formInput.id}
                  value={store[formInput.name]}
                  onChange={handleChange}
                  setValidated={setValidated}
                  {...formInput}
                />
              ))}
              <label>Địa chỉ</label>
              <SelectAddress
                address={{
                  provinceId: store.provinceId,
                  districtId: store.districtId,
                }}
                setAddress={setAddress}
              />
              {err !== '' ? (<span className={cx('error')}>{err}</span>)
                : (<span></span>)}
              <span className={cx('height')} />
              <Clickable text='Gửi' primary />
            </form>
          )}
        </FormValidation>
      </div>
    )
  );
}
export default Store;
