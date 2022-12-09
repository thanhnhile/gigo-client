import React from 'react';
import Select from 'react-select';
import className from 'classnames/bind';
import styles from './Order.module.scss';
import { Icon } from '@iconify/react';
import Clickable from '~/components/Clickable';
const cx = className.bind(styles);
function Order(props) {
  const method = [
    { label: 'Trực tiếp', value: 1 },
    { label: 'Giao hàng', value: 2 },
  ];
  const Products = [
    {
      id: 1,
      name: 'CloudFee Hạnh Nhân Nướng',
      image:
        'https://product.hstatic.net/1000075078/product/1665655231_cloudfee-roasted-almond_fd7f9778e1814e81bc049f991ffacf60.jpg',
      price: '49.000',
      description:
        'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
    },
    {
      id: 2,
      name: 'CloudFee Hạnh Nhân Nướng',
      image:
        'https://product.hstatic.net/1000075078/product/1665655231_cloudfee-roasted-almond_fd7f9778e1814e81bc049f991ffacf60.jpg',
      price: '49.000',
      description:
        'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
    },
  ];
  const storeData = [
    {
      id: 1,
      districtId: 1,
      name: 'HCM Hoàng Việt',
      address: '17 Út tịch, Q. Tân Bình, Hồ Chí Minh',
    },
    {
      id: 2,
      districtId: 1,
      name: 'HCM Ấp Bắc',
      address: '4 - 6 Ấp Bắc, Q. Tân Bình, Hồ Chí Minh',
    },
    {
      id: 3,
      districtId: 1,
      name: 'HCM Tỉnh Lộ 10',
      address: '516 Tỉnh Lộ 10, Bình Trị Đông, Bình Tân, Hồ Chí Minh',
    },
  ];
  return (
    <div className={cx('container')}>
      <div className={cx('window')}>
        <div className={cx('order-info')}>
          <div className={cx('order-info-content')}>
            <h2>Món đã chọn</h2>
            <div className={cx('line')}></div>
            {Products.map((product, index) => (
              <table className={cx('order-table')}>
                <tbody>
                  <tr>
                    <td>
                      <img
                        alt={product.name}
                        src={product.image}
                        className={cx('full-width')}
                      ></img>
                    </td>
                    <td>
                      <span className={cx('thin')}>{product.name}</span>
                      <br />
                      <span className={cx('thin small')}>Size: m</span>
                      <br />
                      <span className={cx('thin small')}>Số lượng: 1</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className={cx('price')}>{product.price}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
            <div className={cx('line')}></div>
            <div className={cx('total')}>
              <span style={{ float: 'left' }}>
                <div className={cx('thin dense')}>Thành tiền</div>
                <div className={cx('thin dense')}>Phí giao hàng</div>
                TỔNG CỘNG
              </span>
              <span style={{ float: 'right', textAlign: 'right' }}>
                <div className={cx('thin dense')}>$68.75</div>
                <div className={cx('thin dense')}>$4.95</div>
                $435.55
              </span>
            </div>
          </div>
        </div>
        <div className={cx('customer-info')}>
          <h2>Thông tin khách hàng</h2>
          <div className={cx('customer-info-content')}>
            <table className={cx('half-input-table')}>
              <tbody>
                <tr>
                  <td>Phương thức đặt hàng: </td>
                  <td>
                    <Select options={method} />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <td>Chọn quán gần nhất: </td>
            <td>
              <select className={cx('select-btn')}>
                {storeData.map((store) => (
                  <option className={cx('option')} key={store.id}>
                    {store.address}
                  </option>
                ))}
              </select>
            </td>
            Tên
            <input className={cx('input-field')}></input>
            Số điện thoại
            <input className={cx('input-field')}></input>
            Địa chỉ
            <input className={cx('input-field')}></input>
          </div>
          <buton className={cx('pay-btn')}>
            <Icon icon='carbon:wireless-checkout' />
            Thanh toán
          </buton>
        </div>
      </div>
    </div>
  );
}

export default Order;
