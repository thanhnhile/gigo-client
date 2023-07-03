import React, { createContext, useState, useEffect } from 'react';
import { httpGetProductLiked } from '~/apiServices/accountServices';
import { useToastError } from '~/hooks';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const { showToastError } = useToastError();
  const [auth, setAuth] = useState({});
  const [productsLiked, setProductsLiked] = useState([]);
  const [needToUpdateProductLiked, setNeedToUpdateProductLiked] =
    useState(false);

  const handleApi = async () => {
    try {
      const productRes = await httpGetProductLiked();
      if (productRes?.data) setProductsLiked(productRes.data);
    } catch (error) {
      showToastError(error);
    }
  };
  useEffect(() => {
    if (auth?.username) {
      auth?.username && handleApi();
      setNeedToUpdateProductLiked(false);
    } else {
      setProductsLiked([]);
      setNeedToUpdateProductLiked(false);
    }
  }, [auth, needToUpdateProductLiked]);
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        productsLiked: productsLiked,
        setNeedToUpdateProductLiked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
