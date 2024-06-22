import { createAppSlice } from "store/createAppSlice";

import { RejectDataSliceState } from "./types";

const rejectInitialState: RejectDataSliceState = {
  rejects: [],
  statusReject: "default",
  errorReject: undefined,
};

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

export const rejectSlice = createAppSlice({
  name: "REJECT",
  initialState: rejectInitialState,
  reducers: (create) => ({
    getReject: create.asyncThunk(
      async (_arg, thunkApi) => {
        const response = await fetch(`${BASE_URL}/v1/rejection-reasons`);
        const result = await response.json();
        console.log(result);

        if (!response.ok) {
          thunkApi.rejectWithValue(result);
        } else {
          return result;
        }
      },
      {
        pending: (state: RejectDataSliceState) => {
          console.log("pending");
          state.statusReject = "loading";
          state.errorReject = undefined;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fulfilled: (state: RejectDataSliceState, action: any) => {
          console.log("fulfilled");
          console.log(action);

          state.statusReject = "success";
          state.rejects = action.payload.rejects;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rejected: (state: RejectDataSliceState, action: any) => {
          state.statusReject = "error";
          state.errorReject = action.payload;
        },
      },
    ),
  }),
  selectors: {
    reject: (state) => state,
  },
});

export const rejectDataSliceActions = rejectSlice.actions;
export const rejectDataSliceSelectors = rejectSlice.selectors;
