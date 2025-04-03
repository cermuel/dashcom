export type AuthInputType = {
  label: string;
  type: string;
  onChange: (e: any) => void;
};

export type AuthButtonType = {
  onClick: () => void;
  title: string;
  isLoading: boolean;
};

export type CreateWorkSpaceType = {
  name: string;
  description: string;
};
