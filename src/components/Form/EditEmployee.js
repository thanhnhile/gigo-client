import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Form.module.scss';
import { httpGetAllStore } from '../../apiServices/storeServices';
import { httpGetAllAccount } from '../../apiServices/accountServices';
import { httpGetEmployeeById, httpPutEmployee } from '../../apiServices/employeeServices';

const cx = className.bind(styles);
function Employee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const storeRef = useRef(null);
    const accountRef = useRef(null);

    const [storeId, setStoreId] = useState();
    const [accountId, setAccountId] = useState();

    const [employee, setEmployee] = useState({});
    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };
    const handleChangeStore = (e) => {
        console.log(e.target.value);
        setStoreId(e.target.value);
    };
    useEffect(() => {
        const getEmployeeById = async () => {
            const response = await httpGetEmployeeById(id);
            console.log(response.data);
            setEmployee(response.data);
            setStoreId(response.data.store.id);
            setAccountId(response.data.account.username);
        };
        getEmployeeById();
    }, [id]);

    const [stores, setStore] = useState([]);
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
        e.preventDefault();
        const name = nameRef.current.value;
        const store = storeRef.current.value;
        const account = accountRef.current.value;
        try {
            await httpPutEmployee(employee.id, name, store, account)
                .then
                (
                    () => {
                        navigate('/admin/employees');
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cx("wrapper")}>
            <form >
                <h1>Nhân viên</h1>
                
                <label>Tên</label>
                <input name="name" 
                    ref={nameRef}
                    value={employee.name}
                    onChange={handleChange}/>
                
                <label>Cửa hàng</label>
                <select name="store"
                    ref={storeRef}
                    value={storeId}
                    onChange={handleChangeStore}
                    required
                >
                    <option value='default'>--Chọn--</option>
                    {stores.map((store) => {
                        return (
                            <option value={store.id}>{store.storeName}</option>);
                    })}
                </select>
                
                <label>Tài khoản</label>
                <select name="account"
                    ref={accountRef}
                    value={accountId}
                    onChange={handleChange}
                    required
                >
                    <option value='default'>--Chọn--</option>
                    {account.map((account) => {
                        return (
                            <option value={account.username}>{account.username}</option>);
                    })}
                </select>
                <input type="submit" className={cx("submitButton")} onClick={() => handleSubmit()}/>
            </form>
        </div>
    )
}
export default Employee;