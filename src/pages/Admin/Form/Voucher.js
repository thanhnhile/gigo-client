import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Form.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Clickable from '~/components/Clickable';
import { httpGetVoucherById, httpPostVoucher, httpPutVoucher } from '~/apiServices/voucherService';
import moment from 'moment-timezone';

const cx = className.bind(styles);

function Voucher() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [voucher, setVoucher] = useState({
        name: '',
        value: 0,
        startDate: '',
        endDate: '',
        code: '',
        minimumOrderValue: 0,
        maximumDiscountAmount: 0,
    });

    useEffect(() => {
        if (id === 'add') {
            return;
        }
        else {
            getVoucherById();
        }
    }, [id]);

    const getVoucherById = async () => {
        const response = await httpGetVoucherById(id);
        console.log(response.data);
        setVoucher(response.data);
    };

    const handleChange = (e) => {
        setVoucher((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const newVoucher = { ...voucher };
            console.log(newVoucher);
            if (id === 'add') {
                const res = await httpPostVoucher(newVoucher);
                if (res.data) {
                    console.log(res.data);
                } else console.log(res.errMsg);
            }
            else {
                const res = await httpPutVoucher(voucher.id, newVoucher);
                if (res.data) {
                    console.log(res.data);
                } else console.log(res.errMsg);
            }

        } catch (error) {
            console.log(error);
        }
        navigate('/admin/vouchers');
    };

    return (
        <div className={cx("wrapper")}>
            <form onSubmit={handleSubmit}>
                <h1>Mã giảm giá</h1>

                <label>Tên mã giảm giá</label>
                <input name="name"
                    value={voucher.name}
                    onChange={handleChange}
                    required />

                <label>Giá trị</label>
                <input name='value' value={voucher.value} onChange={handleChange} required />

                <label>Ngày bắt đầu</label>
                <input type='datetime-local' name='startDate' value={moment(voucher.startDate).format('YYYY-MM-DDTHH:mm')} onChange={handleChange} required />

                <label>Ngày kết thúc</label>
                <input type='datetime-local' name='endDate' value={moment(voucher.endDate).format('YYYY-MM-DDTHH:mm')} onChange={handleChange} required />

                <label>Mã code</label>
                <input name='code' value={voucher.code} onChange={handleChange} required />
                
                <label>Đơn tối thiểu</label>
                <input name='minimumOrderValue' value={voucher.minimumOrderValue} onChange={handleChange} required />
                
                <label>Giảm tối đa</label>
                <input name='maximumDiscountAmount' value={voucher.maximumDiscountAmount} onChange={handleChange} required />
                <Clickable text='Lưu' primary />
            </form>
        </div>

    );
}
export default Voucher;