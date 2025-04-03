import { Dispatch } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { CreateWorkSpaceType } from "../types/components";
import { handleError } from "../lib";
import swal from "sweetalert";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const token = localStorage.getItem("dashcom_token");
axios.defaults.headers.common["Authorization"] = token;

export const getAllWorkspaces = async ({
  setWorkspaces,
}: {
  setWorkspaces: Dispatch<any>;
}) => {
  try {
    const workspaces = await axios.get(`${BASE_URL}workspaces`);
    setWorkspaces(workspaces.data.workspaces);
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.message ||
      error?.message;
    toast.error(message);
    console.log(error);
  }
};

export const createWorkspace = async ({
  newWorkspace,
  setLoading,
}: {
  newWorkspace: CreateWorkSpaceType;
  setLoading: Dispatch<boolean>;
}) => {
  setLoading(true);
  if (newWorkspace.name == "") {
    toast.error("Name is required");
    setLoading(false);
  } else if (newWorkspace.description == "") {
    toast.error("Description is required");
    setLoading(false);
  } else if (newWorkspace.description.length < 10) {
    toast.error("Description is too short");
    setLoading(false);
  } else if (newWorkspace.description.length >= 100) {
    toast.error("Description is too long");
    setLoading(false);
  } else {
    try {
      const workspace = await axios.post(`${BASE_URL}workspaces`, newWorkspace);
      toast.success(workspace.data.msg);
      setTimeout(() => {
        location.reload();
      }, 2000);
      setLoading(false);
    } catch (error) {
      handleError({ error, setIsLoading: setLoading });
    }
  }
};

export const getWorkspace = async ({
  setWorkspace,
  id,
}: {
  setWorkspace: Dispatch<any>;
  id: string | number;
}) => {
  try {
    const workspaces = await axios.get(`${BASE_URL}workspaces/${id}`);
    setWorkspace(workspaces.data.workspace);
  } catch (error: any) {
    handleError({ error });
  }
};

export const deleteWorkspace = ({ id }: { id: string | number }) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this workspace!",
    icon: "warning",
    //@ts-ignore
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      try {
        const workspace = await axios.delete(`${BASE_URL}workspaces/${id}`);
        swal("Workspace deleted successfully!", {
          icon: "success",
          //@ts-ignore
          buttons: true,
        })
          .then(() => {
            window.location.pathname = "/dashcom/home";
          })
          .catch(() => {
            window.location.pathname = "/dashcom/home";
          });
        console.log(workspace);
      } catch (error: any) {
        const message =
          error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.response?.message ||
          error?.message;
        console.log(error);
        swal(message, {
          icon: "error",
        });
      }
    } else {
      swal("Workspace not deleted!");
    }
  });
};

export const updateWorkspace = async ({
  updatedWorkspace,
  setLoading,
  id,
}: {
  updatedWorkspace: CreateWorkSpaceType;
  setLoading: Dispatch<boolean>;
  id: number | string;
}) => {
  setLoading(true);
  if (updatedWorkspace.name == "") {
    toast.error("Name is required");
    setLoading(false);
  } else if (updatedWorkspace.description == "") {
    toast.error("Description is required");
    setLoading(false);
  } else if (updatedWorkspace.description.length < 10) {
    toast.error("Description is too short");
    setLoading(false);
  } else if (updatedWorkspace.description.length >= 100) {
    toast.error("Description is too long");
    setLoading(false);
  } else {
    try {
      const workspace = await axios.put(
        `${BASE_URL}workspaces/${id}`,
        updatedWorkspace
      );
      toast.success(workspace.data.msg);
      setTimeout(() => {
        location.reload();
      }, 2000);
      setLoading(false);
    } catch (error) {
      handleError({ error, setIsLoading: setLoading });
    }
  }
};

export const addAdmin = ({
  userid,
  workspaceid,
  name,
}: {
  userid: string | number;
  workspaceid: string | number;
  name: string;
}) => {
  let text = `Do you want to make ${name} an administrator`;
  swal({
    title: "Are you sure?",
    text,
    icon: "warning",
    //@ts-ignore
    buttons: true,
    // dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      try {
        await axios.patch(
          `${BASE_URL}workspaces/${workspaceid}/add_administrator/${userid}`
        );

        swal("Administrator added successfully!", {
          icon: "success",
          //@ts-ignore
          buttons: true,
        })
          .then(() => {
            window.location.reload();
          })
          .catch(() => {
            window.location.reload();
          });
      } catch (error: any) {
        const message =
          error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.response?.message ||
          error?.message;
        console.log(error);
        swal(message, {
          icon: "error",
        });
      }
    } else {
      swal("Failed to add adminisrator!");
    }
  });
};
