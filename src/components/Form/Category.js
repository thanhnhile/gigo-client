import className from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { httpGetCategoryById, httpPostCategory, httpPutCategory } from '../../apiServices/categoryServices';
import styles from './Form.module.scss';
import { STATUS } from '~/utils/enum';

const cx = className.bind(styles);

function Category() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: '',
    status: 1,
  });

  useEffect(() => {
    if (id === 'add') {
      return
    }
    else {
      GetCategoryById();
    }
  }, [id]);

  const GetCategoryById = async () => {
    const response = await httpGetCategoryById(id);
    console.log(response.data);
    setCategory(response.data);
  };

  const handleChange = (e) => {
    setCategory((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newCategory = { ...category };
      if (id === 'add') {
        const res = await httpPostCategory(newCategory);
        if (res.data) {
          console.log(res.data);
        } else console.log(res.errMsg);
      }
      else {
        const res = await httpPutCategory(category.id, newCategory);
        if (res.data) {
          console.log(res.data);
        } else console.log(res.errMsg);
      }

    } catch (error) {
      console.log(error);
    }

    navigate('/admin/categories');
  };

  return (
    <div className={cx("wrapper")}>
      <form onSubmit={handleSubmit}>
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
        >
          {STATUS.map((item) => (
            <option key={item.id} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>

        <input type="submit" className={cx("submitButton")} />
      </form>
    </div>

  )
}
export default Category;