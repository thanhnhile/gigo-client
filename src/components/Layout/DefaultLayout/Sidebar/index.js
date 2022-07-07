import React from 'react'
import className from 'classnames/bind'
import styles from './Sidebar.module.scss'

const cx = className.bind(styles)

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>Side bar here</aside>
  )
}

export default Sidebar