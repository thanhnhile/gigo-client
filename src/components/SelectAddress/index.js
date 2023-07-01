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
    districtValue.current = -1;
    let addressDistrict = { provinceId: -1 },
      districts = [];
    if (data) {
      addressDistrict = { provinceId: data?.code, provinceName: data?.name };
      districts = data?.districts;
    }
    setDistricts(districts);
    setAddress((prev) => {
      return {
        ...prev,
        ...addressDistrict,
        districtId: -1,
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
          setAddress({
            provinceId: target.code,
            provinceName: target.name,
            districtId: disTarget.code,
            districtName: disTarget.name,
          });
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
      <Select
        required
        value={provinceValue.current || provinceOptions[0]}
        options={provinceOptions}
        onChange={handleProvinceChange}
      />
      <div style={{ height: '15px' }}></div>
      <Select
        required
        value={districtValue.current || districtOptions[0]}
        options={districtOptions}
        onChange={handleDistrictChange}
      />
    </div>
  );
};

export default SelectAddress;
