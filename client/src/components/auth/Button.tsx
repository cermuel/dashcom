import React from "react";
import { AuthButtonType } from "../../types/components";
import { ThemeContextProvider } from "../../context/ThemeContext";
import { Theme } from "../../types/context";
import { AiOutlineLoading } from "react-icons/ai";

const Button = ({ props }: { props: AuthButtonType }) => {
  const { theme } = React.useContext(ThemeContextProvider);
  return (
    <button
      //   disabled={props.isLoading}
      onClick={props.onClick}
      className={`w-full py-4 mt-10 text-center flex justify-center ${
        props.isLoading == true && "cursor-not-allowed"
      } rounded-lg font-bold tracking-wider ${
        theme == Theme.dark ? "bg-white text-pry" : "text-white bg-pry"
      }
      `}
      disabled={props.isLoading}
    >
      {props.isLoading ? (
        <AiOutlineLoading className="text-xl text-center animate-spin" />
      ) : (
        props.title
      )}
    </button>
  );
};

export default Button;
