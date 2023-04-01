import className from 'classnames/bind';
import styles from './Product.module.scss';
import { formatPrice } from '~/utils/format';
import { useState } from 'react';
import Clickable from '~/components/Clickable';
import ListRating from '~/components/ReviewProduct/ListRating';
import useCart from '~/hooks/useCart';
const cx = className.bind(styles);

const ProductDetail = ({ product }) => {
  const [size, setSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
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
    const surCharge = size === 'S' ? 0 : size === 'M' ? 6000 : 10000;
    const cartItem = {
      id: product.id,
      image: product.img_url,
      name: product.name,
      quantity: quantity,
      size: size,
      price: product.price + surCharge,
    };
    addToCart(cartItem);
    setQuantity(1);
  };
  return (
    <div className={cx('wrapper', 'min-container')}>
      <div className={cx('flex-box', 'product-detail')}>
        <div className={cx('left-column')}>
          <img src={product.img_url} alt='' />
        </div>

        <div className={cx('right-column')}>
          <div className={cx('product-description')}>
            <h1>{product.name}</h1>
            <h3 className={cx('price')}>{formatPrice(product.price)}</h3>
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
                  value='S'
                  checked={size === 'S'}
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
                  value='M'
                  checked={size === 'M'}
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
                  checked={size === 'L'}
                  value='L'
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
      <ListRating list={product.rates} />
    </div>
  );
};
export default ProductDetail;
