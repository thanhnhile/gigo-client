import React from 'react';
import className from 'classnames/bind';
import styles from './Section.module.scss';
import Clickable from '../Clickable';

const cx = className.bind(styles);

const Section = (props) => {
  const { reverse } = props;
  //directtion =
  return (
    <section className={cx('wrapper', { reserve: reverse }, 'container')}>
      <div className={cx('col', 'image')}>
        <img
          src='https://file.hstatic.net/1000075078/file/3_79de83d7fe14444780d3f11e1d07ab20_master.jpg'
          alt='section'
        />
      </div>
      <div className={cx('col', 'content')}>
        <h2>Gogi Milk Tea Võ Văn Ngân</h2>
        <p>
          Cửa hàng mới tại Thành phố Thủ Đứa toạ lạc đường Võ Văn Ngân <br />{' '}
          (gần trường Đại học Sư phạm Kỹ thuật TP Hồ Chí Minh). Hương vị quen
          thuộc từ các thức uống của Gogi, mang đến nhiều cung bậc cảm xúc cho
          những buổi gặp gỡ cùng bạn bè. Hứa hẹn sẽ là điểm đến lý tưởng cho các
          bạn trẻ.
        </p>
      </div>
    </section>
  );
};

export default Section;
