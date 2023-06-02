import className from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { httpGetToppingById, httpPostTopping, httpPutTopping } from '../../../apiServices/toppingService';
import styles from './Form.module.scss';
import { STATUS } from '~/utils/enum';
import Clickable from '~/components/Clickable';

const cx = className.bind(styles);

function Topping() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [topping, setTopping] = useState({
        name: '',
        price: 0,
        status: 1,
    });

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

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const newTopping = { ...topping };
            if (id === 'add') {
                const res = await httpPostTopping(newTopping);
                if (res.data) {
                    console.log(res.data);
                } else console.log(res.errMsg);
            }
            else {
                const res = await httpPutTopping(topping.id, newTopping);
                if (res.data) {
                    console.log(res.data);
                } else console.log(res.errMsg);
            }

        } catch (error) {
            console.log(error);
        }

        navigate('/admin/toppings');
    };

    return (
        <div className={cx("wrapper")}>
            <form onSubmit={handleSubmit}>
                <h1>Phân loại</h1>

                <label>Tên</label>
                <input name="name"
                    type="text"
                    value={topping.name}
                    onChange={handleChange}
                    required />

                <label>Giá</label>
                <input name='price' value={topping.price} onChange={handleChange} required />

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

                <Clickable text='Lưu' primary />
            </form>
        </div>

    )
}
export default Topping;