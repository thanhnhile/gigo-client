import React from 'react';
import className from 'classnames/bind';
import styles from './News.module.scss';
import Clickable from '~/components/Clickable';

const cx = className.bind(styles);
const News = () => {
  return (
    // <div className={cx("container-fluid")}>
    //     <div className={cx("row")}>
    //         <div className={cx("col-md-12")}>
    //             <div id="news-slider" className={cx("owl-carousel")}>
    //                 <div className={cx("post-slide")}>
    //                     <div className={cx("post-img")}>
    //                         <img src="https://images.unsplash.com/photo-1596265371388-43edbaadab94?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=301&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=501" alt="" />
    //                         <a href="#" className={cx("over-layer")}><i className={cx("fa fa-link")} /></a>
    //                     </div>
    //                     <div className={cx("post-content")}>
    //                         <h3 className={cx("post-title")}>
    //                             <a href="#">Lorem ipsum dolor sit amet.</a>
    //                         </h3>
    //                         <p className={cx("post-description")}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consectetur cumque dolorum, ex incidunt ipsa laudantium necessitatibus neque quae tempora......</p>
    //                         <span className={cx("post-date")}><i className={cx("fa fa-clock-o")} />Out 27, 2019</span>
    //                         <a href="#" className={cx("read-more")}>read more</a>
    //                     </div>
    //                 </div>
    //                 <div className={cx("post-slide")}>
    //                     <div className={cx("post-img")}>
    //                         <img src="https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=303&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=503" alt="" />
    //                         <a href="#" className={cx("over-layer")}><i className={cx("fa fa-link")} /></a>
    //                     </div>
    //                     <div className={cx("post-content")}>
    //                         <h3 className={cx("post-title")}>
    //                             <a href="#">Lorem ipsum dolor sit amet.</a>
    //                         </h3>
    //                         <p className={cx("post-description")}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consectetur cumque dolorum, ex incidunt ipsa laudantium necessitatibus neque quae tempora......</p>
    //                         <span className={cx("post-date")}><i className={cx("fa fa-clock-o")} />Out 27, 2019</span>
    //                         <a href="#" className={cx("read-more")}>read more</a>
    //                     </div>
    //                 </div>

    //             </div>
    //         </div>
    //     </div>
    // </div>
    <div className={cx('news', 'container')}>
      <figure className={cx('snip1208')}>
        <img
          src='https://hotelcareers.vn/wp-content/uploads/2020/12/phu-bep-ho-tro-bep-chinh.jpg'
          alt='sample66'
        />
        <div className={cx('date')}>
          <span className={cx('day')}>28</span>
          <span className={cx('month')}>Oct</span>
        </div>
        <i className={cx('ion-film-marker')} />
        <figcaption>
          <h3>NHÂN VIÊN BẾP - 7.000.000</h3>
          <p>Chuẩn bị nguyên liệu để chế biến món ăn theo công thức.</p>
          <p>
            Ưu tiên có kinh nghiệm làm bếp từ 06 tháng đến 1 năm hoặc đã được
            đào tạo về nghề bếp.
          </p>
          <Clickable text='Xem thêm' second />
        </figcaption>
        <a href='#' />
      </figure>
      <figure className={cx('snip1208')}>
        <img
          src='https://hrw.hstatic.net/200000000005/24/recruitment/1a160a4a24f641fea3bf63a0e2f984fb.jpg'
          alt='sample9'
        />
        <div className={cx('date')}>
          <span className={cx('day')}>17</span>
          <span className={cx('month')}>Nov</span>
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
          <Clickable text='Xem thêm' second />
        </figcaption>
        <a href='#' />
      </figure>
      <figure className={cx('snip1208')}>
        <img
          src='https://tasecodanang.vn/medias/thumbs/685/2022-05-origin-035b9b2946adc92828d14f5e9015c316-500x0.jpg'
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
          <Clickable text='Xem thêm' second />
        </figcaption>
        <a href='#' />
      </figure>
      <figure className={cx('snip1208')}>
        <img
          src='https://luatduonggia.vn/wp-content/uploads/2022/02/barista-la-gi-ky-nang-yeu-cau-doi-voi-barista-chuyen-nghiep.jpg'
          alt='sample66'
        />
        <div className={cx('date')}>
          <span className={cx('day')}>28</span>
          <span className={cx('month')}>Oct</span>
        </div>
        <i className={cx('ion-film-marker')} />
        <figcaption>
          <h3>Barista - 8.000.000</h3>
          <p>Thực hiện pha chế thức uống cho khách theo menu và quy định</p>
          <p>Tuổi từ đủ 19 trở lên - Nhanh nhẹn, vui vẻ, hoạt bát </p>
          <Clickable text='Xem thêm' second />
        </figcaption>
        <a href='#' />
      </figure>
    </div>
  );
};

export default News;
