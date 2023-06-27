import React, { createContext, useState, useEffect } from 'react';
import { httpGetProductIdsLiked } from '~/apiServices/accountServices';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [productsLiked, setProductsLiked] = useState([]);
  const [needToUpdateProductLiked, setNeedToUpdateProductLiked] =
    useState(false);

  const getProductLiked = async () => {
    const response = await httpGetProductIdsLiked();
    if (response?.data) {
      setProductsLiked(response.data);
    }
  };
  useEffect(() => {
    if (auth?.username) {
      auth?.username && getProductLiked();
      setNeedToUpdateProductLiked(false);
    } else {
      setProductsLiked([]);
      setNeedToUpdateProductLiked(false);
    }
  }, [auth, needToUpdateProductLiked]);
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, productsLiked, setNeedToUpdateProductLiked }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
