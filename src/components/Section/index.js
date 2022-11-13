import React from 'react'
import className from 'classnames/bind'
import styles from './Section.module.scss'

const cx = className.bind(styles)

const Section = ({ reverse }) => {
  //directtion =
  return (
    <div className={cx('wrapper', { reserve: reverse }, 'container')}>
      <div className={cx('image')}>Hinh anh</div>
      <div className={cx('content')}>Noi dung</div>
    </div>
  )
}

export default Section
