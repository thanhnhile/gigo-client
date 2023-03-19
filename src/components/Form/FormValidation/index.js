import { useEffect, useState } from 'react';

const FormValidation = ({ children }) => {
  const [formValidated, setFormValidated] = useState(false);
  const [validated, setValidated] = useState({});
  useEffect(() => {
    const formValidated =
      Object.values(validated)?.length > 0 &&
      Object.values(validated).every((item) => item === true);
    setFormValidated(formValidated);
  }, [validated]);
  return typeof children === 'function'
    ? children(formValidated, setValidated)
    : children;
};

export default FormValidation;
