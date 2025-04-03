import { Dispatch } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { handleError } from "../lib";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const token = localStorage.getItem("dashcom_token");
axios.defaults.headers.common["Authorization"] = token;

export const getMe = async ({
  setMe,
  setIsLoading,
}: {
  setMe: Dispatch<any>;
  setIsLoading: Dispatch<boolean>;
}) => {
  setIsLoading(true);
  try {
    const me = await axios.get(`${BASE_URL}users/me`);
    setMe(me.data.user);
    setIsLoading(false);
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.message ||
      error?.message;
    toast.error(message);
    console.log(error);
    setIsLoading(false);
  }
};

export const getUser = async ({
  setUser,
  setIsLoading,
  id,
}: {
  setUser: Dispatch<any>;
  setIsLoading: Dispatch<boolean>;
  id: string;
}) => {
  setIsLoading(true);
  try {
    const user = await axios.get(`${BASE_URL}users/me`);
    setUser(user.data.user);
    setIsLoading(false);
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.message ||
      error?.message;
    toast.error(message);
    console.log(error);
    setIsLoading(false);
  }
};

export const getAllUsers = async ({
  setIsLoading,
  setUsers,
}: {
  setUsers: Dispatch<any[]>;
  setIsLoading: Dispatch<boolean>;
}) => {
  setIsLoading(true);
  try {
    const users = await axios.get(`${BASE_URL}users`);
    setUsers(users.data.users);
    setIsLoading(false);
  } catch (error: any) {
    handleError({ error });
  }
};
