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
            <h1>Product</h1>
            <label>Category</label>
            <select name="category">
                <option>Please choose one option</option>
                {category.map((category) => {
                    return (
                        <option value={category.id}>{category.name}</option>);
                })}
            </select>
            <label>Name</label>
            <input name="name" />
            <label>Price</label>
            <input name="price" />
            <label>Description</label>
            <textarea name="description" />
            <label>Status</label>
            <select name="status">
                <option selected value="true">True</option>
                <option value="false">False</option>
            </select>
            <label>Image</label>
            <input name="image" type="file"/>
            <input type="submit" className={cx("submitButton")} />
        </form>
    )
}
export default Product;