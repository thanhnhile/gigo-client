import React from 'react';
import className from 'classnames/bind';
import styles from './CartItem.module.scss';
import { Icon } from '@iconify/react';
import { formatPrice } from '~/utils/format';
import useCart from '../../../hooks/useCart';

const cx = className.bind(styles);

const CartItem = (props) => {
  const { id, name, image, price, size, quantity } = props.data;
  const { removeFromCart } = useCart();
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
        <span>
          {quantity ?? 1} x{' '}
          <span className={cx('price')}>{formatPrice(price)}</span>
        </span>
      </div>
      <div className={cx('cart-item-action')}>
        <Icon
          onClick={handleRemove}
          icon='humbleicons:times-circle'
          className={cx('icon')}
        />
      </div>
    </div>
  );
};

export default CartItem;
