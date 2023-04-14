import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { httpDeleteCategory, httpGetAllCategories } from '~/apiServices/categoryServices';
import className from 'classnames/bind';
import styles from './Table.module.scss';
import CustomDataTable from '~/components/CustomDataTable';
import Clickable from '~/components/Clickable';


const cx = className.bind(styles);
function Category() {
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    useEffect(() => {
        getAllCategories();
    }, [])

    const getAllCategories = async () => {
        const response = await httpGetAllCategories();
        console.log(response.data);
        setCategory(response.data);
    };

    const handleAdd = async () => {
        navigate("/admin/categories/add");
    };

    const deleteData = async (id) => {
        if (window.confirm("Bạn có muốn xóa không?")) {
            await httpDeleteCategory(id)
                .then(console.log("Deleted"))
                .catch(err => console.log(err));
            getAllCategories();
        }
    };

    const columns = [
        {
            name: 'ID',
            width: '20%',
            selector: (row) => row.id,
        },
        {
            name: 'Phân loại',
            width: '30%',
            selector: (row) => row.name,
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
                <Link to={`/admin/categories/${row.id}`} ><Icon icon='material-symbols:edit-square-outline-rounded' /> </Link>
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
                            <h2>Danh sách phân loại</h2>
                            <div className={cx("table-subtitle-right")}>
                                <Clickable text='Thêm' primary onClick={handleAdd} />
                            </div>
                        </div>
                        <div className={cx("table-content")}>
                            <CustomDataTable data={category} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Category;