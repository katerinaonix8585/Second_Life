export interface CategoryData {
  id: number;
  name: string;
  description: string;
  active: boolean;
  image: number;
}

export interface CategoryDataSliceState {
  data: CategoryData[];
  status: "default" | "loading" | "success" | "error";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}
