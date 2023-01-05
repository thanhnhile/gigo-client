import React from 'react';
import className from 'classnames/bind';
import styles from './Status.module.scss';
import { ORDER_STATUS } from '~/utils/enum';

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
const getStatusComponent = (status = 0) => {
  switch (status) {
    case 0:
      return <Status text={ORDER_STATUS.IN_PROGRESS.status} inProgress />;
    case 1:
      return <Status text={ORDER_STATUS.DELIVERING.status} delivering />;
    case 2:
      return <Status text={ORDER_STATUS.SUCCESS.status} success />;
    case 3:
      return <Status text={ORDER_STATUS.CANCELED.status} canceled />;
    default:
      return <Status text={ORDER_STATUS.IN_PROGRESS.status} inProgress />;
  }
};
export default getStatusComponent;
