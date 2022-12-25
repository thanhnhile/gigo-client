import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { httpDeleteCategory, httpGetAllCategories } from '../../apiServices/categoryServices';
import className from 'classnames/bind';
import styles from './Table.module.scss';

const cx = className.bind(styles);
function Category() {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        getAllCategories();
    }, [])

    const getAllCategories = async () => {
        const response = await httpGetAllCategories();
        console.log(response.data);
        setCategory(response.data);
    };

    const navigate = useNavigate();
    const handleAdd = async () => {
        navigate("/admin/categories/add");
    };

    const deleteData = async(id) => {
        if (window.confirm("Bạn có muốn xóa không?")) 
        {
            await httpDeleteCategory(id)
                .then(console.log("Deleted"))
                .catch(err => console.log(err));
                getAllCategories();
        }
    };
    return (
        <div className={cx("container")}>
            <div className={cx("row")}>
                <div className={cx("col-md-12")}>
                    <div className={cx("content")}>
                        <div className={cx("table-title")}>
                            <h2>Danh sách phân loại</h2>
                            <div className={cx("table-subtitle-right")}>
                                <button className={cx("btn-add")} onClick={() => handleAdd()}>+ Thêm </button>
                            </div>
                        </div>
                        <div className={cx("table-content")}>
                            <table>
                                <thead>
                                    <tr>
                                        <th width="200px" scope="col">ID</th>
                                        <th width="40%" scope="col">Phân loại</th>
                                        <th width="20%" scope="col">Trạng thái</th>
                                        <th width="20%" scope="col">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.map((cate, index) => {
                                        return (
                                            <tr className>
                                                <td>{cate.id}</td>
                                                <td>{cate.name}</td>
                                                {cate.status === true
                                                    ? (<td>Hoạt động</td>)
                                                    : (<td>Ẩn</td>)
                                                }
                                                <td>
                                                    <Link to={`/admin/categories/${cate.id}`} ><Icon icon='material-symbols:edit-square-outline-rounded' /> </Link>
                                                    |   {cate.status === true
                                                            ? (<Icon icon='material-symbols:delete-outline' onClick={() => deleteData(cate.id)}/>)
                                                            : (<Icon icon='material-symbols:auto-delete-outline'/>)
                                                        }
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Category;