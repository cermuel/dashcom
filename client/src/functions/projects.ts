import { Dispatch } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { CreateProjectType, CreateTaskType } from "../types/pages";
import { handleError } from "../lib";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const token = localStorage.getItem("dashcom_token");
axios.defaults.headers.common["Authorization"] = token;

export const getAllProjects = async ({
  setProjects,
}: {
  setProjects: Dispatch<any>;
}) => {
  try {
    const projects = await axios.get(`${BASE_URL}projects`);
    setProjects(projects.data.projects);
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.message ||
      error?.message;
    toast.error(message);
    console.log(error);
  }
};

export const createProject = async ({
  newProject,
  setLoading,
}: {
  newProject: CreateProjectType;
  setLoading: Dispatch<boolean>;
}) => {
  setLoading(true);
  if (newProject.name == "") {
    toast.error("Name is required");
    setLoading(false);
  } else if (newProject.description == "") {
    toast.error("Description is required");
    setLoading(false);
  } else if (newProject.description.length < 10) {
    toast.error("Description is too short");
    setLoading(false);
  } else if (newProject.description.length >= 100) {
    toast.error("Description is too long");
    setLoading(false);
  } else if (newProject.start_date == undefined) {
    toast.error("Start Date is required");
    setLoading(false);
  } else if (newProject.end_date == undefined) {
    toast.error("End Date is required");
    setLoading(false);
  } else if (
    newProject.start_date?.getTime() >= newProject.end_date?.getTime()
  ) {
    toast.error("Date range is invalid");
    setLoading(false);
  } else {
    try {
      const project = await axios.post(`${BASE_URL}projects`, newProject);
      toast.success(project.data.msg);
      window.location.reload();
      setLoading(false);
    } catch (error: any) {
      handleError({ setIsLoading: setLoading, error });
    }
  }
};
export const addTask = async ({
  newTask,
  setLoading,
}: {
  newTask: CreateTaskType;
  setLoading: Dispatch<boolean>;
}) => {
  setLoading(true);
  if (newTask.name == "") {
    toast.error("Name is required");
    setLoading(false);
  } else if (newTask.description == "") {
    toast.error("Description is required");
    setLoading(false);
  } else if (newTask.description.length < 10) {
    toast.error("Description is too short");
    setLoading(false);
  } else if (newTask.description.length >= 100) {
    toast.error("Description is too long");
    setLoading(false);
  } else if (newTask.start_date == undefined) {
    toast.error("Start Date is required");
    setLoading(false);
  } else if (newTask.end_date == undefined) {
    toast.error("End Date is required");
    setLoading(false);
  } else if (newTask.start_date?.getTime() >= newTask.end_date?.getTime()) {
    toast.error("Date range is invalid");
    setLoading(false);
  } else {
    try {
      const task = await axios.patch(
        `${BASE_URL}projects/${newTask.project_id}/add_task`,
        newTask
      );
      toast.success(task.data.msg);
      window.location.reload();
      setLoading(false);
    } catch (error: any) {
      handleError({ setIsLoading: setLoading, error });
    }
  }
};

export const getAllTasks = async ({
  setLoading,
  setTasks,
  projectId,
}: {
  setTasks: Dispatch<any>;
  setLoading: Dispatch<boolean>;
  projectId: string | number;
}) => {
  try {
    const tasks = await axios.get(`${BASE_URL}projects/${projectId}/tasks`);
    toast.success(tasks.data.msg);
    setTasks(tasks.data.tasks);
    setLoading(false);
  } catch (error: any) {
    handleError({ setIsLoading: setLoading, error });
  }
};

export const getSingleTask = async ({
  setLoading,
  setTask,
  projectId,
  taskId,
}: {
  setTask: Dispatch<any>;
  setLoading: Dispatch<boolean>;
  projectId: string | number;
  taskId: number;
}) => {
  try {
    const task = await axios.get(
      `${BASE_URL}projects/${projectId}/tasks/${taskId}`
    );
    setTask(task.data.task);
    setLoading(false);
  } catch (error: any) {
    handleError({ setIsLoading: setLoading, error });
  }
};
