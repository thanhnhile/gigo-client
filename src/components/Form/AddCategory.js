import className from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpPostCategory } from '../../apiServices/categoryServices';
import styles from './Form.module.scss';

const cx = className.bind(styles);
const initValue = { name: ''};

function Category() {
    const navigate = useNavigate();
    const [category, setCategory] = useState(initValue);
    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        if(category.name === '')
        {
            e.preventDefault();
        }
        const newCategory = {
            name: category.name,
        };
        const response = await httpPostCategory(newCategory);
        
        setCategory(initValue);
        console.log(response);
        response.errMsg && navigate('/admin/categories');
    };

    return (
        <div className={cx("wrapper")}>
            <form >
                <h1>Phân loại</h1>
                
                <label>Tên</label>
                <input name="name"
                    type="text"
                    onChange={handleChange}
                    required />
                
                <input type="submit" className={cx("submitButton")} onClick={() => handleSubmit()} />
            </form>
        </div>

    )
}
export default Category;