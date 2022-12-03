import React from 'react'
import className from 'classnames/bind'
import styles from './Section.module.scss'
import Clickable from '../Clickable'

const cx = className.bind(styles)

const Section = (props) => {
  const { reverse } = props
  //directtion =
  return (
    <section className={cx('wrapper', { reserve: reverse }, 'container')}>
      <div className={cx('col', 'image')}>
        <img
          src="https://file.hstatic.net/1000075078/file/3_79de83d7fe14444780d3f11e1d07ab20_master.jpg"
          alt="section"
        />
      </div>
      <div className={cx('col', 'content')}>
        <h2>Gigo Milk Tea Võ Văn Ngân</h2>
        <p>
          Nhà mới Nghệ An toạ lạc tại Lotte Mart (TP. Vinh), nằm bên cạnh những
          con phố sầm uất nhộn nhịp là không gian ấm cúng và hương vị quen thuộc
          từ Nhà, mang đến nhiều cung bậc cảm xúc cho những buổi hẹn hò cùng bạn
          bè.
        </p>
        <Clickable text="View more" second />
      </div>
    </section>
  )
}

export default Section
