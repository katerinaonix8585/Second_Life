import { createAppSlice } from "store/createAppSlice";

import { UserDataSliceState } from "./types";

const userInitialState: UserDataSliceState = {
  data: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    createdAt: 0,
    locationId: 0,
    lastActive: "",
    images: {
      values: {},
    },
  },
  status: "default",
  error: undefined,
};

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

export const userSlice = createAppSlice({
  name: "USER",
  initialState: userInitialState,
  reducers: (create) => ({
    getUserData: create.asyncThunk(
      async (_, thunkApi) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          return thunkApi.rejectWithValue({
            message: "Access token not found",
          });
        }

        try {
          const response = await fetch(`${BASE_URL}/v1/users/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const result = await response.json();

          if (!response.ok) {
            console.log("Response not OK, rejecting with value:", result);
            return thunkApi.rejectWithValue(result);
          } else {
            console.log("Fetch successful, returning result:", result);
            return result;
          }
        } catch (error) {
          console.error("Network error:", error);
          return thunkApi.rejectWithValue({ message: "Network error" });
        }
      },
      {
        pending: (state: UserDataSliceState) => {
          console.log("Fetching user data - pending");
          state.status = "loading";
          state.error = undefined;
        },
        fulfilled: (state: UserDataSliceState, action) => {
          console.log(
            "Fetching user data - fulfilled with payload:",
            action.payload,
          );
          state.status = "success";
          state.data = action.payload;
          state.error = undefined;
        },
        rejected: (state: UserDataSliceState, action) => {
          console.error(
            "Fetching user data - rejected with payload:",
            action.payload,
          );
          state.status = "error";
          state.error = action.payload;
        },
      },
    ),
    clearUserData: create.reducer((state) => {
      state.data = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        createdAt: 0,
        locationId: 0,
        lastActive: "",
        images: {
          values: {},
        },
      };
      state.status = "default";
      state.error = undefined;
    }),
  }),
  selectors: {
    user: (state) => state,
  },
});

export const userDataSliceActions = userSlice.actions;
export const userDataSliceSelectors = userSlice.selectors;
