import React, { useRef, useState } from "react";
import { AuthInputType } from "../../types/components";
import { ThemeContextProvider } from "../../context/ThemeContext";
import { Theme } from "../../types/context";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({ props }: { props: AuthInputType }) => {
  const { theme } = React.useContext(ThemeContextProvider);
  const [show, setShow] = useState(false);
  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <div className="w-full flex flex-col relative my-4 h-12">
      <label
        ref={labelRef}
        className={`text-xs font-semibold text-gray-500 absolute bottom-1`}
      >
        {props.label}
      </label>
      <input
        type={
          props.type == "password" ? (show ? "text" : "password") : props.type
        }
        onChange={props.onChange}
        onFocus={(e) => {
          if (e.target.value.length > 0) {
            labelRef.current?.classList.remove("bottom-1");
          } else {
            labelRef.current?.classList.add("bottom-1");
          }
          labelRef.current?.classList.remove("bottom-1");
        }}
        onBlur={(e) => {
          if (e.target.value.length > 0) {
            labelRef.current?.classList.remove("bottom-1");
          } else {
            labelRef.current?.classList.add("bottom-1");
          }
        }}
        className={`w-full font-medium border-b-[1px] absolute bottom-0 bg-transparent outline-none ${
          theme == Theme.dark ? "text-pry border-light" : "text-pry border-dark"
        }`}
      />
      {props.type == "password" && (
        <button
          className="absolute right-1 bottom-1"
          onClick={() => setShow(!show)}
        >
          {show ? <FaEye /> : <FaEyeSlash />}
        </button>
      )}
    </div>
  );
};

export default Input;
