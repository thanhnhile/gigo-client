import React from 'react'
import className from 'classnames/bind'
import { Carousel } from 'react-responsive-carousel'
import styles from './Slider.module.scss'

const cx = className.bind(styles)

const Slider = () => {
  return (
    <Carousel autoPlay showThumbs className={cx('wrapper')}>
      <div>
        <img
          alt=""
          src="https://file.hstatic.net/1000075078/file/web_desktop_d158a17fa9e64ead95e49c8772b69284.jpg"
        />
      </div>
      <div>
        <img
          alt=""
          src="https://file.hstatic.net/1000075078/file/web_desktop_d158a17fa9e64ead95e49c8772b69284.jpg"
        />
      </div>
      <div>
        <img
          alt=""
          src="https://file.hstatic.net/1000075078/file/web_desktop_d158a17fa9e64ead95e49c8772b69284.jpg"
        />
      </div>
    </Carousel>
  )
}

export default Slider
