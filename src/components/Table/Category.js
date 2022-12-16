import React, { useEffect, useState } from 'react';
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
    return (
        <div className={cx("container")}>
            <div className={cx("row")}>
                <div className={cx("col-md-12")}>
                    <from>
                        <div className={cx("table-title")}>
                            <h2>Category</h2>
                            <div className={cx("table-subtitle-right")}>
                                <button className={cx("btn-add")}>+ New</button>
                            </div>
                        </div>
                        <div className={cx("table-content")}>
                            <table className={cx("table-table-striped")}>
                                <thead>
                                    <tr>
                                        <th width="200px" scope="col">ID</th>
                                        <th width="30%" scope="col">Name</th>
                                        <th width="20%" scope="col">Status</th>
                                        <th width="30%" scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.map((cate, index) => {
                                        return (
                                            <tr className>
                                                <td>{cate.id}</td>
                                                <td>{cate.name}</td>
                                                <td>{cate.status}</td>
                                                <td>Edit | Delete</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                            </div>
                        </div>
                    </from>
                </div>
            </div>
        </div>
    )
}
export default Category;