import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Form.module.scss';
import { httpGetAllCategories } from '../../apiServices/categoryServices';


const cx = className.bind(styles);
function Product() {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const getAllCategory = async () => {
            const response = await httpGetAllCategories();
            setCategory(response.data);
        };
        getAllCategory();
    }, []);
    return (
        <form >
            <h1>Sản phẩm</h1>
            <label>Phân loại</label>
            <select name="category">
                <option>--Chọn--</option>
                {category.map((category) => {
                    return (
                        <option value={category.id}>{category.name}</option>);
                })}
            </select>
            <label>Tên sản phẩm</label>
            <input name="name" />
            <label>Giá</label>
            <input name="price" />
            <label>Mô tả</label>
            <textarea name="description" />
            <label>Trạng thái</label>
            <select name="status">
                <option selected value="true">True</option>
                <option value="false">False</option>
            </select>
            <label>Ảnh</label>
            <input name="image" type="file" />
            <input type="submit" className={cx("submitButton")} />
        </form>
    )
}
export default Product;