import React, { useEffect, useMemo, useState } from 'react';
import className from 'classnames/bind';
import SelectAddress from '../SelectAddress';
import styles from './Form.module.scss';
import { httpGetStoreByAddress } from '../../apiServices/storeServices';

const cx = className.bind(styles);
function Store() {
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
        <form >
            <h1>Store</h1>
            <label>Name</label>
            <input name="name" />
            <label>District</label>
            <SelectAddress address={address} setAddress={setAddress} />
            <label>Address</label>
            <input name="address" />
            <input type="submit" className={cx("submitButton")} />
        </form>
    )
}
export default Store;