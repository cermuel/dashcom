import { Dispatch, useContext } from "react";
import { ThemeContextProvider } from "../../../context/ThemeContext";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Task = ({
  Task,
  setShowTaskOpened,
}: {
  Task: any;
  setShowTaskOpened: Dispatch<number>;
}) => {
  const { theme } = useContext(ThemeContextProvider);

  return (
    <div
      className={`w-full p-2 rounded-md flex items-center justify-between border-2 ${
        theme == "dark"
          ? "bg-gray-700 border-gray-700 hover:border-gray-300"
          : "bg-gray-300 border-gray-300 hover:border-gray-700"
      }`}
    >
      <h1 className="text-sm">{Task.name}</h1>
      <MdOutlineRemoveRedEye
        className="cursor-pointer"
        onClick={() => setShowTaskOpened(Task.id)}
      />
    </div>
  );
};

export default Task;
