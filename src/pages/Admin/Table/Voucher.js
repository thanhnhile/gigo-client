import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import className from 'classnames/bind';
import styles from './Table.module.scss';
import CustomDataTable from '~/components/CustomDataTable';
import Clickable from '~/components/Clickable';
import { httpGetAllVoucher, httpDeleteVoucher } from '~/apiServices/voucherService';
import { formatPrice } from '~/utils/format';
import moment from 'moment-timezone';

const cx = className.bind(styles);

function Voucher() {
    const navigate = useNavigate();
    const [voucher, setVoucher] = useState([]);

    useEffect(() => {
        getAllVoucher();
    }, []);

    const getAllVoucher = async () => {
        const response = await httpGetAllVoucher();
        console.log(response);
        setVoucher(response.data);
    };

    const handleAdd = async () => {
        navigate("/admin/vouchers/add");
    };
    const deleteData = async (id) => {
        if (window.confirm("Bạn có muốn xóa không?")) {
            await httpDeleteVoucher(id)
                .then(console.log("Deleted"))
                .catch(err => console.log(err));
            getAllVoucher();
        }

    };

    const columns = [
        {
            name: 'ID',
            width: '5%',
            selector: (row) => row.id,
        },
        {
            name: 'Tên mã giảm giá',
            width: '18%',
            selector: (row) => row.name,
        },
        {
            name: 'Giá trị',
            width: '7%',
            selector: (row) => row.value,
        },
        {
            name: 'Ngày bắt đầu',
            width: '16%',
            selector: (row) => moment(row.startDate).format('MM-DD-YYYY hh:mm A'),
        },
        {
            name: 'Ngày kết thúc',
            width: '16%',
            selector: (row) => moment(row.endDate).format('MM-DD-YYYY hh:mm A'),
        },
        {
            name: 'Mã code',
            width: '10%',
            selector: (row) => row.code,
        },
        {
            name: 'Đơn tối thiểu',
            width: '10%',
            selector: (row) => formatPrice(row.minimumOrderValue),
        },
        {
            name: 'Giảm tối đa',
            width: '10%',
            selector: (row) => formatPrice(row.maximumDiscountAmount),
        },
        {
            width: '3%',
            selector: (row) =>
                <Link to={`/admin/vouchers/${row.id}`} ><Icon icon='material-symbols:edit-square-outline-rounded' /> </Link>
            ,
        },
        {
            width: '5%',
            selector: (row) => <Icon icon='material-symbols:delete-outline' onClick={() => deleteData(row.id)} />
            ,
        },
    ];
    return (
        <div className={cx("container")}>
            <div className={cx("row")}>
                <div className={cx("col-md-12")}>
                    <div className={cx("content")}>
                        <div className={cx("table-title")}>
                            <h2>Danh sách mã giảm giá</h2>
                            <div className={cx("table-subtitle-right")}>
                                <Clickable text='Thêm' primary onClick={handleAdd} />
                            </div>
                        </div>
                        <div className={cx("table-content")}>
                            <CustomDataTable data={voucher} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Voucher;