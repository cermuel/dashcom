import { useContext, useLayoutEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import { validateAuth } from "../lib";
import { Link, useNavigate } from "react-router-dom";
import AuthError from "../components/dashcom/shared/AuthError";
import { ThemeContextProvider } from "../context/ThemeContext";
import { AiOutlineArrowRight, AiOutlinePlus } from "react-icons/ai";
import { getAllWorkspaces } from "../functions/workspace";
import CreateWorkspace from "../components/dashcom/home/createWorkspace";

const Home = () => {
  const navigate = useNavigate();
  const [validate, setValidate] = useState<boolean | undefined>(undefined);
  const [workspaces, setWorkspaces] = useState<any>();
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const { theme } = useContext(ThemeContextProvider);

  useLayoutEffect(() => {
    setValidate(validateAuth({ navigate }));
    getAllWorkspaces({ setWorkspaces });
  }, []);

  if (validate == true) {
    return <AuthError />;
  }

  const filteredWorkspaces = workspaces?.filter((space: any) => {
    return space.name.toLowerCase().includes(query.toLowerCase());
  });

  if (workspaces) {
    return (
      <Layout>
        {showCreate && <CreateWorkspace setShowCreate={setShowCreate} />}
        <div className="w-full overflow-hidden">
          <section
            className={`border-b-[1px] p-4 ${
              theme == "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 hover:bg-pry transition-all duration-500 max-w-[300px] p-2 rounded-md"
            >
              <span
                className={`h-6 flex justify-center items-center rounded-md w-7 ${
                  theme == "dark" ? "bg-gray-700" : "bg-gray-300"
                }`}
              >
                <AiOutlinePlus />
              </span>
              Create New WorkSpace
            </button>
          </section>
          <section className="w-full h-[90%] overflow-scroll py-4">
            {workspaces?.length > 0 ? (
              <div className="w-full flex flex-wrap gap-8 max-md:justify-center">
                <div className="w-full flex justify-end">
                  <input
                    type="text"
                    onChange={({ target }) => setQuery(target.value)}
                    className="bg-transparent border-b-gray-500 border-b-[1px] outline-none w-56"
                    placeholder="Search Workspace..."
                  />
                </div>
                {filteredWorkspaces?.map((space: any) => (
                  <div
                    key={space.id}
                    className="rounded-md w-52 h-28 max-sm:w-full flex flex-col justify-between max-sm:h-40 bg-pry p-2"
                  >
                    <h1 className="font-bold truncate text-white">
                      {space.name}
                    </h1>
                    <div className="flex w-full justify-end">
                      <Link
                        to={`/dashcom/workspace/${space.id}`}
                        className="float-right"
                      >
                        <AiOutlineArrowRight className="text-white" />
                      </Link>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setShowCreate(true)}
                  className="rounded-md text-white w-52 h-28 max-sm:w-full flex items-center justify-center max-sm:h-40 bg-gray-500 font-bold sm:text-sm opacity-80 hover:opacity-100"
                >
                  Create Workspace
                </button>
              </div>
            ) : (
              <h1 className="text-2xl font-medium text-center">
                No WorkSpaces Available
              </h1>
            )}
          </section>
        </div>
      </Layout>
    );
  }
};

export default Home;
