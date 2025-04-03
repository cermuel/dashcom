import React, { useLayoutEffect, useState } from "react";
import { ThemeContextProvider } from "../../context/ThemeContext";
import { Theme } from "../../types/context";
import { MdLogout } from "react-icons/md";
import { LogoutFunc } from "../../functions/auth";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import logo from "../../assets/images/logo.svg";
import { Toaster } from "react-hot-toast";
import { getMe } from "../../functions/user";
import Loading from "../dashcom/shared/Loading";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { switchTheme, theme } = React.useContext(ThemeContextProvider);
  const token = localStorage.getItem("dashcom_token");
  const [me, setMe] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (token !== null) {
      getMe({ setMe, setIsLoading });
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <nav className="w-full z-50 fixed h-20 flex items-center md:px-20 px-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] justify-between">
        <Toaster />
        <h1
          className="font-bold text-pry text-xl flex cursor-pointer"
          onClick={() => me && navigate("/dashcom/home")}
        >
          <img src={logo} alt="dashcom" className="w-5 mr-1 mt-1" />
          Dashcom
        </h1>
        <div className="flex items-center gap-6">
          {token !== null && (
            <div className="flex items-center gap-6">
              <h1 className="font-semibold tracking-wider rounded-full w-8 h-8 bg-pry flex justify-center items-center text-white text-sm">
                {me
                  ? me?.first_name.slice(0, 1) + me?.last_name.slice(0, 1)
                  : ""}
              </h1>
              <MdLogout
                className="text-xl cursor-pointer"
                onClick={() => LogoutFunc()}
              />
            </div>
          )}
          <button
            className="text-2xl"
            onClick={() => {
              theme == Theme.dark
                ? switchTheme(Theme.light)
                : switchTheme(Theme.dark);
            }}
          >
            {theme == Theme.dark ? (
              <BsToggle2Off className="text-gray-500" />
            ) : (
              <BsToggle2On className="text-pry" />
            )}
          </button>
        </div>
      </nav>
    );
  }
};

export default Navbar;
