import React from 'react';
import className from 'classnames/bind';
import styles from './CartItem.module.scss';
import { Icon } from '@iconify/react';
import { formatPrice } from '~/utils/format';
import useCart from '../../../hooks/useCart';

const cx = className.bind(styles);

const CartItem = (props) => {
  const {
    id,
    name,
    image,
    price,
    size,
    quantity,
    toppings = [],
  } = props.data || {};
  const { removeFromCart, plusQuantity, minusQuantity } = useCart();
  const handleRemove = () => {
    removeFromCart(id);
  };
  return (
    <div key={id} className={cx('cart-item')}>
      <img alt={name} src={image} className={cx('cart-item-img')}></img>
      <div className={cx('cart-item-info')}>
        <span>{name}</span>
        <br />
        <span>Size: {size}</span>
        <br />
        <span>{toppings.map((item) => item.name).join(', ')}</span>
        <br />
      </div>
      <div className={cx('cart-item-action')}>
        <span>
          <span className={cx('price')}>{formatPrice(price)}</span>
        </span>
        <div className={cx('quantity')}>
          <form action='#' className={cx('display-flex')}>
            <div onClick={() => minusQuantity(id)} className={cx('qtyminus')}>
              -
            </div>
            <input
              type='text'
              name='quantity'
              value={quantity}
              className={cx('qty')}
            />
            <div onClick={() => plusQuantity(id)} className={cx('qtyplus')}>
              +
            </div>
          </form>
        </div>
      </div>
      <div className={cx('cart-item-remove')}>
        <Icon
          onClick={handleRemove}
          icon='mdi:bin-outline'
          className={cx('icon')}
        />
      </div>
    </div>
  );
};

export default CartItem;
