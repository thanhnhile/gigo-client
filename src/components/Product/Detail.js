import className from 'classnames/bind';
import styles from './Product.module.scss';
import { formatPrice } from '~/utils/format';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import Clickable from '~/components/Clickable';
const cx = className.bind(styles);

const ProductDetail = ({ product }) => {
  const [size, setSize] = useState('s');
  const [quantity, setQuantity] = useState(1);
  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
  const handleMinus = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };
  const handleChangeSize = (e) => {
    setSize(e.target.value);
  };
  const handleAddToCart = () => {
    const surCharge = size === 's' ? 0 : size === 'm' ? 6000 : 10000;
    const cartItem = {
      id: product.id,
      name: product.name,
      quantity: quantity,
      size: size,
      price: (product.price + surCharge) * Number.parseInt(quantity),
    };
    console.log(cartItem);
  };
  return (
    <div className={cx('container')}>
      <div className={cx('left-column')}>
        <img src={product.imgURL} alt='' />
      </div>

      <div className={cx('right-column')}>
        <div className={cx('product-description')}>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </div>

        <div className={cx('product-size')}>
          <span>Chọn size (bắt buộc)</span>
          <div className={cx('switch-field')}>
            <div>
              <input
                type='radio'
                id='size-s'
                name='size'
                value='s'
                checked={size === 's'}
                hidden
                onChange={handleChangeSize}
              />
              <label for='size-s'>Nhỏ + 0đ</label>
            </div>
            <div>
              <input
                type='radio'
                id='size-m'
                name='size'
                value='m'
                checked={size === 'm'}
                hidden
                onChange={handleChangeSize}
              />
              <label for='size-m'>Vừa + 6.000đ</label>
            </div>
            <div>
              <input
                type='radio'
                id='size-l'
                name='size'
                checked={size === 'l'}
                value='l'
                hidden
                onChange={handleChangeSize}
              />
              <label for='size-l'>Lớn + 10.000đ</label>
            </div>
          </div>
        </div>

        <div className={cx('product-count')}>
          <span>Số lượng</span>
          <form action='#' className={cx('display-flex')}>
            <div onClick={handleMinus} className={cx('qtyminus')}>
              -
            </div>
            <input
              type='text'
              name='quantity'
              value={quantity}
              className={cx('qty')}
            />
            <div onClick={handlePlus} className={cx('qtyplus')}>
              +
            </div>
          </form>
        </div>
        <Clickable text='Đặt ngay' primary onClick={handleAddToCart} />
      </div>
    </div>
  );
};
export default ProductDetail;
