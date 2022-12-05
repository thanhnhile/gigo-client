import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/hooks';
import Clickable from '~/components/Clickable';

const Personal = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleClick = () => {
    setAuth({});
    navigate('/');
  };
  return (
    <div>
      Personal page
      <Clickable primary text='Đăng xuất' onClick={handleClick} />
    </div>
  );
};

export default Personal;
