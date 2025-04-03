import React from "react";
import { ThemeContextProvider } from "../../context/ThemeContext";
import { Theme } from "../../types/context";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = React.useContext(ThemeContextProvider);
  const isAuthPath =
    window.location.pathname == "/" || window.location.pathname == "/register";
  return (
    <main
      className={`w-screen h-screen flex ${
        theme == Theme.dark ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <Navbar />
      <div className={`flex flex-1 ${!isAuthPath && "pt-24 md:px-20 px-4"} `}>
        {children}
      </div>
    </main>
  );
};

export default Layout;
