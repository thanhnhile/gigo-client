import React from 'react';
import className from 'classnames/bind';
import styles from './Pagination.module.scss';
import { Icon } from '@iconify/react';

const cx = className.bind(styles);

const Pagination = (props) => {
  const { onPageChange, totalPages, currentPage } = props;
  const getRange = () => {
    let range = [];
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  };
  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  return totalPages > 0 ? (
    <ul className={cx('pagination-container', { [className]: className })}>
      {/* Left navigation arrow */}
      <li
        className={cx('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <Icon icon='ic:baseline-keyboard-arrow-left' />
      </li>
      {getRange().map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        // Render our Page Pills
        return (
          <li
            key={index}
            className={cx('pagination-item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={cx('pagination-item', {
          disabled: currentPage === totalPages,
        })}
        onClick={onNext}
      >
        <Icon icon='ic:baseline-keyboard-arrow-right' />
      </li>
    </ul>
  ) : (
    <p>Không có sản phẩm nào</p>
  );
};

export default Pagination;
