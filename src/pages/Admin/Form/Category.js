import className from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { httpGetCategoryById, httpPostCategory, httpPutCategory } from '~/apiServices/categoryServices';
import styles from './Form.module.scss';
import FormValidation from '~/components/Form/FormValidation';
import FormInput from '~/components/Form/FormInput';
import ValidationRegex from '~/utils/validationRegex';
import { STATUS } from '~/utils/enum';
import Clickable from '~/components/Clickable';

const cx = className.bind(styles);
const initValue = {
  name: '',
  status: 1,
};
function Category() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(initValue);

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

  const handleSubmit = async (e, formValidated) => {
    try {
      e.preventDefault();
      console.log(formValidated);
      if (!formValidated) {
        return;
      }
      //const newCategory = { ...category };
      if (id === 'add') {
        const res = await httpPostCategory(category);
        if (res.data) {
          console.log(res.data);
        } else console.log(res.errMsg);
      }
      else {
        const res = await httpPutCategory(category.id, category);
        if (res.data) {
          console.log(res.data);
        } else console.log(res.errMsg);
      }

    } catch (error) {
      console.log(error);
    }

    navigate('/admin/categories');
  };

  const formInputs = [
    {
      id: 1,
      name: 'name',
      title: 'Tên phân loại',
      type: 'text',
      placeholder: 'VD: Trà sữa',
      required: true,
      pattern: ValidationRegex.name.pattern,
      message: ValidationRegex.name.message,
    }
  ];
  return (
    <div className={cx("wrapper")}>
      <FormValidation>
        {({ setValidated, formValidated }) => (
          <form
            onSubmit={(e) => handleSubmit(e, formValidated)}
            className={cx('form')}
          >
            <h1>Phân loại</h1>
            
            {formInputs.map((formInput) => (
              <FormInput
                key={formInput.id}
                value={category[formInput.name]}
                onChange={handleChange}
                setValidated={setValidated}
                {...formInput}
              />
            ))}
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
            <span className={cx('height')} />
            <Clickable text='Gửi' primary />
          </form>
        )}
      </FormValidation>
    </div>

  )
}
export default Category;