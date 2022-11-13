import React from 'react'
import className from 'classnames/bind'
import styles from './AdminLayout.module.scss'
const cx = className.bind(styles)

const AdminLayout = ({ children }) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container', 'content')}>{children}</div>
    </div>
  )
}

export default AdminLayout
