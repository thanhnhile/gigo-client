import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Form.module.scss';
import { httpGetCategoryById, httpPutCategory } from '../../apiServices/categoryServices';

const cx = className.bind(styles);
function Category() {
    const { id } = useParams();
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const statusRef = useRef(null);
    const [category, setCategory] = useState({});
    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        const GetCategoryById = async () => {
            const response = await httpGetCategoryById(id);
            console.log(response.data);
            setCategory(response.data);
        };
        GetCategoryById();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const status = statusRef.current.value;
        if(name === '')
        {
            
        }
        try {
            await httpPutCategory(category.id, name, status)
                .then
                (
                    () => {
                        navigate('/admin/categories');
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
                <h1>Phân loại</h1>
                
                <label>Tên</label>
                <input name="name"
                    ref={nameRef}
                    value={category.name}
                    onChange={handleChange} 
                    required />
                
                <label>Trạng thái</label>
                <select name="status"
                    ref={statusRef}
                    value={category.status}
                    onChange={handleChange}
                    required
                >
                    <option value="default">--Chọn--</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                
                <input type="submit" className={cx("submitButton")} onClick={() => handleSubmit()} />
            </form>
        </div>

    )
}
export default Category;