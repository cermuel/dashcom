import {
  Dispatch,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { ThemeContextProvider } from "../../../context/ThemeContext";
import { getAllProjects, getSingleTask } from "../../../functions/projects";
import {
  AiOutlineClose,
  AiOutlineLoading,
  AiOutlinePlus,
} from "react-icons/ai";
import { SiTask } from "react-icons/si";
import { BsTextParagraph } from "react-icons/bs";
import { TbStatusChange } from "react-icons/tb";
import { IoCheckmarkCircle } from "react-icons/io5";
import { BsCalendarDate } from "react-icons/bs";

const TaskOpened = ({
  taskOpened,
  setShowTaskOpened,
  projectId,
}: {
  taskOpened: number;
  setShowTaskOpened: Dispatch<number | undefined>;
  projectId: string | number;
}) => {
  const { theme } = useContext(ThemeContextProvider);
  const [loading, setLoading] = useState<boolean>(false);
  const [task, setTask] = useState<any>();
  const [projects, setProjects] = useState<any[]>();
  const [desc, editDesc] = useState(false);
  const [taskDesc, setTaskDesc] = useState<string>("");

  useLayoutEffect(() => {
    getSingleTask({
      setLoading,
      setTask,
      projectId,
      taskId: taskOpened,
    });
    getAllProjects({ setProjects });
  }, [taskOpened]);

  useEffect(() => {
    console.log({ task });
    task && setTaskDesc(task.description);
  }, [task]);

  const thisProject = projects?.filter((project) => project.id === task?.id);

  return (
    <div
      className={`max-w-[750px] h-[80%] z-[100] w-full p-8 rounded-t-xl absolute left-[50%] translate-x-[-50%] bottom-0 flex flex-col ${
        theme == "dark"
          ? "bg-gray-700 text-gray-300 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
          : "bg-gray-100 text-gray-700 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"
      }`}
    >
      <AiOutlineClose
        className="absolute top-8 right-8 cursor-pointer"
        onClick={() => setShowTaskOpened(undefined)}
      />
      {loading && (
        <div className="w-full h-full flex justify-center items-center">
          <AiOutlineLoading className="animate-spin text-4xl" />
        </div>
      )}
      {task && (
        <>
          <div className="flex items-center gap-2">
            <SiTask className="text-lg" />{" "}
            <h1 className="text-lg font-bold">{task.name}</h1>
          </div>
          <p className="text-xs ml-7 text-gray-400">
            in project{" "}
            <span className="underline">
              {thisProject && thisProject[0].name}
            </span>
          </p>
          <div className="ml-7 my-6">
            <div className="flex flex-col">
              <h2 className="text-xs font-medium">Contributors</h2>
              <div className="flex items-center gap-1">
                {task.assigned_to.map((contri: any) => {
                  return <div></div>;
                })}
              </div>
              <button className="rounded-full w-6 h-6 bg-gray-400 flex justify-center items-center">
                <AiOutlinePlus />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BsTextParagraph className="text-lg" />{" "}
            <h1 className="text-lg font-bold">Description</h1>
          </div>
          <input
            value={taskDesc}
            onChange={({ target }) => setTaskDesc(target.value)}
            disabled={!desc}
            className="text-xs bg-transparent ml-7 my-2 w-[90%] outline-none"
          />
          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                if (desc === false) {
                  editDesc(true);
                } else {
                  editDesc(false);
                }
              }}
              className="text-xs bg-pry px-4 py-1 font-medium text-white rounded-sm"
            >
              {!desc ? "Edit" : "Save"}
            </button>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <TbStatusChange className="text-lg" />{" "}
            <h1 className="text-lg font-bold">Status</h1>
          </div>
          <div className="ml-7 flex items-center gap-2 text-sm capitalize">
            {task.status}
            <IoCheckmarkCircle className="text-pry text-lg cursor-pointer" />
          </div>
          <div className="flex items-center gap-2 mt-6">
            <BsCalendarDate className="text-lg" />{" "}
            <h1 className="text-lg font-bold">Dates</h1>
          </div>
          <div className="ml-7">
            <div className="my-2 w-full flex items-center gap-2">
              <label className="text-sm">Start Date:</label>
              <input
                type="date"
                disabled={true}
                className="bg-transparent border-b-[1px] p-1 text-xs rounded-md"
                value={new Date(task.start_date).toISOString().split("T")[0]}
              />
            </div>
            <div className="my-2 w-full flex items-center gap-4">
              <label className="text-sm">End Date:</label>
              <input
                type="date"
                className="bg-transparent cursor-pointer border-b-[1px] p-1 text-xs rounded-md"
                value={new Date(task.end_date).toISOString().split("T")[0]}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskOpened;
