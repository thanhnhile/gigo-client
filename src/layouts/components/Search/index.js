import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import { Icon } from '@iconify/react';
import styles from './Search.module.scss';
import { httpSearchProduct } from '~/apiServices/productServices';

const cx = className.bind(styles);

const Search = ({ isOpen }) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef();
  const [searchValue, setSearchValue] = useState('');
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const handleChange = () => {
    const searchValue = inputRef.current.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };
  const handleClear = () => {
    setSearchValue('');
    inputRef.current.focus();
  };
  const handleClick = async () => {
    const keyword = inputRef.current.value.trim();
    if (keyword) {
      const res = await httpSearchProduct(keyword);
      setCount(res.data.totalElements);
      res.data.totalElements > 0 &&  setTimeout(() => {
        navigate('/search', { state: { result: res.data.content } });
      }, 500);
    }
  };
  return (
    <div className={cx('wrapper', { open: isOpen })}>
      <div className={cx('container', 'search-wrapper')}>
        <div className={cx('inner-input')}>
          <input
            ref={inputRef}
            type='text'
            placeholder='Tìm món ngon...'
            value={searchValue}
            required
            onChange={handleChange}
          />
          {searchValue && (
            <Icon
              className={cx('icon')}
              icon='fa-regular:times-circle'
              color='#161823'
              onClick={handleClear}
            />
          )}
        </div>
        <button onClick={handleClick}>
          <Icon className={cx('icon')} icon='bx:search-alt-2' color='#161823' />
        </button>
      </div>
      <p>
        Tìm thấy <span>{count}</span> kết quả trùng khớp
      </p>
    </div>
  );
};

export default Search;
