import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Footer.module.scss';
import { Icon } from '@iconify/react';
const cx = className.bind(styles);

const Footer = () => {
  return (
    <section id={cx('footer')}>
      <div className={cx('container', 'footer')}>
        <div className={cx('footer-top')}>
          <div className={cx('footer-top-name')}>
            <h2>Gogi Milk Tea</h2>
            <p>
              Gogi là một chuỗi cửa hàng trà sữa Việt Nam, được thành lập vào
              năm 2022. Nó có trụ sở tại Thành phố Hồ Chí Minh. Tính đến tháng 6
              năm 2023, chuỗi có hơn 100 cửa hàng trên khắp Việt Nam phục vụ hơn
              40.000 khách hàng mỗi ngày.
            </p>
          </div>
          <div className={cx('footer-top-about')}>
            <h2>Giới Thiệu</h2>
            <ul>
              <li>
                <Link to='/'>Về Chúng Tôi</Link>
              </li>
              <li>
                <Link to='/'>Blog</Link>
              </li>
              <li>
                <Link to='/'>Cơ Hội Nghề Nghiệp</Link>
              </li>
              <li>
                <Link to='/'>Cửa Hàng</Link>
              </li>
            </ul>
          </div>
          <div className={cx('footer-top-sp')}>
            <h2>Liên hệ</h2>
            <Link to='stores' className={cx('link-item')}>
              <Icon icon='bx:phone-call' className={cx('icon')} />
              <span>Đặt hàng: 180018545 (07:00-21:00)</span>
            </Link>
            <div className={cx('link-item')}>
              <Link to='facebook/'>
                <Icon
                  icon='ant-design:facebook-outlined'
                  className={cx('icon')}
                />
              </Link>
              <Link to='facebook/'>
                <Icon icon='akar-icons:instagram-fill' className={cx('icon')} />
              </Link>
            </div>
          </div>
        </div>
        <div className={cx('footer-bot')}>
          <p>
            Công ty cổ phần thương mại dịch vụ Trà Cà Phê VN
            <br />
            Mã số DN: 0312867172 do sở kế hoạch và đầu tư tp. HCM cấp ngày
            23/07/2014. Người đại diện: NGÔ NGUYÊN KHA
            <br />
            Địa chỉ: 86-88 Cao Thắng, phường 04, quận 3, tp Hồ Chí Minh Điện
            thoại: (028) 7107 8079 Email: hi@thecoffeehouse.vn
            <br />
            Copyright © 2022 Gigo. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
