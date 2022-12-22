import React from 'react';
import className from 'classnames/bind';
import styles from './Status.module.scss';

const cx = className.bind(styles);

const Status = (props) => {
  const { text, delivering, success, canceled, inProgress } = props;
  return (
    <div
      className={cx(
        'wrapper',
        { success: success },
        { inProgress: inProgress },
        { delivering: delivering },
        { canceled: canceled }
      )}
    >
      {text}
    </div>
  );
};

export default Status;
