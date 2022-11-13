import React from 'react'
import { useNavigate } from 'react-router-dom'
import className from 'classnames/bind'
import styles from './Register.module.scss'

const cx = className.bind(styles)

function Register() {
  const navigate = useNavigate()
  return (
    <div className={cx('container','wrapper')}>
      <h2>Đăng ký</h2>
      <p>
        Đã có tài khoản?<span onClick={() => navigate('/auth')}>Đăng nhập</span>
      </p>
      <form className={cx('form')}>
        <input type="text" placeholder="Tên đăng nhập" />
        <input type="password" placeholder="Mật khẩu" />
        <input type="password" placeholder="Nhập lại mật khẩu" />
        <p>Quay về</p>
        <button>Đăng ký</button>
      </form>
    </div>
  )
}

export default Register
