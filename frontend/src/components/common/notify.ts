import { toast, ToastOptions } from "react-toastify";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

const option: ToastOptions = {
  position: "top-left",
  pauseOnHover: false,
  autoClose: 2000,
  closeOnClick: true,
};

export const success = (msg: string) => toast.success(msg, option);

export const error = (msg: string) => toast.error(msg, option);

export const warning = (msg: string) => toast.warning(msg, option);

export const info = (msg: string) => toast.info(msg, option);

export const Container = styled(ToastContainer)`
  .Toastify__toast {
    font-size: 16px;
    border-radius: 50px;
    padding: 16px 28px;
    color: #fff;
    background: rgba(107, 115, 135, 0.8);
  }

  .Toastify__toast-icon {
    width: 22px;
    height: 22px;
  }

  .Toastify__toast--info {
    background: rgba(107, 115, 135, 0.8);
  }

  .Toastify__toast--success {
    background: rgba(48, 173, 120, 0.8);
  }

  .Toastify__toast--error {
    background: rgba(224, 72, 82, 0.8);
  }
`;
