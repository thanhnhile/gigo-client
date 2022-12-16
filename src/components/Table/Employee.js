import React, { useEffect, useState } from 'react'
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
    return (
        <div className={cx("container")}>
            <div className={cx("row")}>
                <div className={cx("col-md-12")}>
                    <from>
                        <div className={cx("table-title")}>
                            <h2>Employee</h2>
                            <div className={cx("table-subtitle-right")}>
                                <button className={cx("btn-add")}>+ New</button>
                            </div>
                        </div>
                        <div className={cx("table-content")}>
                            <table className={cx("table table-striped")}>
                                <thead>
                                    <tr>
                                        <th width="100px" scope="col">ID</th>
                                        <th width="30%" scope="col">Name</th>
                                        <th width="20%" scope="col">Store</th>
                                        <th width="20%" scope="col">District</th>
                                        <th width="20%" scope="col">Action</th>
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
export default Employee;