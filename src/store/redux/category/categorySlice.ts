import { createAppSlice } from "store/createAppSlice";

import { CategoryDataSliceState } from "./types";

const CategoryInitialState: CategoryDataSliceState = {
  data: [],
  status: "default",
  error: undefined,
};

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

export const categorySlice = createAppSlice({
  name: "CATEGORIES",
  initialState: CategoryInitialState,
  reducers: (create) => ({
    getCategory: create.asyncThunk(
      async (_arg, thunkApi) => {
        try {
          const response = await fetch(`${BASE_URL}/v1/categories`);
          if (!response.ok) {
            const result = await response.json();
            return thunkApi.rejectWithValue(result);
          }
          return await response.json();
        } catch (error) {
          return thunkApi.rejectWithValue({ error: "Failed to fetch data" });
        }
      },
      {
        pending: (state: CategoryDataSliceState) => {
          state.status = "loading";
          state.error = undefined;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fulfilled: (state: CategoryDataSliceState, action: any) => {
          state.status = "success";
          state.data = action.payload;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rejected: (state: CategoryDataSliceState, action: any) => {
          state.status = "error";
          state.error = action.payload;
        },
      },
    ),
  }),
  selectors: {
    category: (state) => state,
  },
});

export const categorysDataSliceActions = categorySlice.actions;
export const categorysDataSliceSelectors = categorySlice.selectors;
