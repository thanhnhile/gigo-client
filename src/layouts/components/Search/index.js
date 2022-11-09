import React, { useRef, useState } from 'react'
import className from 'classnames/bind';
import { Icon } from '@iconify/react';
import styles from './Search.module.scss'

const cx = className.bind(styles);


const Search = () => {
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
        <div className={cx('wrapper')}>
            <div className={cx('input-inner')}>
                <input ref={inputRef}
                    type='text'
                    placeholder='Tìm món ngon...'
                    value={searchValue}
                    onChange={handleChange} />
                {searchValue && <Icon className={cx('clear')} icon="fa-regular:times-circle" color="#161823" width="18" onClick={handleClear} />}
            </div>
            <button>
                <Icon icon="bx:search-alt-2" color="#161823" width="28" />
            </button>
        </div>
    )
}

export default Search