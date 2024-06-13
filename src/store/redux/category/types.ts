import { CategoryData } from "../categoryOne/types";

export interface CategoryDataSliceState {
  data: CategoryData[];
  status: "default" | "loading" | "success" | "error";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}
