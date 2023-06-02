import { useState, useEffect, useCallback } from 'react';
import className from 'classnames/bind';
import styles from './Product.module.scss';
import { Icon } from '@iconify/react';

import Clickable from '~/components/Clickable';
import ListRating from '~/components/ReviewProduct/ListRating';
import useCart from '~/hooks/useCart';
import { httpGetAllToppings } from '~/apiServices/toppingServices';
import { formatPrice } from '~/utils/format';
const cx = className.bind(styles);

const SIZE_OPTIONS = [
  {
    id: 'size-s',
    value: 'S',
    name: 'Nhỏ + 0đ',
  },
  {
    id: 'size-m',
    value: 'M',
    name: 'Vừa + 6.000đ',
  },
  {
    id: 'size-l',
    value: 'L',
    name: 'Lớn + 10.000đ',
  },
];

const SUGAR_OPTIONS = [
  {
    id: 'sugar-0',
    value: '0',
    name: 'Không đường',
  },
  {
    id: 'sugar-30',
    value: '30%',
    name: '30%',
  },
  {
    id: 'sugar-50',
    value: '50%',
    name: '50%',
  },
  {
    id: 'sugar-70',
    value: '70%',
    name: '70%',
  },
  {
    id: 'sugar-100',
    value: '100%',
    name: '100%',
  },
];

const ICE_OPTIONS = [
  {
    id: 'ice-0',
    value: '0',
    name: 'Không đá',
  },
  {
    id: 'ice-50',
    value: '50%',
    name: '50%',
  },
  {
    id: 'ice-100',
    value: '100%',
    name: '100%',
  },
];

const mapToppingOptions = (data = []) => {
  return data
    .filter((item) => item.status)
    .map((item) => ({
      id: item.id,
      value: item.id,
      name: `${item.name} + ${formatPrice(item.price)}`,
    }));
};

const ProductDetail = ({ product, rates }) => {
  const [size, setSize] = useState('S');
  const [sugar, setSugar] = useState('100%');
  const [ice, setIce] = useState('100%');
  const [toppings, setToppings] = useState([]);
  const [toppinOptions, setToppingOptions] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const getToppings = async () => {
      const res = await httpGetAllToppings();
      if (res?.data) {
        setToppingOptions(mapToppingOptions(res.data));
      }
    };
    product?.hasTopping && getToppings();
  }, [product?.hasTopping]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
  const handleMinus = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };
  const handleChangeOption = useCallback((e) => {
    switch (e.target.name) {
      case 'size':
        setSize(e.target.value);
        break;
      case 'sugar':
        setSugar(e.target.value);
        break;
      case 'ice':
        setIce(e.target.value);
        break;
      default:
        break;
    }
  }, []);

  const handleChangeToppingOption = useCallback(
    (e) => {
      const toppingId = Number.parseInt(e.target.value);
      if (!toppings.includes(toppingId)) {
        const newToppings = [...toppings];
        newToppings.push(toppingId);
        setToppings(newToppings);
      } else {
        const newToppings = toppings.filter((item) => item !== toppingId);
        setToppings(newToppings);
      }
    },
    [toppings]
  );

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
  console.log(toppings);
  return (
    <div className={cx('wrapper', 'min-container')}>
      <div className={cx('flex-box', 'product-detail')}>
        <div className={cx('left-column')}>
          <img src={product?.img_url} alt='' />
        </div>
        <div className={cx('right-column')}>
          <div className={cx('product-description')}>
            <h1>{product?.name}</h1>
            <h3 className={cx('price')}>{formatPrice(product?.price)}</h3>
            <p>{product?.description}</p>
          </div>
          <SwitchField
            title='Chọn size'
            options={SIZE_OPTIONS}
            fieldName={'size'}
            checked={(value) => value === size}
            handleChange={handleChangeOption}
          />
          <SwitchField
            title='Chọn lượng đường'
            options={SUGAR_OPTIONS}
            fieldName={'sugar'}
            checked={(value) => value === sugar}
            handleChange={handleChangeOption}
          />
          <SwitchField
            title='Chọn lượng đá'
            options={ICE_OPTIONS}
            fieldName={'ice'}
            checked={(value) => value === ice}
            handleChange={handleChangeOption}
          />
          <SwitchField
            title='Chọn topping'
            options={toppinOptions}
            fieldName={'toppings'}
            checked={(value) => toppings?.includes(value)}
            type='checkbox'
            handleChange={handleChangeToppingOption}
          />
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
          <Clickable
            primary
            onClick={handleAddToCart}
            icon={<Icon icon='mdi:add-shopping-cart' width='24' />}
          />
        </div>
      </div>
      <ListRating list={rates} />
    </div>
  );
};

const SwitchField = ({
  title,
  fieldName,
  options = [],
  handleChange,
  checked = () => {},
  type = 'radio',
}) => {
  return (
    <details className={cx('product-select')}>
      <summary className={cx('title')}>{title}</summary>
      <div className={cx('switch-field')}>
        {options.map((item) => (
          <div>
            <input
              type={type}
              id={item.id}
              name={fieldName}
              value={item.value}
              checked={checked(item.value)}
              hidden
              onChange={handleChange}
            />
            <label for={item.id}>{item.name}</label>
          </div>
        ))}
      </div>
    </details>
  );
};
export default ProductDetail;