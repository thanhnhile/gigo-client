import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import SelectAddress from '../SelectAddress';
import styles from './Form.module.scss';
import { httpGetStoreById, httpPostStore, httpPutStore } from '../../apiServices/storeServices';
import { useNavigate, useParams } from 'react-router-dom';

const cx = className.bind(styles);

function Store() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [store, setStore] = useState({
        storeName: '',
        provinceId: '',
        districtId: '',
        address: '',
    });

    const [address, setAddress] = useState({
        provinceId: '',
        districtId: '',
    });

    useEffect(() => {
        if (id === 'add') {
            return
        }
        else {
            GetStoreById();
        }
    }, [id]);

    const GetStoreById = async () => {
        const response = await httpGetStoreById(id);
        console.log(response.data);
        setStore(response.data);
        setAddress((prev) => {
            return { ...prev, provinceId: response.data.provinceId, districtId: response.data.districtId };
        });
    };

    const handleChange = (e) => {
        setStore({ ...store, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const newStore = { ...store, provinceId: address.provinceId, districtId: address.districtId };
            console.log(newStore);
            if (id === 'add') {
                const res = await httpPostStore(newStore);
                if (res.data) {
                    console.log(res.data);
                } else console.log(res.errMsg);
            } else {
                const res = await httpPutStore(store.id, newStore);
                if (res.data) {
                    console.log(res.data);
                } else console.log(res.errMsg);
            }
        } catch (error) {
            console.log(error);
        }
        navigate('/admin/stores');
    };

    return (
        <div className={cx("wrapper")}>
            <form onSubmit={handleSubmit}>
                <h1>Store</h1>

                <label>Name</label>
                <input name="storeName"
                    type="text"
                    value={store.storeName}
                    onChange={handleChange}
                    required />

                <label>District</label>
                <SelectAddress address={address} setAddress={setAddress} />

                <label>Address</label>
                <input name="address"
                    type="text"
                    value={store.address}
                    onChange={handleChange}
                    required />

                <input type="submit" className={cx("submitButton")} />
            </form>
        </div>

    )
}
export default Store;