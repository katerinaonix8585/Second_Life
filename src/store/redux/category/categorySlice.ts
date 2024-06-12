import { createAppSlice } from "store/createAppSlice";

import { CategoryDataSliceState } from "./types";

const CategoryInitialState: CategoryDataSliceState = {
  data: [],
  status: "default",
  error: undefined,
};

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

export const categorySlice = createAppSlice({
  name: "CATEGORY",
  initialState: CategoryInitialState,
  reducers: (create) => ({
    getCategory: create.asyncThunk(
      async (_arg, thunkApi) => {
        const response = await fetch(`${BASE_URL}/v1/categories`);
        const result = await response.json();
        console.log(result);

        if (!response.ok) {
          return thunkApi.rejectWithValue(result);
        } else {
          return result;
        }
      },
      {
        pending: (state: CategoryDataSliceState) => {
          console.log("pending");
          state.status = "loading";
          state.error = undefined;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fulfilled: (state: CategoryDataSliceState, action: any) => {
          console.log("fulfilled");
          console.log(action);

          state.status = "success";
          state.data = [...state.data, ...action.payload];
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rejected: (state: CategoryDataSliceState, action: any) => {
          state.status = "error";
          state.error = action.payload;
        },
      },
    ),
    addCategory: create.asyncThunk(
      async (category: { name: string; description: string }, thunkApi) => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(`${BASE_URL}/v1/categories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(category),
        });
        const result = await response.json();
        console.log(result);

        if (!response.ok) {
          return thunkApi.rejectWithValue(result);
        } else {
          return result;
        }
      },
      {
        pending: (state: CategoryDataSliceState) => {
          console.log("pending");
          state.status = "loading";
          state.error = undefined;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fulfilled: (state: CategoryDataSliceState, action: any) => {
          console.log("fulfilled");
          console.log(action);

          state.status = "success";
          state.data = [...state.data, action.payload];
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
