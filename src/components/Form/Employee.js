import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Form.module.scss';
import { httpGetAllStore } from '../../apiServices/storeServices';
import { httpGetAllAccount } from '../../apiServices/accountServices';


const cx = className.bind(styles);
function Employee() {
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

    return (
        <form >
            <h1>Nhân viên</h1>
            <label>Tên</label>
            <input name="name" />
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
            <input type="submit" className={cx("submitButton")} />
        </form>
    )
}
export default Employee;