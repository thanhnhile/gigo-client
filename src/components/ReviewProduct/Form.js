import React, { useState } from 'react';
import Clickable from '../Clickable';
const MAX_LENGTH = 200;
const MIN_LENGTH = 20;

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
      <span>{`${content.length}/${MAX_LENGTH}`}</span>

      <Clickable text='Gửi đánh giá' primary onClick={(e)=>handleSubmit(e,content)} />
    </form>
  );
};

export default Form;
