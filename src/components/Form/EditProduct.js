import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Form.module.scss';
import { httpGetAllCategories } from '../../apiServices/categoryServices';
import { httpGetProductById, httpPutProduct } from '../../apiServices/productServices';


const cx = className.bind(styles);
function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const categoryRef = useRef(null);
    const nameRef = useRef(null);
    const priceRef = useRef(null);
    const descriptonRef = useRef(null);
    const statusRef = useRef(null);
    const imageRef = useRef(null);
    const [category, setCategory] = useState();
    const [product, setProduct] = useState({});
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };
    const handleChangeCate = (e) => {
        console.log(e.target.value);
        setCategory(e.target.value);
    };
    useEffect(() => {
        const getProductById = async () => {
            const response = await httpGetProductById(id);
            console.log(response.data);
            setProduct(response.data);
            setCategory(response.data.category.id);
        };
        getProductById();
    }, [id]);


    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getAllCategories = async () => {
            const response = await httpGetAllCategories();
            setCategories(response.data);
        };
        getAllCategories();
    }, []);

    const handleSubmit = async (e) => {
        const name = nameRef.current.value;
        const price = priceRef.current.value;
        const description = descriptonRef.current.value;
        const status = statusRef.current.value;
        if(name === '')
        {
            e.preventDefault();
        }
        try {
            await httpPutProduct(category.id, name, status)
                .then
                (
                    () => {
                        navigate('/admin/products');
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        } catch (error) {
            console.log(error);
        }

    };
    return (
        <div className={cx("wrapper")}>
            <form >
                <h1>Sản phẩm</h1>
                <label>Phân loại</label>
                <select name="category"
                    ref={categoryRef}
                    value={category}
                    onChange={handleChangeCate}
                    required
                >
                    <option value='default'>--Chọn--</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <label>Tên sản phẩm</label>
                <input name="name"
                    ref={nameRef}
                    value={product.name}
                    onChange={handleChange}
                />
                <label>Giá</label>
                <input name="price"
                    ref={priceRef}
                    value={product.price}
                    onChange={handleChange} />
                <label>Mô tả</label>
                <textarea name="description"
                    ref={descriptonRef}
                    value={product.description}
                    onChange={handleChange} />
                <label>Trạng thái</label>
                <select name="status"
                    value={product.status}
                    onChange={handleChange}
                    required
                >
                    <option value="default">--Chọn--</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                <label>Ảnh</label>
                <input name="image" type="file" />
                <input type="submit" className={cx("submitButton")} />
            </form>
        </div>
    )
}
export default Product;