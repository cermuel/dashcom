import { Link, useParams } from "react-router-dom";
import Layout from "../components/shared/Layout";
import { useContext, useLayoutEffect, useState } from "react";
import { deleteWorkspace, getWorkspace } from "../functions/workspace";
import { ThemeContextProvider } from "../context/ThemeContext";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import UpdateWorkspace from "../components/dashcom/workspace/updateWorkspace";
import AddAdmin from "../components/dashcom/workspace/addAdmin";
import { getAllUsers, getMe } from "../functions/user";
import Loading from "../components/dashcom/shared/Loading";
import { FiUserPlus } from "react-icons/fi";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { getAllProjects } from "../functions/projects";
import CreateProject from "../components/dashcom/workspace/createProject";
import Project from "../components/dashcom/workspace/Project";

const Workspace = () => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContextProvider);

  const [workspace, setWorkspace] = useState<any>();
  const [projects, setProjects] = useState<any>([]);

  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [showAdmin, setShowAdmin] = useState<boolean>(false);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMeLoading, setIsMeLoading] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [me, setMe] = useState<any>();

  useLayoutEffect(() => {
    id && getWorkspace({ setWorkspace, id });
    getAllUsers({ setUsers, setIsLoading });
    getMe({ setMe, setIsLoading: setIsMeLoading });
    getAllProjects({ setProjects });
  }, []);

  if (isLoading || isMeLoading) {
    return <Loading />;
  } else {
    return (
      <Layout>
        {showUpdate && (
          <UpdateWorkspace
            id={id}
            setShowUpdate={setShowUpdate}
            workspace={{
              name: workspace?.name,
              description: workspace?.description,
            }}
          />
        )}
        {showAdmin && (
          <AddAdmin id={id} me={me} users={users} setShowAdmin={setShowAdmin} />
        )}
        {showCreate && <CreateProject id={id} setShowCreate={setShowCreate} />}
        <div className="w-full flex md:overflow-y-hidden overflow-y-hidden gap-4 max-md:flex-wrap">
          <section
            className={`flex overflow-hidden gap-4 ${
              showFull ? "md:w-[99%]" : "md:w-[70%] p-4"
            } w-full rounded-t-xl transition-all duration-500 overflow-scroll border-[1px] p-4 ${
              theme == "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <section className="flex items-start space-x-4">
              <button
                onClick={() => setShowCreate(true)}
                className={`flex h-10 items-center gap-2 max-w-[300px] text-sm px-4 py-3  rounded-md ${
                  theme == "dark" ? "bg-gray-700" : "bg-gray-300"
                }`}
              >
                <span
                  className={`h-6 flex justify-center items-center rounded-md w-7`}
                >
                  <AiOutlinePlus />
                </span>
                Add another project
              </button>
              {projects.map((project: any) => {
                const thisworkspace = project.workspace_id == id;

                if (thisworkspace) {
                  return <Project project={project} key={project.id} />;
                }
              })}
            </section>
          </section>
          <section
            className={`${
              !showFull ? "md:w-[30%] p-4" : "md:w-[1%] p-4"
            } z-50 relative w-full transition-all duration-500 rounded-t-xl overflow-scroll border-[1px] space-y-5
           ${theme == "dark" ? "border-gray-700" : "border-gray-300"}`}
          >
            <button
              onClick={() => setShowFull(!showFull)}
              className="absolute text-xl left-[0] max-md:hidden z-[1000000000]"
            >
              {showFull ? <TfiArrowCircleLeft /> : <TfiArrowCircleRight />}
            </button>
            {showFull && (
              <div
                className={`w-full max-md:hidden absolute top-0 left-0 z-20 h-full ${
                  theme == "dark" ? "bg-dark" : "bg-light"
                }`}
              ></div>
            )}
            <div>
              <h1 className="font-bold text-xl">
                {workspace?.name} Description
              </h1>
              <p
                className={`${
                  theme == "dark" ? "text-gray-300" : "text-gray-700"
                } text-sm`}
              >
                {workspace?.description}
                <button
                  className="float-right mt-4"
                  onClick={() => setShowUpdate(true)}
                >
                  <AiFillEdit />
                </button>
              </p>
            </div>
            <div>
              <h1 className="font-bold text-xl">Administrators</h1>
              <div className="flex flex-wrap items-center gap-3">
                {workspace?.adminstrators.map((admin: any) => (
                  <Link
                    to={"/dashcom/user/" + admin.id}
                    key={admin.id}
                    className="font-semibold tracking-wider rounded-full w-7 text-xs h-7 bg-pry flex justify-center items-center text-white mt-1"
                  >
                    {admin
                      ? admin?.first_name.slice(0, 1) +
                        admin?.last_name.slice(0, 1)
                      : ""}
                  </Link>
                ))}
                <button className="text-lg" onClick={() => setShowAdmin(true)}>
                  <FiUserPlus />
                </button>
              </div>
            </div>
            <div className="w-full flex justify-end pt-4">
              <button onClick={() => id && deleteWorkspace({ id })}>
                <FaTrash
                  className={`text-lg ${
                    theme == "dark" ? "text-[#f47171]" : "text-[#ec0000]"
                  }`}
                />
              </button>
            </div>
          </section>
        </div>
      </Layout>
    );
  }
};

export default Workspace;
