import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const host = 'https://provinces.open-api.vn/api/?depth=2';

const getOptions = (list, label) => {
  const options = list.map((item) => {
    return { label: item.name, value: item.code };
  });
  options.unshift({ label, value: -1 });
  return options;
};

const SelectAddress = ({ address, setAddress }) => {
  const provinceValue = useRef();
  const districtValue = useRef();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const handleProvinceChange = (e) => {
    const data = provinces.find((item) => item.code === e.value);
    provinceValue.current = e;
    districtValue.current = '';
    setDistricts(data.districts);
    setAddress((prev) => {
      return {
        provinceId: data.code,
        provinceName: data.name,
        districtId: 2001,
      };
    });
  };
  const handleDistrictChange = (e) => {
    districtValue.current = e;
    setAddress((prev) => {
      return {
        ...prev,
        districtId: e.value,
        districtName: e.label,
      };
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
      console.log('ADDRESS ', address);
      if (address.provinceId && address.districtId) {
        const target = data.find((item) => item.code === address.provinceId);
        if (target) {
          provinceValue.current = { value: target.code, label: target.name };
          const disTarget = target.districts.find(
            (item) => item.code === address.districtId
          );
          districtValue.current = {
            value: disTarget.code,
            label: disTarget.name,
          };
          setDistricts(target.districts);
        }
      }
      setProvinces(data);
    };
    getProvince();
  }, []);
  const provinceOptions = getOptions(provinces, 'Chọn tỉnh/thành phố');
  const districtOptions = getOptions(districts, 'Chọn quận/huyện');
  return (
    <div>
      {console.log('CURRENt ', provinceValue.current, districtValue.current)}
      <Select
        value={provinceValue.current || provinceOptions[0]}
        options={provinceOptions}
        onChange={handleProvinceChange}
      />
      <Select
        value={districtValue.current || districtOptions[0]}
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
