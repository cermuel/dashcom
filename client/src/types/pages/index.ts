export type LoginDetailsType = {
  email: string;
  password: string;
};
export type RegisterDetailsType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type CreateProjectType = {
  name: string;
  description: string;
  start_date: Date | undefined;
  end_date: Date | undefined;
  workspace_id: string | number;
};
export type CreateTaskType = {
  name: string;
  description: string;
  start_date: Date | undefined;
  end_date: Date | undefined;
  project_id: string | number;
  user_ids: number[];
};
