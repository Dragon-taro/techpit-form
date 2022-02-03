export type College = {
  name: string;
  faculty: string;
  department: string;
};

export type Colleges = {
  search: string;
  result: CollegeResult[];
};

export type CollegeResult = {
  name: string;
  faculty: Faculty[];
};

export type Faculty = {
  name: string;
  department: string[];
};
