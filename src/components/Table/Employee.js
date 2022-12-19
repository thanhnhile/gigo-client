import React, { useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";
import { Icon } from '@iconify/react';
import { httpGetAllEmployee } from '../../apiServices/employeeServices';
import className from 'classnames/bind';
import styles from './Table.module.scss';

const cx = className.bind(styles);
function Employee() {
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        const getAllEmployee = async () => {
            const response = await httpGetAllEmployee();
            console.log(response);
            setEmployee(response.data);
        };
        getAllEmployee();
    }, []);

    const navigate = useNavigate();
    const handleAdd = async () => {
        navigate("/admin/employees/add");
    };
    return (
        <div className={cx("container")}>
            <div className={cx("row")}>
                <div className={cx("col-md-12")}>
                    <div className={cx("content")}>
                        <div className={cx("table-title")}>
                            <h2>Danh sách nhân viên</h2>
                            <div className={cx("table-subtitle-right")}>
                                <button className={cx("btn-add")} onClick={() => handleAdd()}>+ Thêm </button>
                            </div>
                        </div>
                        <div className={cx("table-content")}>
                            <table className={cx("table table-striped")}>
                                <thead>
                                    <tr>
                                        <th width="100px" scope="col">ID</th>
                                        <th width="30%" scope="col">Tên</th>
                                        <th width="20%" scope="col">Cửa hàng</th>
                                        <th width="20%" scope="col">Quận/ Huyện</th>
                                        <th width="20%" scope="col">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employee.map((employee, index) => {
                                        return (
                                            <tr className>
                                                <td>{employee.id}</td>
                                                <td>{employee.name}</td>
                                                <td>{employee.store.storeName}</td>
                                                <td>{employee.store.district.name}</td>
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
export default Employee;