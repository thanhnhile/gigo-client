import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import className from 'classnames/bind';
import styles from './Form.module.scss';
import { httpGetAllStore } from '~/apiServices/storeServices';
import { httpGetAvailableAccount } from '~/apiServices/accountServices';
import { useNavigate, useParams } from 'react-router-dom';
import { httpGetEmployeeById, httpPostEmployee, httpPutEmployee } from '~/apiServices/employeeServices';
import FormValidation from '~/components/Form/FormValidation';
import FormInput from '~/components/Form/FormInput';
import ValidationRegex from '~/utils/validationRegex';
import Clickable from '~/components/Clickable';

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
    const [current, setCurrent] = useState();

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
        setEmployee(response.data);
        setCurrent(response.data.account);
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
            const response = await httpGetAvailableAccount();
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
    if (id !== 'add') {
        options.push({
            label: current,
            value: current
        })
    }

    const [selectedValue, setSelectedValue] = useState();
    const handleChangeSelect = e => {
        setSelectedValue(e.value);
        setEmployee({ ...employee, account: e.value })
    }

    const handleSubmit = async (e, formValidated) => {
        try {
            e.preventDefault();
            if (!formValidated) {
                return;
            }
            const newEmployee = { ...employee };
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
    const formInputs = [
        {
            id: 1,
            name: 'name',
            title: 'Tên nhân viên',
            type: 'text',
            placeholder: 'VD: Nguyễn Văn A',
            required: true,
            pattern: ValidationRegex.name.pattern,
            message: ValidationRegex.name.message,
        }
    ];
    return (
        <div className={cx("wrapper")}>
            <FormValidation>
                {({ setValidated, formValidated }) => (
                    <form
                        onSubmit={(e) => handleSubmit(e, formValidated)}
                        className={cx('form')}
                    >
                        <h1>Nhân viên</h1>

                        {formInputs.map((formInput) => (
                            <FormInput
                                key={formInput.id}
                                value={employee[formInput.name]}
                                onChange={handleChange}
                                setValidated={setValidated}
                                {...formInput}
                            />
                        ))}
                        <label>Cửa hàng</label>
                        <select
                            required
                            name="store"
                            value={employee.store.id}
                            onChange={(e) =>
                                setEmployee({ ...employee, store: { id: e.target.value } })
                            }>
                            <option value="">--Chọn--</option>
                            {stores.map((store) => {
                                return (
                                    <option value={store.id}>{store.storeName}</option>);
                            })}
                        </select>

                        <label>Tài khoản</label>
            
                        <Select value={options.find(obj => obj.value === employee.account || obj.value === selectedValue)}
                            onChange={handleChangeSelect} options={options} isSearchable required />
                        <span className={cx('height')} />
                        <Clickable text='Gửi' primary />
                    </form>
                )}
            </FormValidation>
            {/* <form onSubmit={handleSubmit}>
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

                <Clickable text='Lưu' primary />
            </form> */}
        </div>

    )
}
export default Employee;