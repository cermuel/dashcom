import { Dispatch } from "react";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";

export const validateAuth = ({ navigate }: { navigate: NavigateFunction }) => {
  const token = localStorage.getItem("dashcom_token");
  if (token !== null) {
    navigate("/dashcom/home");
  } else {
    return true;
  }
};

export const handleError = ({
  error,
  setIsLoading,
}: {
  error: any;
  setIsLoading?: Dispatch<boolean>;
}) => {
  const message =
    error?.response?.data?.error ||
    error?.response?.data?.message ||
    error?.response?.message ||
    error?.message;

  toast.error(message);
  console.log(error);
  setIsLoading && setIsLoading(false);
  return message;
};
