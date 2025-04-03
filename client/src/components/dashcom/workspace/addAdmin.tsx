import { Dispatch, useContext, useState } from "react";
import { ThemeContextProvider } from "../../../context/ThemeContext";
import { AiOutlineClose } from "react-icons/ai";
import { FiUserPlus } from "react-icons/fi";
import { addAdmin } from "../../../functions/workspace";

const AddAdmin = ({
  setShowAdmin,
  users,
  me,
  id,
}: {
  setShowAdmin: Dispatch<boolean>;
  users: any;
  me: any;
  id: string | number | undefined;
}) => {
  const { theme } = useContext(ThemeContextProvider);
  const [query, setQuery] = useState("");

  const filteredUsers = users.filter((user: any) => {
    return (
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.first_name.toLowerCase().includes(query.toLowerCase()) ||
      user.last_name.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div
      className={`max-w-[350px] w-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_2px_rgba(25,28,33,0.08)] z-50 p-4 gap-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col ${
        theme == "dark" ? "bg-gray-700" : "bg-gray-100"
      }`}
    >
      <section className="flex justify-between">
        <div></div>
        <h1 className="font-bold">Add Administrator</h1>
        <button onClick={() => setShowAdmin(false)}>
          <AiOutlineClose />
        </button>
      </section>
      <section>
        <input
          onChange={({ target }) => setQuery(target.value)}
          type="text"
          placeholder="Search by name or email"
          className={`w-full border-[1px] rounded-md p-2 px-4 text-sm outline-none border-pry bg-transparent font-medium`}
        />
      </section>
      <section>
        {query !== "" &&
          filteredUsers.map((user: any) => {
            return (
              <>
                {me.id !== user.id && (
                  <div
                    className="w-full flex items-center py-2 justify-between"
                    key={user.id}
                  >
                    <div className="flex items-center gap-1">
                      <h1 className="font-semibold tracking-wider rounded-full w-7 h-7 bg-pry flex justify-center items-center text-white text-xs">
                        {user?.first_name.slice(0, 1) +
                          user?.last_name.slice(0, 1)}
                      </h1>
                      <p className="font-medium text-sm">
                        {user.first_name + " " + user.last_name}
                      </p>
                    </div>
                    <button
                      className="float-right"
                      onClick={() =>
                        id &&
                        addAdmin({
                          userid: user.id,
                          name: `${user.first_name} ${user.last_name}`,
                          workspaceid: id,
                        })
                      }
                    >
                      <FiUserPlus />
                    </button>
                  </div>
                )}
              </>
            );
          })}
      </section>
    </div>
  );
};

export default AddAdmin;
