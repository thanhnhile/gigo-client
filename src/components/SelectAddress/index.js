import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import className from 'classnames/bind';
import styles from './SelectAddress.module.scss';
import Select from 'react-select';
import axios from 'axios';

const cx = className.bind(styles);
const host = 'https://provinces.open-api.vn/api/?depth=2';

const getOptions = (list, label) => {
  const options = list.map((item) => {
    return { label: item.name, value: item.code };
  });
  options.unshift({ label, value: -1 });
  return options;
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
        districtId: 2001,
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
    console.log('GET PROVINCES');
  }, []);
  const provinceOptions = getOptions(provinces, 'Chọn tỉnh/thành phố');
  const districtOptions = getOptions(districts, 'Chọn quận/huyện');
  return (
    <div className={cx('wrapper')}>
      <Select
        defaultValue={provinceOptions[0]}
        className={cx('select')}
        options={provinceOptions}
        onChange={handleProvinceChange}
      />
      <Select
        defaultValue={districtOptions[0]}
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
