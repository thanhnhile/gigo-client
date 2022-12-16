import React, { useEffect, useState } from 'react'
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
    return (
        <div className={cx("container")}>
            <div className={cx("row")}>
                <div className={cx("col-md-12")}>
                    <from>
                        <div className={cx("table-title")}>
                            <h2>Store</h2>
                            <div className={cx("table-subtitle-right")}>
                                <button className={cx("btn-add")}>+ New</button>
                            </div>
                        </div>
                        <div className={cx("table-content")}>
                            <table className={cx("table table-striped")}>
                                <thead>
                                    <tr>
                                        <th width="10%" scope="col">ID</th>
                                        <th width="20%" scope="col">Name</th>
                                        <th width="20%" scope="col">District</th>
                                        <th width="40%" scope="col">Address</th>
                                        <th width="10%" scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {store.map((store, index) => {
                                        return (
                                            <tr className>
                                                <td>{store.id}</td>
                                                <td>{store.storeName}</td>
                                                <td>{store.district.name}</td>
                                                <td className={cx("col-left")}>{store.address}</td>
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
export default Store;