import { useState } from "react";
import Layout from "../components/shared/Layout";
import authsvg from "../assets/images/auth.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import { RegisterDetailsType } from "../types/pages";
import logo from "../assets/images/logo.svg";
import { RegisterFunc } from "../functions/auth";

const Register = () => {
  const [registerDetails, changeRegisterDetails] =
    useState<RegisterDetailsType>({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="w-full h-full flex flex-row-reverse">
        <section className="h-full w-[50%] max-md:hidden relative justify-center items-center flex flex-col flex-wrap pb-40">
          <h1 className="text-6xl font-bold flex items-center">
            Register to <img src={logo} className="mt-2 ml-4" alt="dashcom" />
            <span className="text-pry">Dashcom</span>
          </h1>
          <p className="text-xl w-full px-20 mt-4 text-right">
            Already have an account?{" "}
            <Link to={"/"} className="text-pry underline">
              Login
            </Link>
          </p>
          <img src={authsvg} className="absolute left-0 bottom-0" alt="" />
        </section>
        <section className="h-full md:w-[50%] w-full flex justify-center items-center flex-col md:px-40 px-4">
          <h2 className="text-2xl w-full text-left font-semibold mb-1">
            Sign in
          </h2>
          <p className="text-xs w-full text-left mb-4 md:hidden">
            Already have an account?{" "}
            <Link to={"/"} className="text-pry underline">
              Login
            </Link>
          </p>
          <Input
            props={{
              type: "text",
              label: "Firstname",
              onChange: (e: any) => {
                changeRegisterDetails({
                  ...registerDetails,
                  first_name: e.target.value,
                });
              },
            }}
          />
          <Input
            props={{
              type: "text",
              label: "Lastname",
              onChange: (e: any) => {
                changeRegisterDetails({
                  ...registerDetails,
                  last_name: e.target.value,
                });
              },
            }}
          />
          <Input
            props={{
              type: "email",
              label: "Email",
              onChange: (e: any) => {
                changeRegisterDetails({
                  ...registerDetails,
                  email: e.target.value,
                });
              },
            }}
          />
          <Input
            props={{
              type: "password",
              label: "Password",
              onChange: (e: any) => {
                changeRegisterDetails({
                  ...registerDetails,
                  password: e.target.value,
                });
              },
            }}
          />
          <Button
            props={{
              title: "Register",
              isLoading: isLoading,
              onClick: () =>
                RegisterFunc({ registerDetails, setIsLoading, navigate }),
            }}
          />
        </section>
      </div>
    </Layout>
  );
};

export default Register;
