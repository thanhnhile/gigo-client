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
        console.log(e.target.value);
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
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
                    value={category.name}
                    onChange={handleChange}
                    required />
                
                <label>Trạng thái</label>
                <select name="status"
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