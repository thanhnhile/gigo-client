import React from 'react'
import className from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'

const cx = className.bind(styles)

function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('content')}>{children}</div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
