import className from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { httpGetToppingById, httpPostTopping, httpPutTopping } from '../../../apiServices/toppingServices';
import styles from './Form.module.scss';
import FormValidation from '~/components/Form/FormValidation';
import FormInput from '~/components/Form/FormInput';
import ValidationRegex from '~/utils/validationRegex';
import { STATUS } from '~/utils/enum';
import Clickable from '~/components/Clickable';

const cx = className.bind(styles);
const initValue = {
    name: '',
    price: 0,
    status: 1,
};
function Topping() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [topping, setTopping] = useState(initValue);

    useEffect(() => {
        if (id === 'add') {
            return
        }
        else {
            GetToppingById();
        }
    }, [id]);

    const GetToppingById = async () => {
        const response = await httpGetToppingById(id);
        console.log(response.data);
        setTopping(response.data);
    };

    const handleChange = (e) => {
        setTopping((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = async (e, formValidated) => {
        try {
            e.preventDefault();
            if (!formValidated) {
                return;
            }
            if (id === 'add') {
                const res = await httpPostTopping(topping);
                if (res.data) {
                    console.log(res.data);
                } else console.log(res.errMsg);
            }
            else {
                console.log(topping);
                const res = await httpPutTopping(topping.id, topping);
                if (res.data) {
                    console.log(res.data);
                } else console.log(res.errMsg);
            }

        } catch (error) {
            console.log(error);
        }

        navigate('/admin/toppings');
    };
    const formInputs = [
        {
            id: 1,
            name: 'name',
            type: 'text',
            title: 'Tên topping',
            placeholder: 'VD: Trân châu trắng',
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
                        <h1>Topping</h1>

                        {formInputs.map((formInput) => (
                            <FormInput
                                key={formInput.id}
                                value={topping[formInput.name]}
                                onChange={handleChange}
                                setValidated={setValidated}
                                {...formInput}
                            />
                        ))}
                        <label>Trạng thái</label>
                        <select name="status"
                            value={topping.status}
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
export default Topping;