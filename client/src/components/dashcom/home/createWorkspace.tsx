import { Dispatch, useContext, useState } from "react";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { ThemeContextProvider } from "../../../context/ThemeContext";
import { CreateWorkSpaceType } from "../../../types/components";
import { createWorkspace } from "../../../functions/workspace";

const CreateWorkspace = ({
  setShowCreate,
}: {
  setShowCreate: Dispatch<boolean>;
}) => {
  const { theme } = useContext(ThemeContextProvider);
  const [newWorkspace, setNewWorkspace] = useState<CreateWorkSpaceType>({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div
      className={`max-w-[300px] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_2px_rgba(25,28,33,0.08)] z-50 p-4 gap-4 w-full rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col ${
        theme == "dark" ? "bg-gray-700" : "bg-gray-100"
      }`}
    >
      <section className="flex justify-between">
        <div></div>
        <h1 className="font-bold">Create Workspace</h1>
        <button onClick={() => setShowCreate(false)}>
          <AiOutlineClose />
        </button>
      </section>

      <section className="w-full flex flex-wrap gap-3">
        <div className="w-full">
          <label className="text-sm font-semibold w-full">Name</label>
          <input
            onChange={({ target }) =>
              setNewWorkspace({ ...newWorkspace, name: target.value })
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
              setNewWorkspace({ ...newWorkspace, description: target.value })
            }
            className="w-full bg-transparent outline-none mt-[2px] border-[1px] border-gray-500 text-sm p-1 rounded-sm focus:border-pry focus:border-2"
          />
        </div>
      </section>

      <button
        onClick={() => createWorkspace({ setLoading, newWorkspace })}
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

export default CreateWorkspace;
