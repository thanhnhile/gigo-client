import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Menu.module.scss';
import { httpGetAllCategories } from '../../apiServices/categoryServices';
import ListProduct from '../../components/Product/ListProduct';
import {
  httpGetProductByCateId,
  httpGetAllProduct,
} from '../../apiServices/productServices';
const cx = className.bind(styles);

const Menu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    const getAllCategories = async () => {
      const response = await httpGetAllCategories();
      console.log(response.data);
      setMenu(response.data);
    };
    getAllCategories();
  }, []);

  const { id } = useParams();
  const [currentId, setCurrentId] = useState(id);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProductByCateId = async () => {
      const response = await httpGetProductByCateId(id);
      console.log(response.data);
      setProduct(response.data.content);
    };

    const getProductAll = async () => {
      const response = await httpGetAllProduct();
      console.log(response.data);
      setProduct(response.data.content);
    };

    if (id === 'all') {
      getProductAll();
    } else {
      getProductByCateId();
    }
    setCurrentId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div className={cx('container', 'wrap')}>
      <div className={cx('col', 'menu')}>
        <Link to='/menu/all'>
          <h3>MENU</h3>
        </Link>
        <ul>
          {menu &&
            menu.map((menuItem) => (
              <li
                className={cx('category', {
                  active: Number.parseInt(currentId) === menuItem.id,
                })}
                key={menuItem.id}
              >
                <Link to={`/menu/${menuItem.id}`}>{menuItem.name}</Link>
              </li>
            ))}
        </ul>
      </div>
      <div className={cx('col', 'product')}>
        <ListProduct product={product} />
      </div>
    </div>
  );
};

export default Menu;
