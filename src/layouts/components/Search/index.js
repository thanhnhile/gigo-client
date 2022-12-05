import React, { useState, useRef } from 'react';
import className from 'classnames/bind';
import { Icon } from '@iconify/react';
import styles from './Search.module.scss'

const cx = className.bind(styles);

const Search = ({ isOpen }) => {
    const inputRef = useRef();
    const [searchValue, setSearchValue] = useState('');
    const handleChange = () => {
        const searchValue = inputRef.current.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    }
    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    }
    return (
        <div className={cx('wrapper', { 'open': isOpen })}>
            <div className={cx('container', 'search-wrapper')}>
                <div className={cx('inner-input')}>
                    <input ref={inputRef}
                        type='text'
                        placeholder='Tìm món ngon...'
                        value={searchValue}
                        onChange={handleChange} />
                    {searchValue && <Icon className={cx('icon')} icon="fa-regular:times-circle" color="#161823" onClick={handleClear} />}
                </div>
                <button>
                    <Icon className={cx('icon')} icon="bx:search-alt-2" color="#161823" />
                </button>
            </div>
            {/* <p>Không tìm thấy kết quả</p> */}
            <p>Tìm thấy <span>20</span> kết quả trùng khớp </p>
        </div>
    )
}

export default Search;