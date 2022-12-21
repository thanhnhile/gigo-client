import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Form.module.scss';
import { httpGetAllStore } from '../../apiServices/storeServices';
import { httpGetAllAccount } from '../../apiServices/accountServices';
import { useNavigate } from 'react-router-dom';
import { httpPostEmployee } from '../../apiServices/employeeServices';

const cx = className.bind(styles);
const initValue = { name: '' };

function Employee() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({});
    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const [store, setStore] = useState([]);
    useEffect(() => {
        const getAllStore = async () => {
            const response = await httpGetAllStore();
            setStore(response.data);
        };
        getAllStore();
    }, []);

    const [account, setAccount] = useState([]);
    useEffect(() => {
        const getAllAccount = async () => {
            const response = await httpGetAllAccount();
            setAccount(response.data);
        };
        getAllAccount();
    }, []);

    const handleSubmit = async (e) => {
        if(employee.name === '' )
        {
            e.preventDefault();
        }
        const newEmployee = {
            name: employee.name
        };
        const response = await httpPostEmployee(newEmployee);
        
        setEmployee(initValue);
        console.log(response);
        response.errMsg && navigate('/admin/employees');
    };

    return (
        <div className={cx("wrapper")}>
            <form >
                <h1>Nhân viên</h1>

                <label>Tên</label>
                <input name="name"
                    type="text"
                    onChange={handleChange}
                    required />

                <label>Cửa hàng</label>
                <select name="store">
                    <option>--Chọn--</option>
                    {store.map((store) => {
                        return (
                            <option value={store.id}>{store.storeName}</option>);
                    })}
                </select>

                <label>Tài khoản</label>
                <select name="account">
                    <option>--Chọn--</option>
                    {account.map((account) => {
                        return (
                            <option value={account.id}>{account.username}</option>);
                    })}
                </select>

                <input type="submit" className={cx("submitButton")} onClick={() => handleSubmit()}/>
            </form>
        </div>

    )
}
export default Employee;