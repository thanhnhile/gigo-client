import React, { useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";
import { Icon } from '@iconify/react';
import { httpGetAllCategories } from '../../apiServices/categoryServices';
import className from 'classnames/bind';
import styles from './Table.module.scss';

const cx = className.bind(styles);
function Category() {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const getAllCategories = async () => {
            const response = await httpGetAllCategories();
            console.log(response.data);
            setCategory(response.data);
        };
        getAllCategories();
    }, [])

    const navigate = useNavigate();
    const handleAdd = async () => {
        navigate("/admin/categories/add");
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
                                        <th width="30%" scope="col">Phân loại</th>
                                        <th width="20%" scope="col">Trạng thái</th>
                                        <th width="30%" scope="col">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.map((cate, index) => {
                                        return (
                                            <tr className>
                                                <td>{cate.id}</td>
                                                <td>{cate.name}</td>
                                                {cate.status === true
                                                    ? (<td>Đang bán</td>)
                                                    : (<td>Hết</td>)
                                                }
                                                <td><Icon icon='material-symbols:edit-square-outline-rounded' /> | <Icon icon='material-symbols:delete-outline' /></td>
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