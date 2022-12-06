export const phoneValidation = (phone) =>
  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(phone);

/*
  - length >= 6
  - must contains a-Z and A-Z,number
*/
export const passwordValidation = (pwd) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(pwd);
