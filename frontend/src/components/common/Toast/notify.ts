import { toast, ToastOptions } from "react-toastify";
import "./notify.css";

const option: ToastOptions = {
  position: "top-right",
  pauseOnHover: true,
  autoClose: 1500,
  closeOnClick: true,
};

export const success = (msg: string) => toast.success(msg, option);

export const error = (msg: string) => toast.error(msg, option);

export const warning = (msg: string) => toast.warning(msg, option);

export const info = (msg: string) => toast.info(msg, option);
