import React, { useContext, useLayoutEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RxDotsHorizontal } from "react-icons/rx";
import { ThemeContextProvider } from "../../../context/ThemeContext";
import CreateTask from "./createTasks";
import { getAllTasks } from "../../../functions/projects";
import Task from "./Task";
import TaskOpened from "./TaskOpened";

const Project = ({ project }: { project: any }) => {
  const { theme } = useContext(ThemeContextProvider);
  const [showCreate, setShowCreate] = useState<boolean>(false);

  const [Tasks, setTasks] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [taskOpened, setShowTaskOpened] = useState<number | undefined>(
    undefined
  );

  useLayoutEffect(() => {
    getAllTasks({
      setLoading,
      setTasks,
      projectId: project.id,
    });
  }, []);

  return (
    <div
      className={`w-[280px] h-auto p-3 rounded-lg border-[1px] border-gray-500 space-y-3`}
    >
      {showCreate && (
        <CreateTask setShowCreate={setShowCreate} id={project.id} />
      )}
      <div className="w-full flex items-center justify-between">
        <h1 className="font-medium text-sm">{project.name}</h1>
        <button
          className={`rounded-[4px] p-[6px] ${
            theme == "dark" ? "hover:bg-gray-700" : "hover:bg-gray-300"
          }`}
        >
          <RxDotsHorizontal />
        </button>
      </div>
      {taskOpened && (
        <TaskOpened
          setShowTaskOpened={setShowTaskOpened}
          taskOpened={taskOpened}
          projectId={project.id}
        />
      )}
      {Tasks.map((task: any) => (
        <Task Task={task} key={task.id} setShowTaskOpened={setShowTaskOpened} />
      ))}
      <button
        onClick={() => setShowCreate(true)}
        className={`flex h-10 items-center gap-2 w-full justify-center p-2 rounded-md text-sm ${
          theme == "dark" ? "bg-gray-700" : "bg-gray-300"
        }`}
      >
        <span className={`h-6 flex justify-center items-center rounded-md w-7`}>
          <AiOutlinePlus />
        </span>
        Add Task
      </button>
    </div>
  );
};

export default Project;
