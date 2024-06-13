import { createAppSlice } from "store/createAppSlice";

import { CategoryOneDataSliceState } from "./types";

const CategoryInitialState: CategoryOneDataSliceState = {
  data: {
    id: 0,
    name: "",
    description: "",
    active: false,
    image: "",
  },
  status: "default",
  error: undefined,
};

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

export const categoryOneSlice = createAppSlice({
  name: "CATEGORY",
  initialState: CategoryInitialState,
  reducers: (create) => ({
    getCategoryById: create.asyncThunk(
      async (id: string, thunkApi) => {
        try {
          const response = await fetch(`${BASE_URL}/v1/categories/${id}`);
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
        pending: (state: CategoryOneDataSliceState) => {
          state.status = "loading";
          state.error = undefined;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fulfilled: (state: CategoryOneDataSliceState, action: any) => {
          state.status = "success";
          state.data = action.payload;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rejected: (state: CategoryOneDataSliceState, action: any) => {
          state.status = "error";
          state.error = action.payload;
        },
      },
    ),
    hideCategoryById: create.asyncThunk(
      async (id: string, thunkApi) => {
        try {
          const authToken = localStorage.getItem("accessAdminToken");
          const response = await fetch(`${BASE_URL}/v1/categories/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          });

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
        pending: (state: CategoryOneDataSliceState) => {
          state.status = "loading";
          state.error = undefined;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fulfilled: (state: CategoryOneDataSliceState, action: any) => {
          state.status = "success";
          state.data = action.payload;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rejected: (state: CategoryOneDataSliceState, action: any) => {
          state.status = "error";
          state.error = action.payload;
        },
      },
    ),
    activateCategoryById: create.asyncThunk(
      async (id: string, thunkApi) => {
        try {
          const authToken = localStorage.getItem("accessAdminToken");
          const response = await fetch(
            `${BASE_URL}/v1/categories/${id}/set-active`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
              },
            },
          );

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
        pending: (state: CategoryOneDataSliceState) => {
          state.status = "loading";
          state.error = undefined;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fulfilled: (state: CategoryOneDataSliceState, action: any) => {
          state.status = "success";
          state.data = action.payload;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rejected: (state: CategoryOneDataSliceState, action: any) => {
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

export const categorysOneDataSliceActions = categoryOneSlice.actions;
export const categoryOneDataSliceSelectors = categoryOneSlice.selectors;
