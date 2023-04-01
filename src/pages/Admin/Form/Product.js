/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Form.module.scss';
import { Icon } from '@iconify/react';
import { httpGetAllCategories } from '~/apiServices/categoryServices';
import { httpPostProduct } from '~/apiServices/productServices';
import uploadImage from '~/apiServices/uploadImage';
import { STATUS } from '~/utils/enum';
import { useNavigate, useParams } from 'react-router-dom';
import {
  httpGetProductById,
  httpPutProduct,
} from '~/apiServices/productServices';

const cx = className.bind(styles);
function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    category: {
      id: '',
    },
    description: '',
    price: 0,
    img_url: '',
    status: 1,
  });
  const [image, setImage] = useState({
    file: '',
    url: '',
  });

  useEffect(() => {
    if (id === 'add') {
      return;
    } else {
      getProductById();
    }
  }, [id]);

  const getProductById = async () => {
    const response = await httpGetProductById(id);
    console.log(response.data);
    setProduct(response.data);
    setImage((prev) => {
      return { ...prev, url: response.data.img_url };
    });
  };

  useEffect(() => {
    const getAllCategory = async () => {
      const response = await httpGetAllCategories();
      setCategory(response.data);
    };
    getAllCategory();
  }, []);

  const handleChange = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImage({ file, url });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (image.file) {
        const url = await uploadImage(image.file);
        const productToAdd = { ...product, img_url: url };
        if (id === 'add') {
          const res = await httpPostProduct(productToAdd);
          if (res.data) {
            console.log(res.data);
          } else console.log(res.errMsg);
        } else {
          const res = await httpPutProduct(product.id, productToAdd);
          if (res.data) {
            console.log(res.data);
          } else console.log(res.errMsg);
        }
      } else {
        const productToAdd = { ...product };
        const res = await httpPutProduct(product.id, productToAdd);
        if (res.data) {
          console.log(res.data);
        } else console.log(res.errMsg);
      }
    } catch (error) {
      console.log(error);
    }
    navigate('/admin/products');
  };
  return (
    <div className={cx('wrapper')}>
      <form onSubmit={handleSubmit}>
        <h1>Sản phẩm</h1>

        <label>Phân loại</label>
        <select
          name='category'
          value={product.category.id}
          onChange={(e) =>
            setProduct({ ...product, category: { id: e.target.value } })
          }
        >
          <option>--Chọn--</option>
          {category.map((category) => {
            return <option value={category.id}>{category.name}</option>;
          })}
        </select>

        <label>Tên sản phẩm</label>
        <input name='name' value={product.name} onChange={handleChange} required />

        <label>Giá</label>
        <input name='price' value={product.price} onChange={handleChange} required />

        <label>Mô tả</label>
        <textarea
          name='description'
          value={product.description}
          onChange={handleChange}
        />

        <label>Trạng thái</label>
        <select name='status' value={product.status} onChange={handleChange}>
          {STATUS.map((item) => (
            <option key={item.id} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>

        <label>Ảnh</label>
        <div className={cx('image-wrapper')}>
          {image.url && <img className={cx('image')} src={image.url} alt='' />}
          {!image.file && (
            <input
              name='image'
              id='image'
              type='file'
              onChange={handleChangeImage}/>
          )}
        </div>

        <input type='submit' className={cx('submitButton')} />
      </form>
    </div>
  );
}
export default Product;
