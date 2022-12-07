import React from 'react';
import { useLocation } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './SearchResult.module.scss';
import ListProduct from '../../components/Product/ListProduct';

const cx = className.bind(styles);

const SearchResult = () => {
  const location = useLocation();
  const result = location.state.result;
  return (
    <div className={cx('container')}>
      <ListProduct product={result} title='Kết quả tìm kiếm' />
    </div>
  );
};

export default SearchResult;
