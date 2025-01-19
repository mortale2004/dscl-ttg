import { Bounce, toast as toastify, ToastOptions } from "react-toastify";

// Define the possible toast variants
type ToastVariant = "success" | "error" | "info" | "warn" | "default" | null;

const toastOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const toast = (message: string, variant: ToastVariant) => {
  if (message && variant) {
    // @ts-ignore
    variant && toastify?.[variant](message, toastOptions);
  }
};

export const getToastVariant = ({
  isSuccess,
  isError,
  isWarning,
}: {
  isSuccess?: boolean;
  isError?: boolean;
  isWarning?: boolean;
}): ToastVariant => {
  if (isSuccess) {
    return "success" as ToastVariant;
  } else if (isError) {
    return "error" as ToastVariant;
  } else if (isWarning) {
    return "warn" as ToastVariant;
  }
  return null as ToastVariant;
};
