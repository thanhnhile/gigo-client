import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Footer.module.scss';
import { Icon } from '@iconify/react';
const cx = className.bind(styles);

const Footer = () => {
    return (
        <section id={cx("footer")}>
            <div className={cx("container", "footer")}>
                <div className={cx("footer-top")}>
                    <div className={cx("footer-top-name")}>
                        <h2>Gigo Milk Tea</h2>
                        <p>Equator was named after the region where coffee grows, but has come to mean so much more than that. It’s the path around the planet that connects us all.As we tread that path from bean to sip, we try to make everything we touch better. Because we believe drinking good coffee leads to good things.</p>
                    </div>
                    <div className={cx("footer-top-about")}>
                        <h2>Giới Thiệu</h2>
                        <ul>
                            <li>
                                <a>Về Chúng Tôi</a>
                            </li>
                            <li>
                                <a>Blog</a>
                            </li>
                            <li>
                                <a>Cơ Hội Nghề Nghiệp</a>
                            </li>
                            <li>
                                <a>Cửa Hàng</a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx("footer-top-sp")}>
                        <h2>Liên hệ</h2>
                        <Link to='stores' className={cx('link-item')}>
                            <Icon icon="bx:phone-call" className={cx('icon')} />
                            <span>Đặt hàng: 180018545 (07:00-21:00)</span>
                        </Link>
                        <div className={cx('link-item')}>
                            <Link to='facebook/'>
                                <Icon icon="ant-design:facebook-outlined" className={cx('icon')} />
                            </Link>
                            <Link to='facebook/'>
                                <Icon icon="akar-icons:instagram-fill" className={cx('icon')} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={cx("footer-bot")}>
                    <p>Công ty cổ phần thương mại dịch vụ Trà Cà Phê VN
                        <br />Mã số DN: 0312867172 do sở kế hoạch và đầu tư tp. HCM cấp ngày 23/07/2014. Người đại diện: NGÔ NGUYÊN KHA
                        <br />Địa chỉ: 86-88 Cao Thắng, phường 04, quận 3, tp Hồ Chí Minh   Điện thoại: (028) 7107 8079   Email: hi@thecoffeehouse.vn
                        <br />Copyright © 2022 Gigo. All rights reserved.</p>
                </div>
            </div>
        </section>
    );
}

export default Footer