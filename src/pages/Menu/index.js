import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import className from 'classnames/bind'
import styles from './Menu.module.scss'
import { httpGetAllCategories } from '../../apiServices/categoryServices'
import ListProduct from '../../components/Product/ListProduct';
import { httpGetProductByCateId, httpGetAllProduct } from '../../apiServices/productServices';
const cx = className.bind(styles)

const Menu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    const getAllCategories = async () => {
      const response = await httpGetAllCategories();
      console.log(response.data);
      setMenu(response.data);
    };
    getAllCategories();
  }, [])

  const { id } = useParams();
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
    
    if(id === 'all') { 
      getProductAll() 
    } else { 
      getProductByCateId()
    };
  }, [id]);
  return (
    <div className={cx("wrap")}>
      <div className={cx("menu")}>
        <h3>Categories</h3>
        <ul>
          {menu && menu.map((menuItem) =>
            <li className={cx("category")} key={menuItem.id}><a href={menuItem.id}>{menuItem.name}</a></li>)}
        </ul>
      </div>
      <div className={cx("product")}>
        <ListProduct product={product} />
      </div>

    </div>
  )
}

export default Menu
