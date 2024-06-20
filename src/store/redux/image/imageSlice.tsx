import { createAppSlice } from "store/createAppSlice";

import { ImageSliceState } from "./types";

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

const imageInitialState: ImageSliceState = {
  data: {
    entityType: "",
    entityId: 0,
    file: null,
  },
  status: "idle",
  error: undefined,
};

export const imageSlice = createAppSlice({
  name: "IMAGE",
  initialState: imageInitialState,
  reducers: (create) => ({
    getImage: create.asyncThunk(
      async (_, thunkApi) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          return thunkApi.rejectWithValue({
            message: "Access token not found",
          });
        }

        try {
          const response = await fetch(`${BASE_URL}/v1/images`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const result = await response.json();

          if (!response.ok) {
            console.error("Fetch error:", result);
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
        pending: (state: ImageSliceState) => {
          console.log("Fetching image data - pending");
          state.status = "loading";
          state.error = undefined;
        },
        fulfilled: (state: ImageSliceState, action) => {
          console.log(
            "Fetching image data - fulfilled with payload:",
            action.payload,
          );
          state.status = "success";
          state.data = action.payload;
          state.error = undefined;
        },
        rejected: (state: ImageSliceState, action) => {
          console.error(
            "Fetching image data - rejected with payload:",
            action.payload,
          );
          state.status = "error";
          state.error = action.payload;
        },
      },
    ),
  }),
  selectors: {
    image: (state) => state.data,
  },
});

export const imageDataSliceActions = imageSlice.actions;
export const imageDataSliceSelectors = imageSlice.selectors;
