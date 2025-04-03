import { useContext, useLayoutEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import { ThemeContextProvider } from "../context/ThemeContext";
import { useParams } from "react-router-dom";
import { getUser } from "../functions/user";

const User = () => {
  const { theme } = useContext(ThemeContextProvider);
  const { id } = useParams();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    id &&
      getUser({
        setUser,
        setIsLoading: setLoading,
        id,
      });
  }, []);

  console.log(user);
  return (
    <Layout>
      <div className="flex">
        <img src="" className="w-14 h-14 border-2 rounded-full" alt="" />
        <div className="flex flex-col h-14 justify-center ml-2">
          <h1 className="text-lg font-medium">
            {user?.first_name + " " + user?.last_name}
          </h1>
          <h3 className="text-xs text-gray-500">@{user?.email}</h3>
        </div>
      </div>
    </Layout>
  );
};

export default User;
