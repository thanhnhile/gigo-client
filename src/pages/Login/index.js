import React from 'react'
import { useNavigate } from 'react-router-dom'
import className from 'classnames/bind'
import styles from './Login.module.scss'
import Clickable from '../../components/Clickable'

const cx = className.bind(styles)

function Login() {
  const navigate = useNavigate()
  return (
    <div className={cx('container', 'wrapper')}>
      <h2>Đăng nhập</h2>
      <p>
        Chưa có tài khoản?
        <span onClick={() => navigate('/register')}>Đăng ký</span>
      </p>
      <form className={cx('form')}>
        <input type="text" placeholder="Tên đăng nhập" />
        <input type="password" placeholder="Mật khẩu" />
        <a href="reset">Quên mật khẩu?</a>
        <Clickable text="Đăng nhập" primary />
      </form>
    </div>
  )
}

export default Login
