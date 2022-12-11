import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import className from 'classnames/bind';
import styles from './SelectAddress.module.scss';
import axios from 'axios';

const cx = className.bind(styles);
const host = 'https://provinces.open-api.vn/api/?depth=2';

const SelectAddress = ({ address, setAddress }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistrict] = useState([]);
  const handleProvinceChange = (e) => {
    const data = provinces.find(
      (item) => item.code === Number.parseInt(e.target.value)
    );
    setDistrict(data.districts);
    setAddress((prev) => {
      return {
        province: data.code,
        district: null,
      };
    });
  };
  const handleDistrictChange = (e) => {
    setAddress((prev) => {
      return { ...prev, district: e.target.value };
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
  // useMemo(() => {
  //   const id = Number.parseInt(address.province);
  //   const getDistrict = async () => {
  //     const data = await provinces.forEach((item) => {
  //       console.log(item);
  //       console.error(item.id === id);
  //       if (item.id === id) return item;
  //     });
  //     console.log(data);
  //   };
  //   alert(address.province);
  //   getDistrict();
  // }, [address.province]);
  return (
    <div className={cx('container', 'wrapper')}>
      <h1>Chọn danh sách tỉnh</h1>
      <form action=''>
        <select
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
        </select>
        {console.log(address)}
      </form>
    </div>
  );
};

export default SelectAddress;
