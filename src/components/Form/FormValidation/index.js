import { useEffect, useState } from 'react';

const FormValidation = ({ children }) => {
  const [submitting, setSubmitting] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [validated, setValidated] = useState({});
  useEffect(() => {
    const formValidated =
      Object.values(validated)?.length > 0 &&
      Object.values(validated).every((item) => item === true);
    setFormValidated(formValidated);
  }, [validated]);
  return submitting ? (
    <div className='loader'></div>
  ) : typeof children === 'function' ? (
    children({ formValidated, setValidated,submitting, setSubmitting })
  ) : (
    children
  );
};

export default FormValidation;
