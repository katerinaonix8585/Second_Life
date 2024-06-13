export interface CategoryData {
  id: number;
  name: string;
  description: string;
  active: boolean;
  image: string;
}

export interface CategoryOneDataSliceState {
  data: CategoryData;
  status: "default" | "loading" | "success" | "error";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}
