import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import { Icon } from '@iconify/react';
import { httpGetAllStore } from '../../apiServices/storeServices';
import className from 'classnames/bind';
import styles from './Table.module.scss';

const cx = className.bind(styles);
function Store() {
    const [store, setStore] = useState([]);

    useEffect(() => {
        const getAllStore = async () => {
            const response = await httpGetAllStore();
            console.log(response);
            setStore(response.data);
        };
        getAllStore();
    }, []);

    const navigate = useNavigate();
    const handleAdd = async () => {
        navigate("/admin/stores/add");
    };
    return (
        <div className={cx("container")}>
            <div className={cx("row")}>
                <div className={cx("col-md-12")}>
                    <div className={cx("content")}>
                        <div className={cx("table-title")}>
                            <h2>Danh sách cửa hàng</h2>
                            <div className={cx("table-subtitle-right")}>
                                <button className={cx("btn-add")} onClick={() => handleAdd()}>+ Thêm </button>
                            </div>
                        </div>
                        <div className={cx("table-content")}>
                            <table>
                                <thead>
                                    <tr>
                                        <th width="100px" scope="col">ID</th>
                                        <th width="20%" scope="col">Tên</th>
                                        <th width="15%" scope="col">Tỉnh/ TP</th>
                                        <th width="15%" scope="col">Quận/ Huyện</th>
                                        <th width="30%" scope="col">Địa chỉ</th>
                                        <th width="10%" scope="col">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {store.map((store, index) => {
                                        return (
                                            <tr className>
                                                <td>{store.id}</td>
                                                <td>{store.storeName}</td>
                                                <td className={cx("col-justify")}>{store.address}</td>
                                                <td><Link to={`/admin/stores/edit/${store.id}`} ><Icon icon='material-symbols:edit-square-outline-rounded' /> </Link>
                                                    | <Link to={'/admin/stores/add'} ><Icon icon='material-symbols:delete-outline' /></Link></td>
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
export default Store;