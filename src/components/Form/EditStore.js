import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import className from 'classnames/bind';
import SelectAddress from '../SelectAddress';
import styles from './Form.module.scss';
import { httpGetStoreById, httpPutStore } from '../../apiServices/storeServices';

const cx = className.bind(styles);
function Store() {
    const { id } = useParams();
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const addressRef = useRef(null);
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
    const handleSubmit = async (e) => {
        const name = nameRef.current.value;
        const address = addressRef.current.value;
        const province = address.provinceId;
        const district = address.districtId;
        if(name === '' || address === '')
        {
            e.preventDefault();
        }
        try {
            await httpPutStore(store.id, name, province, district, address)
                .then
                (
                    () => {
                        navigate('/admin/stores');
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
                <input type="submit" className={cx("submitButton")} onClick={() => handleSubmit()}/>
            </form>
        </div>
    )
}
export default Store;