import { Dispatch } from "react";

export type ThemeContextType = {
  theme: Theme | string;
  switchTheme: Dispatch<Theme>;
};
export type UsersContextType = {
  users: any[];
  setUsers: Dispatch<any[]>;
};
export type MeContextType = {
  me: any;
  setMe: Dispatch<any>;
};

export enum Theme {
  dark = "dark",
  light = "light",
}
