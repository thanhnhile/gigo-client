import { toast } from 'react-toastify';

const useToastError = () => {
  const showToastError = (error) => {
    if (error?.errMsg) {
      toast.dismiss();
      toast.error(error.errMsg, {
        position: 'top-center',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };
  return { showToastError };
};

export default useToastError;
