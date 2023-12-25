import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomAlert = (message:any, type:"error" | "success" | "info" | "warning") => {
    switch (type) {
      case 'success':
        toast.success(message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        break;
      case 'info':
        toast.info(message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        break;
      case 'warning':
        toast.warning(message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        break;
      case 'error':
        toast.error(message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        break;
      default:
        break;
    }
};

export default CustomAlert