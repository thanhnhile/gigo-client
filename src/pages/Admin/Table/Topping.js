import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { formatPrice } from '~/utils/format';
import { httpGetAllToppings, httpDeleteTopping } from '../../../apiServices/toppingService';
import className from 'classnames/bind';
import styles from './Table.module.scss';
import CustomDataTable from '~/components/CustomDataTable';
import Clickable from '~/components/Clickable';


const cx = className.bind(styles);
function Topping() {
    const navigate = useNavigate();
    const [topping, setTopping] = useState([]);
    useEffect(() => {
        getAllToppings();
    }, [])

    const getAllToppings = async () => {
        const response = await httpGetAllToppings();
        console.log(response.data);
        setTopping(response.data);
    };

    const handleAdd = async () => {
        navigate("/admin/toppings/add");
    };

    const deleteData = async (id) => {
        if (window.confirm("Bạn có muốn xóa không?")) {
            await httpDeleteTopping(id)
                .then(console.log("Deleted"))
                .catch(err => console.log(err));
            getAllToppings();
        }
    };

    const columns = [
        {
            name: 'ID',
            width: '20%',
            selector: (row) => row.id,
        },
        {
            name: 'Tên topping',
            width: '30%',
            selector: (row) => row.name,
        },
        {
            name: 'Giá',
            width: '15%',
            selector: (row) => formatPrice(row.price),
        },
        {
            name: 'Trạng thái',
            width: '20%',
            selector: (row) =>
                row.status === true
                    ? ('Hoạt động')
                    : ('Ẩn')
            ,
        },
        {
            width: '5%',
            selector: (row) =>
                <Link to={`/admin/toppings/${row.id}`} ><Icon icon='material-symbols:edit-square-outline-rounded' /> </Link>
            ,
        },
        {
            width: '10%',
            selector: (row) =>
                row.status === true
                    ? (<Icon icon='material-symbols:delete-outline' onClick={() => deleteData(row.id)} />)
                    : (<Icon icon='material-symbols:auto-delete-outline' />)
            ,
        },
    ];
    return (
        <div className={cx("min-container")}>
            <div className={cx("row")}>
                <div className={cx("col-md-12")}>
                    <div className={cx("content")}>
                        <div className={cx("table-title")}>
                            <h2>Danh sách topping</h2>
                            <div className={cx("table-subtitle-right")}>
                                <Clickable text='Thêm' primary onClick={handleAdd} />
                            </div>
                        </div>
                        <div className={cx("table-content")}>
                            <CustomDataTable data={topping} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Topping;