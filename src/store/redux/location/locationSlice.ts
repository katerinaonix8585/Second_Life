import { createAppSlice } from "store/createAppSlice";

import { LocationDataSliceState } from "./types";

const locationInitialState: LocationDataSliceState = {
  data: [],
  statusLocation: "default",
  errorLocation: undefined,
};

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

export const locationSlice = createAppSlice({
  name: "LOCATION",
  initialState: locationInitialState,
  reducers: (create) => ({
    getLocation: create.asyncThunk(
      async (_arg, thunkApi) => {
        const response = await fetch(`${BASE_URL}/v1/locations`);
        const result = await response.json();
        console.log(result);

        if (!response.ok) {
          thunkApi.rejectWithValue(result);
        } else {
          return result;
        }
      },
      {
        pending: (state: LocationDataSliceState) => {
          console.log("pending");
          state.statusLocation = "loading";
          state.errorLocation = undefined;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fulfilled: (state: LocationDataSliceState, action: any) => {
          console.log("fulfilled");
          console.log(action);

          state.statusLocation = "success";
          state.data = [...state.data, ...action.payload];
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rejected: (state: LocationDataSliceState, action: any) => {
          state.statusLocation = "error";
          state.errorLocation = action.payload;
        },
      },
    ),
  }),
  selectors: {
    location: (state) => state,
  },
});

export const locationsDataSliceActions = locationSlice.actions;
export const locationsDataSliceSelectors = locationSlice.selectors;
