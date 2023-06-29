import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import { httpDeleteEmployee, httpGetAllEmployee } from '~/apiServices/employeeServices';
import className from 'classnames/bind';
import styles from './Table.module.scss';
import CustomDataTable from '~/components/CustomDataTable';
import Clickable from '~/components/Clickable';


const cx = className.bind(styles);
function Employee() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        getAllEmployee();
    }, []);

    const getAllEmployee = async () => {
        const response = await httpGetAllEmployee();
        console.log(response);
        setEmployee(response.data);
    };

    const handleAdd = async () => {
        navigate("/admin/employees/add");
    };

    const deleteData = async (id) => {
        if (window.confirm("Bạn có muốn xóa không?")) {
            await httpDeleteEmployee(id)
                .then(console.log("Deleted"))
                .catch(err => console.log(err));
            getAllEmployee();
        }
    };

    const columns = [
        {
            name: 'ID',
            width: '5%',
            selector: (row) => row.id,
        },
        {
            name: 'Tên nhân viên',
            width: '20%',
            selector: (row) => row.name,
        },
        {
            name: 'Cửa hàng',
            width: '20%',
            selector: (row) => row.store.storeName,
        },
        {
            name: 'Địa chỉ',
            width: '40%',
            selector: (row) => row.store.address,
        },
        {
            width: '5%',
            selector: (row) =>
                <Link to={`/admin/employees/${row.id}`} ><Icon icon='material-symbols:edit-square-outline-rounded' fontSize='18px'/> </Link>,
        },
        {
            width: '10%',
            selector: (row) => <Icon icon='material-symbols:delete-outline' fontSize='18px' onClick={() => deleteData(row.id)} />,
        },
    ];
    return (
        <div className={cx("min-container")}>
            <div className={cx("row")}>
                <div className={cx("col-md-12")}>
                    <div className={cx("content")}>
                        <div className={cx("table-title")}>
                            <h2>Danh sách nhân viên</h2>
                            <div className={cx("table-subtitle-right")}>
                                <Clickable text='Thêm' primary onClick={handleAdd} />   
                            </div>
                        </div>
                        <div className={cx("table-content")}>
                            <CustomDataTable data={employee} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Employee;