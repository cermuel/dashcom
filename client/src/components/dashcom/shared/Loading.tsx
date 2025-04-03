import { useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ThemeContextProvider } from "../../../context/ThemeContext";

const Loading = () => {
  const { theme } = useContext(ThemeContextProvider);
  return (
    <div
      className={`w-screen h-screen fixed flex justify-center items-center ${
        theme == "dark" ? "bg-dark" : "bg-light"
      }`}
    >
      <AiOutlineLoading3Quarters className="animate-spin text-pry text-4xl" />
    </div>
  );
};

export default Loading;
