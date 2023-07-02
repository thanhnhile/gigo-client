import React from 'react';

import { useAuth } from '~/hooks';
import ListProduct from '../../components/Product/ListProduct';

const ListProductLiked = () => {
  const { productsLiked } = useAuth();
  return (
    <div className='container'>
      <div className='header'>
        <h2>SẢN PHẨM YÊU THÍCH &nbsp;</h2>
      </div>
      {productsLiked?.length > 0 ? (
        <ListProduct product={productsLiked} />
      ) : (
        'Chưa có sản phẩm yêu thích'
      )}
    </div>
  );
};
export default ListProductLiked;
