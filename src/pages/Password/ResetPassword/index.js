import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import className from 'classnames/bind';
import Clickable from '~/components/Clickable';
import styles from '../Password.module.scss';
import { toast } from 'react-toastify';
import { httpResetPassword } from '../../../apiServices/accountServices';

const cx = className.bind(styles);
const initValue = { password: '' };

function ResetPassword() {
  const { token } = useParams();
  console.log(token);
  const navigate = useNavigate();
  const [user, setUser] = useState(initValue);
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      toast.error('Mật khẩu không trùng khớp!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    const newUser = {
      password: user.password,
    };
    console.log(newUser);
    const response = await httpResetPassword(token, newUser);
    if (response.errMsg) {
      toast.error(response.errMsg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    setError('');
    setUser(initValue);
    console.log(response);
    toast.success('Cập nhật thành công', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate('/auth');
    }, 1000);
  };
  return (
    <div className={cx('container', 'wrapper')}>
      <h1>Đặt lại mật khẩu</h1>
      <p className={cx('error', { show: error })}>{error}</p>
      <form onSubmit={handleSubmit} className={cx('form')}>
        <input
          name='password'
          onChange={handleChange}
          type='password'
          placeholder='Mật khẩu'
        />
        <input
          name='confirmPassword'
          onChange={handleChange}
          type='password'
          placeholder='Nhập lại mật khẩu'
        />
        <a
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          href='/'
        >
          Quay lại trang chủ
        </a>
        <Clickable text='Cập nhật' primary />
      </form>
    </div>
  );
}

export default ResetPassword;
