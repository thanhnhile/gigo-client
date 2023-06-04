import { useState, useEffect, useCallback } from 'react';
import className from 'classnames/bind';
import styles from './Product.module.scss';
import { Icon } from '@iconify/react';
import ListRating from '~/components/ReviewProduct/ListRating';
import useCart from '~/hooks/useCart';
import { httpGetAllToppings } from '~/apiServices/toppingServices';
import { formatPrice } from '~/utils/format';
const cx = className.bind(styles);

const SIZE_OPTIONS = [
  {
    id: 'size-s',
    value: 'S',
    label: 'Nhỏ + 0đ',
  },
  {
    id: 'size-m',
    value: 'M',
    label: 'Vừa + 6.000đ',
  },
  {
    id: 'size-l',
    value: 'L',
    label: 'Lớn + 10.000đ',
  },
];

const SIZE_PRICE = {
  S: 0,
  M: 6000,
  L: 10000,
};
const SUGAR_OPTIONS = [
  {
    id: 'sugar-0',
    value: '0',
    label: 'Không đường',
  },
  {
    id: 'sugar-30',
    value: '30%',
    label: '30%',
  },
  {
    id: 'sugar-50',
    value: '50%',
    label: '50%',
  },
  {
    id: 'sugar-70',
    value: '70%',
    label: '70%',
  },
  {
    id: 'sugar-100',
    value: '100%',
    label: '100%',
  },
];

const ICE_OPTIONS = [
  {
    id: 'ice-0',
    value: '0',
    label: 'Không đá',
  },
  {
    id: 'ice-50',
    value: '50%',
    label: '50%',
  },
  {
    id: 'ice-100',
    value: '100%',
    label: '100%',
  },
];

const mapToppingOptions = (data = []) => {
  return data
    .filter((item) => item.status)
    .map((item, index) => ({
      id: item.id,
      value: index,
      name: item.name,
      label: `${item.name} + ${formatPrice(item.price)}`,
      price: item.price,
    }));
};

const ProductDetail = ({ product, rates }) => {
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState('S');
  const [sugar, setSugar] = useState('100%');
  const [ice, setIce] = useState('100%');
  const [toppings, setToppings] = useState([]);
  const [toppingOptions, setToppingOptions] = useState([]);

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
    setPrice(product?.price);
  }, [product]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const toppingsPrice = toppings.reduce((total, item) => {
      return total + item.price;
    }, 0);
    setPrice(product?.price + SIZE_PRICE[size] + toppingsPrice);
  }, [product?.price, size, toppings]);

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
  const handleMinus = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };

  const handleSizeChange = (newSize) => {
    let upSize = 0;
    setSize((prev) => {
      upSize = SIZE_PRICE[newSize] - SIZE_PRICE[prev];
      return newSize;
    });

    setPrice((prev) => prev + upSize);
  };
  const handleChangeOption = useCallback((e) => {
    switch (e.target.name) {
      case 'size':
        handleSizeChange(e.target.value);
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

  const checkToppingIsSelecting = useCallback(
    (index) => {
      const selected = toppingOptions[Number.parseInt(index)];
      return toppings.filter((item) => item.id === selected.id).length > 0;
    },
    [toppingOptions, toppings]
  );
  const handleChangeToppingOption = useCallback(
    (e) => {
      const index = Number.parseInt(e.target.value);
      const selected = toppingOptions[index];
      if (checkToppingIsSelecting(index)) {
        const newToppings = toppings.filter((item) => item.id !== selected.id);
        setToppings(newToppings);
      } else {
        const newToppings = [...toppings];
        newToppings.push(selected);
        setToppings(newToppings);
      }
    },
    [checkToppingIsSelecting, toppingOptions, toppings]
  );

  const handleAddToCart = () => {
    const selectToppings = toppings.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    const cartItem = {
      productId: product.id,
      image: product.img_url,
      name: product.name,
      quantity: quantity,
      size: size,
      price,
      sugar,
      iced: ice,
      toppings: selectToppings,
    };
    addToCart(cartItem);
    setQuantity(1);
    setToppings([]);
  };

  return (
    <div className={cx('wrapper', 'container')}>
      <div className={cx('flex-box', 'product-detail')}>
        <div className={cx('left-column')}>
          <img src={product?.img_url} alt='' />
          <p className={cx('description')}>{product?.description}</p>
        </div>
        <div className={cx('right-column')}>
          <div className={cx('product-description')}>
            <h1>{product?.name}</h1>
            <h3 className={cx('price')}>{formatPrice(price)}</h3>
            <div className={cx('product-count')}>
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
            title='Chọn topping (có thể chọn nhiều loại)'
            options={toppingOptions}
            fieldName={'toppings'}
            checked={(value) => checkToppingIsSelecting(value)}
            type='checkbox'
            handleChange={handleChangeToppingOption}
          />
          <button className={cx('add-cart-btn')} onClick={handleAddToCart}>
            <Icon icon='material-symbols:add-shopping-cart' />
            Thêm vào giỏ hàng
          </button>
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
    <details className={cx('product-select')} open>
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
            <label for={item.id}>{item.label}</label>
          </div>
        ))}
      </div>
    </details>
  );
};
export default ProductDetail;
