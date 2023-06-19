const ValidationRegex = {
  phone: {
    pattern: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
    message: 'Số điện thoại không hợp lệ',
  },
  password: {
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
    message:
      'Mật khẩu phải có ít nhất 6 ký tự bao gồm chữ hoa, chữ thường và số',
  },
  email: {
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: 'Email không hợp lệ',
  },
  price: {
    pattern: /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/,
    message: 'Giá tiền không hợp lệ',
  },
  name: {
    pattern: /^[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\w:+]+$/g,
    message: 'Tên không chứa ký tự đặc biệt',
  },
  address: {
    pattern: /^[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\w,/]+$/g,
    message: 'Địa chỉ chưa hợp lệ',
  },
  code: {
    pattern: /^[A-Z0-9]+$/,
    message: 'Mã code chứa cái ký tự in hoa và số',
  },
  option: {
    pattern: /^[0-9]+$/,
    message: 'Chọn lựa chọn phù hợp',
  },
};

export default ValidationRegex;
