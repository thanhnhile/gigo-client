import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './ReviewProduct.module.scss';
import Clickable from '../Clickable';
const MAX_LENGTH = 200;
const MIN_LENGTH = 20;
const cx = className.bind(styles);

const Form = ({ handleSubmit }) => {
  const [content, setContent] = useState('');
  return (
    <form>
      <textarea
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder={`Cảm nhận của bạn về sản phẩm (tối thiểu ${MIN_LENGTH} ký tự)`}
        required
        maxLength={MAX_LENGTH}
        minLength={MIN_LENGTH}
      />
      <div className={cx('form-bottom-wrapper')}>
        <span>{`${content.length}/${MAX_LENGTH}`}</span>
        <Clickable
          text='Gửi đánh giá'
          primary
          onClick={(e) => handleSubmit(e, content)}
          disable={content.length < MIN_LENGTH || content.length > MAX_LENGTH}
        />
      </div>
    </form>
  );
};

export default Form;
