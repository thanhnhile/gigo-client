import React from 'react';
import className from 'classnames/bind';
import styles from './Contact.module.scss';

const cx = className.bind(styles);
const Contact = () => {
    return (
        <div className={cx("container")}>
            <div className={cx("row header")}>
                <h1>LIÊN HỆ CHÚNG TÔI &nbsp;</h1>
                <h3>Điền vào mẫu dưới đây để tìm hiểu thêm!</h3>
            </div>
            <div className={cx("row body")}>
                <form action="#">
                    <ul>
                        <li>
                            <p className={cx("left")}>
                                <label htmlFor="first_name">Tên</label>
                                <input type="text" name="first_name" placeholder="John" />
                            </p>
                            <p className={cx("pull-right")}>
                                <label htmlFor="last_name">Họ</label>
                                <input type="text" name="last_name" placeholder="Smith" />
                            </p>
                        </li>
                        <li>
                            <p>
                                <label htmlFor="email">Email <span className="req">*</span></label>
                                <input type="email" name="email" placeholder="john.smith@gmail.com" />
                            </p>
                        </li>
                        <li><div className={cx("divider")} /></li>
                        <li>
                            <label htmlFor="comments">Nhận xét</label>
                            <textarea cols={46} rows={3} name="comments" defaultValue={""} />
                        </li>
                        <li>
                            <input className={cx("btn btn-submit")} type="submit" defaultValue="Submit" />
                            <small>or press <strong>enter</strong></small>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}

export default Contact;
