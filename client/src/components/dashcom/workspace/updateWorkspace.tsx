import { Dispatch, useContext, useEffect, useState } from "react";
import { ThemeContextProvider } from "../../../context/ThemeContext";
import { CreateWorkSpaceType } from "../../../types/components";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { updateWorkspace } from "../../../functions/workspace";

const UpdateWorkspace = ({
  setShowUpdate,
  workspace,
  id,
}: {
  setShowUpdate: Dispatch<boolean>;
  workspace: CreateWorkSpaceType;
  id: string | number | undefined;
}) => {
  const { theme } = useContext(ThemeContextProvider);

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(workspace.name);
  const [description, setDescription] = useState<string>(workspace.description);
  const [updatedWorkspace, setUpdatedWorkspace] = useState<CreateWorkSpaceType>(
    {
      name,
      description,
    }
  );
  useEffect(() => {
    setUpdatedWorkspace({
      name,
      description,
    });
  }, [name, description]);

  return (
    <div
      className={`max-w-[300px] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_2px_rgba(25,28,33,0.08)] p-4 gap-4 w-full rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col ${
        theme == "dark" ? "bg-gray-700" : "bg-gray-100"
      }`}
    >
      <section className="flex justify-between">
        <div></div>
        <h1 className="font-bold truncate">Update {workspace.name}</h1>
        <button onClick={() => setShowUpdate(false)}>
          <AiOutlineClose />
        </button>
      </section>

      <section className="w-full flex flex-wrap gap-3">
        <div className="w-full">
          <label className="text-sm font-semibold w-full">Name</label>
          <input
            onChange={({ target }) => setName(target.value)}
            value={name}
            maxLength={20}
            type="text"
            className="w-full bg-transparent outline-none mt-[2px] border-[1px] border-gray-500 text-sm p-1 rounded-sm focus:border-pry focus:border-2"
          />
        </div>
        <div className="w-full">
          <label className="text-sm font-semibold w-full">Description</label>
          <textarea
            rows={7}
            onChange={({ target }) => setDescription(target.value)}
            value={description}
            className="w-full bg-transparent outline-none mt-[2px] border-[1px] border-gray-500 text-sm p-1 rounded-sm focus:border-pry focus:border-2"
          />
        </div>
      </section>

      <button
        onClick={() =>
          id && updateWorkspace({ setLoading, updatedWorkspace, id })
        }
        className="bg-pry w-full text-center text-white rounded-sm flex items-center justify-center h-9 font-bold text-sm"
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          "Update"
        )}
      </button>
    </div>
  );
};

export default UpdateWorkspace;
