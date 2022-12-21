import React, { useEffect, useMemo, useState } from 'react';
import className from 'classnames/bind';
import SelectAddress from '../SelectAddress';
import styles from './Form.module.scss';
import { httpGetStoreByAddress, httpPostStore } from '../../apiServices/storeServices';
import { useNavigate } from 'react-router-dom';

const cx = className.bind(styles);
const initValue = { name: '', address: '' };

function Store() {
    const navigate = useNavigate();
    const [store, setStore] = useState({});
    const handleChange = (e) => {
        setStore({ ...store, [e.target.name]: e.target.value });
    };

    const [address, setAddress] = useState({
        provinceId: '',
        districtId: '',
    });
    useEffect(() => {
        console.log(address);
        const getStoreByAddress = async () => {
            try {
                const res = await httpGetStoreByAddress(
                    address.provinceId,
                    address.districtId
                );
                // if (res.data) {
                //     setStore(res.data);
                // }
            } catch (error) {
                console.log(error);
            }
        };
        getStoreByAddress();
    }, [address.provinceId, address.districtId, address]);

    const handleSubmit = async (e) => {
        if(store.name === '' || store.address === '')
        {
            e.preventDefault();
        }
        const newStore = {
            name: store.name,
            address: store.address
        };
        const response = await httpPostStore(newStore);
        
        setStore(initValue);
        console.log(response);
        response.errMsg && navigate('/admin/stores');
    };

    return (
        <div className={cx("wrapper")}>
            <form >
                <h1>Store</h1>

                <label>Name</label>
                <input name="name"
                    type="text"
                    onChange={handleChange}
                    required />

                <label>District</label>
                <SelectAddress address={address} setAddress={setAddress} />

                <label>Address</label>
                <input name="address"
                    type="text"
                    onChange={handleChange}
                    required />

                <input type="submit" className={cx("submitButton")} onClick={() => handleSubmit()}/>
            </form>
        </div>

    )
}
export default Store;