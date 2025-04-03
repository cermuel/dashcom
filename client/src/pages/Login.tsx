import { useLayoutEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import authsvg from "../assets/images/auth.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import { LoginDetailsType } from "../types/pages";
import { LoginFunc } from "../functions/auth";
import logo from "../assets/images/logo.svg";
import { validateAuth } from "../lib";

const Login = () => {
  const [loginDetails, changeLoginDetails] = useState<LoginDetailsType>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    validateAuth({ navigate });
  }, []);

  return (
    <Layout>
      <div className="w-full h-full flex">
        <section className="h-full w-[50%] max-md:hidden relative justify-center items-center flex flex-col flex-wrap pb-40">
          <h1 className="text-6xl font-bold flex items-center">
            Sign in to <img src={logo} className="mt-2 ml-4" alt="dashcom" />
            <span className="text-pry">Dashcom</span>
          </h1>
          <p className="text-xl w-full px-20 mt-4 text-left">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-pry underline">
              Register
            </Link>
          </p>
          <img src={authsvg} className="absolute right-0 bottom-0" alt="" />
        </section>
        <section className="h-full md:w-[50%] w-full flex justify-center items-center flex-col md:px-40 px-4">
          <h2 className="text-2xl w-full text-left font-semibold mb-1">
            Sign In
          </h2>
          <p className="text-xs w-full text-left mb-4 md:hidden">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-pry underline">
              Register
            </Link>
          </p>
          <Input
            props={{
              type: "email",
              label: "Email",
              onChange: (e: any) => {
                changeLoginDetails({ ...loginDetails, email: e.target.value });
              },
            }}
          />
          <Input
            props={{
              type: "password",
              label: "Password",
              onChange: (e: any) => {
                changeLoginDetails({
                  ...loginDetails,
                  password: e.target.value,
                });
              },
            }}
          />
          <Button
            props={{
              title: "Login",
              isLoading: isLoading,
              onClick: () =>
                LoginFunc({ loginDetails, setIsLoading, navigate }),
            }}
          />
        </section>
      </div>
    </Layout>
  );
};

export default Login;
