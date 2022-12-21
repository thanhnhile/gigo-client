import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import className from 'classnames/bind';
import SelectAddress from '../SelectAddress';
import styles from './Form.module.scss';
import { httpGetStoreByAddress, httpGetStoreById } from '../../apiServices/storeServices';

const cx = className.bind(styles);
function Store() {
    const { id } = useParams();
    const nameRef = useRef(null);
    const addressRef = useRef(null);
    const statusRef = useRef(null);
    const [store, setStore] = useState({});
    const handleChange = (e) => {
        setStore({ ...store, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        const GetStoreById = async () => {
            const response = await httpGetStoreById(id);
            console.log(response.data);
            setStore(response.data);
        };
        GetStoreById();
    }, []);
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
    return (
        <div className={cx("wrapper")}>
            <form >
                <h1>Store</h1>
                <label>Name</label>
                <input name="name"
                    ref={nameRef}
                    value={store.storeName}
                    onChange={handleChange} />
                <label>District</label>
                <SelectAddress address={address} setAddress={setAddress} />
                <label>Address</label>
                <input name="address"
                    ref={addressRef}
                    value={store.address}
                    onChange={handleChange} />
                <input type="submit" className={cx("submitButton")} />
            </form>
        </div>
    )
}
export default Store;