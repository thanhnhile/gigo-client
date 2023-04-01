import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import className from 'classnames/bind';
import styles from './Form.module.scss';
import { httpGetAllStore } from '~/apiServices/storeServices';
import { httpGetAllAccount } from '~/apiServices/accountServices';
import { useNavigate, useParams } from 'react-router-dom';
import { httpGetEmployeeById, httpPostEmployee, httpPutEmployee } from '~/apiServices/employeeServices';

const cx = className.bind(styles);

function Employee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        store: {
            id: '',
        },
        account: '',
    });

    useEffect(() => {
        if (id === 'add') {
            return;
        }
        else {
            getEmployeeById();
        }
    }, [id]);

    const getEmployeeById = async () => {
        const response = await httpGetEmployeeById(id);
        console.log(response.data);
        setEmployee(response.data);
    };

    const [stores, setStores] = useState([]);
    useEffect(() => {
        const getAllStore = async () => {
            const response = await httpGetAllStore();
            setStores(response.data);
        };
        getAllStore();
    }, []);

    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        const getAllAccount = async () => {
            const response = await httpGetAllAccount();
            setAccounts(response.data);
        };
        getAllAccount();
    }, []);

    const handleChange = (e) => {
        setEmployee((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const options = accounts.map(d => ({
        label: d.username,
        value: d.username
    }));

    const [selectedValue, setSelectedValue] = useState();
    const handleChangeSelect = e => {
        setSelectedValue(e.value);
        setEmployee({ ...employee, account: e.value })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const newEmployee = { ...employee };
            console.log(newEmployee);
            if (id === 'add') {
                const res = await httpPostEmployee(newEmployee);
                if (res.data) {
                    console.log(res.data);
                } else console.log(res.errMsg);
            }
            else {
                const res = await httpPutEmployee(employee.id, newEmployee);
                if (res.data) {
                    console.log(res.data);
                } else console.log(res.errMsg);
            }

        } catch (error) {
            console.log(error);
        }
        navigate('/admin/employees');
    };

    return (
        <div className={cx("wrapper")}>
            <form onSubmit={handleSubmit}>
                <h1>Nhân viên</h1>

                <label>Tên</label>
                <input name="name"
                    value={employee.name}
                    onChange={handleChange}
                    required />

                <label>Cửa hàng</label>
                <select 
                    required
                    name="store"
                    value={employee.store.id}
                    onChange={(e) =>
                        setEmployee({ ...employee, store: { id: e.target.value } })
                    }>
                    <option>--Chọn--</option>
                    {stores.map((store) => {
                        return (
                            <option value={store.id}>{store.storeName}</option>);
                    })}
                </select>

                <label>Tài khoản</label>
                
                <Select value={options.find(obj => obj.value === employee.account || obj.value === selectedValue)}
                    onChange={handleChangeSelect} options={options} />

                <input type="submit" className={cx("submitButton")} />
            </form>
        </div>

    )
}
export default Employee;