import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import className from 'classnames/bind';
import styles from './SelectAddress.module.scss';
import Select from 'react-select';
import axios from 'axios';

const cx = className.bind(styles);
const host = 'https://provinces.open-api.vn/api/?depth=2';

const getOptions = (list) => {
  return list.map((item) => {
    return { label: item.name, value: item.code };
  });
};

const SelectAddress = ({ address, setAddress }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistrict] = useState([]);
  const handleProvinceChange = (e) => {
    const data = provinces.find((item) => item.code === e.value);
    setDistrict(data.districts);
    setAddress((prev) => {
      return {
        provinceId: data.code,
        districtId: -1,
      };
    });
  };
  const handleDistrictChange = (e) => {
    setAddress((prev) => {
      return { ...prev, districtId: e.value };
    });
  };
  useEffect(() => {
    const getProvince = async () => {
      const res = await axios.get(host);
      const data = res?.data.map((province) => {
        return {
          code: province.code,
          name: province.name,
          districts: province.districts,
        };
      });
      setProvinces(data);
    };
    getProvince();
  }, []);
  const provinceOptions = getOptions(provinces);
  const districtOptions = getOptions(districts);
  return (
    <div className={cx('wrapper')}>
      <Select
        defaultValue={
          address.provinceId || provinceOptions[0] || 'Chọn tỉnh/thành phố'
        }
        className={cx('select')}
        options={provinceOptions}
        onChange={handleProvinceChange}
      />
      <Select
        defaultValue={
          address.districtId || districtOptions[0] || 'Chọn quận/huyện'
        }
        className={cx('select')}
        options={districtOptions}
        onChange={handleDistrictChange}
      />
      {/* <select
          onChange={handleProvinceChange}
          name='province'
          value={address?.province ?? 'default'}
        >
          <option value='default'>Chọn tỉnh</option>
          {provinces.length &&
            provinces.map((item) => (
              <option value={item.code} key={item.id}>
                {item.name}
              </option>
            ))}
        </select>
        <select
          onChange={handleDistrictChange}
          name='district'
          value={address?.district ?? 'default'}
        >
          <option value='default'>Chọn quận/huyện</option>
          {districts.length &&
            districts.map((item) => (
              <option value={item.code} key={item.id}>
                {item.name}
              </option>
            ))}
        </select> */}
    </div>
  );
};

export default SelectAddress;
