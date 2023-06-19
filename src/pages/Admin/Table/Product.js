import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { httpDeleteProduct, httpGetAll } from '~/apiServices/productServices';
import { formatPrice, formatPercent } from '~/utils/format';
import className from 'classnames/bind';
import styles from './Table.module.scss';
import CustomDataTable from '~/components/CustomDataTable';
import Clickable from '~/components/Clickable';


const cx = className.bind(styles);
function Product() {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        getAllProduct();
    }, []);

    const getAllProduct = async () => {
        const response = await httpGetAll();
        console.log(response.data);
        setProduct(response.data);
    };

    const navigate = useNavigate();
    const handleAdd = async () => {
        navigate("/admin/products/add");
    };
    const deleteData = async (id) => {
        if (window.confirm("Bạn có muốn xóa không?")) {
            await httpDeleteProduct(id)
                .then(console.log("Deleted"))
                .catch(err => console.log(err));
            getAllProduct();
        }

    };

    const columns = [
        {
            name: 'ID',
            width: '40px',
            selector: (row) => row.id,
        },
        {
            name: 'Tên sản phẩm',
            width: '200px',
            selector: (row) => row.name,
        }
        ,
        {
            name: 'Giá',
            width: '100px',
            selector: (row) => formatPrice(row.price),
        },
        {
            name: 'Giảm',
            width: '70px',
            selector: (row) => formatPercent(row.discount),
        },
        {
            name: 'Mô tả',
            width: '250px',
            selector: (row) => row.description,
            grow: 2,
        },
        {
            name: 'Trạng thái',
            width: '100px',
            selector: (row) => row.status === true
                ? ('Hoạt động')
                : ('Ẩn'),
        },
        {
            name: 'Topping',
            width: '100px',
            selector: (row) => row.hasTopping === true
                ? ('Có')
                : ('Không'),
        },
        {
            width: '30px',
            selector: (row) =>
                <Link to={`/admin/products/${row.id}`} ><Icon icon='material-symbols:edit-square-outline-rounded' /> </Link>
            ,
        },
        {
            width: '30px',
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
                            <h2>Danh sách sản phẩm</h2>
                            <div className={cx("table-subtitle-right")}>
                                <Clickable text='Thêm' primary onClick={handleAdd} />
                            </div>
                        </div>
                        <div className={cx("table-content")}>
                            <CustomDataTable data={product} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Product;