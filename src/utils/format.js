export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  if (isNaN(price)) {
    return formatter.format(0);
  }
  return formatter.format(price);
};

export const getSplitAddress = (fullAddress) => {
  const indexDistrictStart = fullAddress.includes('huyện')
    ? fullAddress.indexOf('huyện')
    : fullAddress.includes('quận')
    ? fullAddress.indexOf('quận')
    : fullAddress.indexOf('thành phố');
  const indexProvinceStart = fullAddress.includes('tỉnh')
    ? fullAddress.indexOf('tỉnh')
    : fullAddress.indexOf('thành phố');
  const streetName = fullAddress.slice(0, indexDistrictStart - 2);
  const districtName = fullAddress.slice(
    indexDistrictStart,
    indexProvinceStart - 2
  );
  const provinceName = fullAddress.slice(indexProvinceStart);
  return { streetName, districtName, provinceName };
};
