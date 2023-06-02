import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Icon } from '@iconify/react';
import styles from './Voucher.module.scss';
import Modal from '~/components/Modal';
import ListVoucher from './ListVoucher';

const cx = classNames.bind(styles);

const Voucher = ({ seleted, setSelected }) => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    return function () {
      setSelected({});
    };
  }, []);
  return (
    <section className={cx('wrapper')}>
      {/* Modal */}
      {showModal && (
        <Modal
          title='Vouchers'
          size='lg'
          handleCancel={() => setShowModal(false)}
        >
          <ListVoucher seleted={seleted} setSelected={setSelected} />
        </Modal>
      )}
      {/* Modal */}
      <h4>
        <Icon icon='mdi:voucher-outline' className={cx('icon')} />
        Vouher
      </h4>
      <div className={cx('select-voucher')}>
        {seleted?.name ? (
          <div className={cx('selected')} onClick={() => setShowModal(true)}>
            {seleted.name}
          </div>
        ) : (
          <button onClick={() => setShowModal(true)}>Chọn hoặc nhập mã</button>
        )}
      </div>
    </section>
  );
};

export default Voucher;
