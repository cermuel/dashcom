import { useNavigate } from "react-router-dom";
import Layout from "../../shared/Layout";

const AuthError = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="w-full h-full p-4 flex flex-col items-center">
        <h1 className="w-full text-2xl font-bold text-center my-4">
          You are not logged in!
        </h1>
        <button
          onClick={() => navigate("/")}
          className="bg-pry px-8 py-2 rounded-md"
        >
          Login
        </button>
      </div>
    </Layout>
  );
};

export default AuthError;
