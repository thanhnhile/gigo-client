import React, { useState, useEffect } from 'react';
import { httpGetAllDistrict } from '../../apiServices/districtServices';
import Select from 'react-select';

const SelectDistrict = ({ currnentValue, handleChange }) => {
  const [district, setDistrict] = useState([]);
  useEffect(() => {
    const getAllDistrict = async () => {
      const response = await httpGetAllDistrict();
      console.log(response);
      setDistrict(response.data);
    };
    getAllDistrict();
  }, []);
  const options = district.map((d) => ({
    label: d.name,
    value: d.id,
  }));
  return (
    <Select value={currnentValue} onChange={handleChange} options={options} />
  );
};

export default SelectDistrict;
