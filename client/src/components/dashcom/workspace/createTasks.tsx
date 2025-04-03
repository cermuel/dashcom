import {
  Dispatch,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { ThemeContextProvider } from "../../../context/ThemeContext";
import { CreateTaskType } from "../../../types/pages";
import { addTask } from "../../../functions/projects";
import AssignContributor from "./assignContributors";
import { getAllUsers, getMe } from "../../../functions/user";

const CreateTask = ({
  setShowCreate,
  id,
}: {
  setShowCreate: Dispatch<boolean>;
  id: string | undefined;
}) => {
  const { theme } = useContext(ThemeContextProvider);

  const [me, setMe] = useState<any>();
  const [user_ids, setUser_ids] = useState<number[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [showContrib, setShowContrib] = useState<boolean>(false);

  const [newTask, setNewTask] = useState<CreateTaskType>({
    name: "",
    description: "",
    start_date: undefined,
    end_date: undefined,
    project_id: Number(id),
    user_ids,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setNewTask({ ...newTask, user_ids });
  }, [user_ids]);

  useLayoutEffect(() => {
    getAllUsers({ setUsers, setIsLoading: setLoading });
    getMe({ setMe, setIsLoading: setLoading });
  }, []);

  return (
    <div
      className={`max-w-[300px] z-[100000] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_2px_rgba(25,28,33,0.08)] p-4 gap-4 w-full rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col ${
        theme == "dark" ? "bg-gray-700" : "bg-gray-100"
      }`}
    >
      {showContrib && (
        <AssignContributor
          users={users}
          me={me}
          setShowContrib={setShowContrib}
          user_ids={user_ids}
          setUser_ids={setUser_ids}
        />
      )}
      <section className="flex justify-between">
        <div></div>
        <h1 className="font-bold">Create Task</h1>
        <button onClick={() => setShowCreate(false)}>
          <AiOutlineClose />
        </button>
      </section>

      <section className="w-full flex flex-wrap gap-3">
        <div className="w-full">
          <label className="text-sm font-semibold w-full">Name</label>
          <input
            onChange={({ target }) =>
              setNewTask({ ...newTask, name: target.value })
            }
            maxLength={20}
            type="text"
            className="w-full bg-transparent outline-none mt-[2px] border-[1px] border-gray-500 text-sm p-1 rounded-sm focus:border-pry focus:border-2"
          />
        </div>
        <div className="w-full">
          <label className="text-sm font-semibold w-full">Description</label>
          <textarea
            rows={7}
            onChange={({ target }) =>
              setNewTask({ ...newTask, description: target.value })
            }
            className="w-full bg-transparent outline-none mt-[2px] border-[1px] border-gray-500 text-sm p-1 rounded-sm focus:border-pry focus:border-2"
          />
        </div>
        <div className="flex">
          <button
            className="text-xs font-semibold rounded-sm bg-pry px-2 py-1"
            onClick={() => setShowContrib(true)}
          >
            Add Contributors
          </button>
        </div>
        <div className="w-full">
          <label className="text-sm font-semibold w-full" htmlFor="start_date">
            Start Date
          </label>
          <div className="w-full">
            <input
              type="date"
              name="start_date"
              id="start_date"
              className={`border-[1px] border-gray-500 focus:border-pry rounded-sm outline-none p-1 sm:text-sm ${
                theme == "dark"
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-300 text-gray-700"
              } w-full`}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  start_date: new Date(e.target.value),
                })
              }
            />
          </div>
        </div>{" "}
        <div className="w-full">
          <label className="text-sm font-semibold w-full" htmlFor="end_date">
            End Date
          </label>
          <div className="w-full">
            <input
              type="date"
              name="end_date"
              id="end_date"
              className={`border-[1px] border-gray-500 focus:border-pry rounded-sm outline-none p-1 sm:text-sm ${
                theme == "dark"
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-300 text-gray-700"
              } w-full`}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  end_date: new Date(e.target.value),
                })
              }
            />
          </div>
        </div>
      </section>

      <button
        onClick={() => addTask({ setLoading, newTask })}
        className="bg-pry w-full text-center text-white rounded-sm flex items-center justify-center h-9 font-bold text-sm"
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          "Create"
        )}
      </button>
    </div>
  );
};

export default CreateTask;
