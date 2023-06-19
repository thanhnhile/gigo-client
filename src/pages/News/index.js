import React from 'react';
import className from 'classnames/bind';
import styles from './News.module.scss';
import Clickable from '~/components/Clickable';

const cx = className.bind(styles);
const News = () => {
  return (    
    <div className={cx('news', 'container')}>
      <figure className={cx('snip1208')}>
        <img
          src='https://vietblend.vn/wp-content/uploads/2016/10/abec3df68d986bc63289.jpg'
          alt='sample66'
        />
        <div className={cx('date')}>
          <span className={cx('day')}>28</span>
          <span className={cx('month')}>May</span>
        </div>
        <i className={cx('ion-film-marker')} />
        <figcaption>
          <h3>NHÂN VIÊN BẾP - 7.000.000</h3>
          <p>Chuẩn bị nguyên liệu để chế biến món ăn theo công thức.</p>
          <p>
            Ưu tiên có kinh nghiệm làm bếp từ 06 tháng đến 1 năm hoặc đã được
            đào tạo về nghề bếp.
          </p>
          <Clickable text='Xem thêm' primary />
        </figcaption>
        <a href='#' />
      </figure>
      <figure className={cx('snip1208')}>
        <img
          src='https://baochauelec.com/cdn1/images/202102/thumb_article/tuyen-dung-quan-ly-cua-hang-thumb-1614325384.jpg'
          alt='sample9'
        />
        <div className={cx('date')}>
          <span className={cx('day')}>17</span>
          <span className={cx('month')}>July</span>
        </div>
        <i className={cx('ion-headphone')}> </i>
        <figcaption>
          <h3>Quản lý Cửa hàng - 10.000.000</h3>
          <p>
            Quản lý vận hành - Quản lý doanh thu và chi phí - Quản lý nhân sự
          </p>
          <p>
            Có kinh nghiệm trên 6 tháng ở vị trí Cửa hàng trưởng trong ngành cà
            phê hoặc nhà hàng, hoặc trên 1 năm ở vị trí giám sát cửa hàng
          </p>
          <Clickable text='Xem thêm' primary />
        </figcaption>
        <a href='#' />
      </figure>
      <figure className={cx('snip1208')}>
        <img
          src='https://hbland.net/wp-content/uploads/2021/09/TUYEN_DUNG-01_copy_27b97510-3b82-46cb-b1c0-14ac6fedc2a7_1024x1024.jpg'
          alt='sample6'
        />
        <div className={cx('date')}>
          <span className={cx('day')}>01</span>
          <span className={cx('month')}>Dec</span>
        </div>
        <i className={cx('ion-checkmark')}> </i>
        <figcaption>
          <h3>Tiếp đón khách hàng (Bảo vệ) - 6.000.000</h3>
          <p>
            Dẫn dắt xe cho Khách hàng đến Cửa hàng - Bảo vệ an ninh Cửa hàng{' '}
          </p>
          <p>
            Nam, từ 18-60 tuổi. Có sức khỏe tốt, tháo vát. Giao tiếp thân thiện,
            vui vẻ
          </p>
          <Clickable text='Xem thêm' primary />
        </figcaption>
        <a href='#' />
      </figure>
      <figure className={cx('snip1208')}>
        <img
          src='https://cdn.shopify.com/s/files/1/0939/8326/products/SCA-BaristaSkills_2b33817a-f8ee-4187-8450-c61210161835_1000x.png?v=1676050412'
          alt='sample66'
        />
        <div className={cx('date')}>
          <span className={cx('day')}>28</span>
          <span className={cx('month')}>August</span>
        </div>
        <i className={cx('ion-film-marker')} />
        <figcaption>
          <h3>Barista - 8.000.000</h3>
          <p>Thực hiện pha chế thức uống cho khách theo menu và quy định</p>
          <p>Tuổi từ đủ 19 trở lên - Nhanh nhẹn, vui vẻ, hoạt bát </p>
          <Clickable text='Xem thêm' primary />
        </figcaption>
        <a href='#' />
      </figure>
    </div>
  );
};

export default News;
