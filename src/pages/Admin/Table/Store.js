import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import { httpDeleteStore, httpGetAllStore } from '~/apiServices/storeServices';
import className from 'classnames/bind';
import styles from './Table.module.scss';
import CustomDataTable from '~/components/CustomDataTable';
import Clickable from '~/components/Clickable';


const cx = className.bind(styles);
function Store() {
    const navigate = useNavigate();
    const [store, setStore] = useState([]);

    useEffect(() => {
        getAllStore();
    }, []);

    const getAllStore = async () => {
        const response = await httpGetAllStore();
        console.log(response);
        setStore(response.data);
    };

    const handleAdd = async () => {
        navigate("/admin/stores/add");
    };
    const deleteData = async (id) => {
        if (window.confirm("Bạn có muốn xóa không?")) {
            await httpDeleteStore(id)
                .then(console.log("Deleted"))
                .catch(err => console.log(err));
            getAllStore();
        }

    };

    const columns = [
        {
            name: 'ID',
            width: '5%',
            selector: (row) => row.id,
        },
        {
            name: 'Tên cửa hàng',
            width: '30%',
            selector: (row) => row.storeName,
        },
        {
            name: 'Địa chỉ',
            width: '50%',
            selector: (row) => row.address,
        },
        {
            width: '5%',
            selector: (row) =>
                <Link to={`/admin/stores/${row.id}`} ><Icon icon='material-symbols:edit-square-outline-rounded' fontSize='18px'/> </Link>
            ,
        },
        {
            width: '10%',
            selector: (row) => <Icon icon='material-symbols:delete-outline' fontSize='18px' onClick={() => deleteData(row.id)} />
            ,
        },
    ];
    return (
        <div className={cx("min-container")}>
            <div className={cx("row")}>
                <div className={cx("col-md-12")}>
                    <div className={cx("content")}>
                        <div className={cx("table-title")}>
                            <h2>Danh sách cửa hàng</h2>
                            <div className={cx("table-subtitle-right")}>
                                <Clickable text='Thêm' primary onClick={handleAdd} />
                            </div>
                        </div>
                        <div className={cx("table-content")}>
                            <CustomDataTable data={store} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Store;