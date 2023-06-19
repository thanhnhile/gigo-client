/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Form.module.scss';
import { httpGetAvailableCategories } from '~/apiServices/categoryServices';
import uploadImage from '~/apiServices/uploadImage';
import { STATUS, TOPPING_STATUS } from '~/utils/enum';
import { useNavigate, useParams } from 'react-router-dom';
import FormValidation from '~/components/Form/FormValidation';
import FormInput from '~/components/Form/FormInput';
import ValidationRegex from '~/utils/validationRegex';
import Clickable from '~/components/Clickable';
import {
  httpGetProductById,
  httpPostProduct,
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
    discount: 0,
    img_url: '',
    status: 1,
    hasTopping: 1,
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
    console.log(response.data.product);
    setProduct(response.data.product);
    setImage((prev) => {
      return { ...prev, url: response.data.product.img_url };
    });
  };

  useEffect(() => {
    const getAllAvailableCategory = async () => {
      const response = await httpGetAvailableCategories();
      setCategory(response.data);
    };
    getAllAvailableCategory();
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
  const handleSubmit = async (e, formValidated) => {
    try {
      e.preventDefault();
      if (!formValidated) {
        return;
      }
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
  const formInputs = [
    {
      id: 1,
      name: 'name',
      type: 'text',
      title: 'Tên sản phẩm',
      placeholder: 'VD: Trà sữa trân châu',
      required: true,
      pattern: ValidationRegex.name.pattern,
      message: ValidationRegex.name.message,
    },
    {
      id: 2,
      name: 'price',
      type: 'number',
      title: 'Giá',
      placeholder: 'VD: 30000',
      required: true,
      pattern: ValidationRegex.price.pattern,
      message: ValidationRegex.price.message,
    },
    {
      id: 3,
      name: 'discount',
      type: 'number',
      title: 'Giảm giá',
      placeholder: 'VD: 0.1',
      required: true,
    }
  ];
  return (
    <div className={cx('wrapper')}>
      <FormValidation>
        {({ setValidated, formValidated }) => (
          <form
            onSubmit={(e) => handleSubmit(e, formValidated)}
            className={cx('form')}
          >
            <h1>Sản phẩm</h1>

            <label>Phân loại</label>
            <select
              required
              name='category'
              value={product.category.id}
              onChange={(e) =>
                setProduct({ ...product, category: { id: e.target.value } })
              }
            >
              <option value="">--Chọn--</option>
              {category.map((category) => {
                return <option value={category.id}>{category.name}</option>;
              })}
            </select>
            {formInputs.map((formInput) => (
              <FormInput
                key={formInput.id}
                value={product[formInput.name]}
                onChange={handleChange}
                setValidated={setValidated}
                {...formInput}
              />
            ))}
            <label>Mô tả</label>
            <textarea
              className={cx('vertical-resize')}
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

            <label>Topping</label>
            <select name='hasTopping' value={product.hasTopping} onChange={handleChange}>
              {TOPPING_STATUS.map((item) => (
                <option key={item.id} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>

            <label>Ảnh</label>
            <div className={cx('image-wrapper')}>
              {image.url && <img className={cx('image')} src={image.url} alt='' />}
              {!image.file && image.url && (
                <input
                  name='image'
                  id='image'
                  type='file'
                  onChange={handleChangeImage}
                />
              )}
              {!image.file && !image.url && (
                <input
                  name='image'
                  id='image'
                  type='file'
                  onChange={handleChangeImage}
                  required
                />
              )}
            </div>
            <span className={cx('height')} />
            <Clickable text='Gửi' primary />
          </form>
        )}
      </FormValidation>
      {/* <form onSubmit={handleSubmit}>
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

        <label>Giảm giá</label>
        <input name='discount' value={product.discount} onChange={handleChange} required />

        <label>Mô tả</label>
        <textarea
        className={cx('vertical-resize')}
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

        <label>Topping</label>
        <select name='hasTopping' value={product.hasTopping} onChange={handleChange}>
          {TOPPING_STATUS.map((item) => (
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
              onChange={handleChangeImage} />
          )}
        </div>

        <Clickable text='Lưu' primary />
      </form> */}
    </div>
  );
}
export default Product;
