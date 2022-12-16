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
            <h1>Employee</h1>
            <label>Name</label>
            <input name="name" />
            <label>Store</label>
            <select name="store">
                <option>Please choose one option</option>
                {store.map((store) => {
                    return (
                        <option value={store.id}>{store.storeName}</option>);
                })}
            </select>
            <label>Account</label>
            <select name="account">
                <option>Please choose one option</option>
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