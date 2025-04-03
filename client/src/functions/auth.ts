import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { LoginDetailsType, RegisterDetailsType } from "../types/pages";
import toast from "react-hot-toast";
import axios from "axios";
import e from "express";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const LoginFunc = async ({
  loginDetails,
  setIsLoading,
  navigate,
}: {
  loginDetails: LoginDetailsType;
  setIsLoading: Dispatch<boolean>;
  navigate: NavigateFunction;
}) => {
  if (loginDetails.email == "") {
    toast.error("Email is required");
    setIsLoading(false);
  } else if (loginDetails.password == "") {
    toast.error("Password is required");
    setIsLoading(false);
  } else {
    try {
      const user = await axios.post(`${BASE_URL}auth/login`, loginDetails);
      console.log(user.data);
      localStorage.setItem("dashcom_token", user.data.token);
      toast.success("Login successful");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/dashcom/home");
        location.reload();
      }, 3000);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        error?.message;
      toast.error(message);
      setIsLoading(false);
      console.log(error);
    }
  }
};

export const RegisterFunc = async ({
  registerDetails,
  setIsLoading,
  navigate,
}: {
  registerDetails: RegisterDetailsType;
  setIsLoading: Dispatch<boolean>;
  navigate: NavigateFunction;
}) => {
  setIsLoading(true);
  if (registerDetails.first_name == "") {
    toast.error("Firstname is required");
    setIsLoading(false);
  } else if (registerDetails.last_name == "") {
    toast.error("Lastname is required");
    setIsLoading(false);
  } else if (registerDetails.email == "") {
    toast.error("Email is required");
    setIsLoading(false);
  } else if (registerDetails.password == "") {
    toast.error("Password is required");
    setIsLoading(false);
  } else {
    try {
      const newUser = await axios.post(
        `${BASE_URL}auth/register`,
        registerDetails
      );

      localStorage.setItem("dashcom_token", newUser.data.token);
      toast.success("User successfully registered");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/dashcom/home");
      }, 3000);
    } catch (error: any) {
      console.log({ registerError: error });
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.response?.message ||
        error?.message;
      toast.error(message);
      setIsLoading(false);
    }
  }
};

export const GetCurrentUser = async ({
  setIsLoading,
  setMe,
}: {
  setIsLoading: Dispatch<boolean>;
  setMe: Dispatch<any>;
}) => {
  try {
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.message ||
      error?.message;
    toast.error(message);
    setIsLoading(false);
  }
};

export const LogoutFunc = () => {
  localStorage.removeItem("dashcom_token");
  toast.success("Successfully logged out");
  setTimeout(() => {
    window.location.pathname = "/";
  }, 2000);
};
