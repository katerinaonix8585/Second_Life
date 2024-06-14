import { createAppSlice } from "store/createAppSlice";

import { BidDataSliceState } from "./types";

const BidInitialState: BidDataSliceState = {
  data: {
    offerId: 0,
    bidValue: 0,
  },
  status: "default",
  error: undefined,
};

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

export const bidSlice = createAppSlice({
  name: "BID",
  initialState: BidInitialState,
  reducers: (create) => ({
    addBid: create.asyncThunk(
      async (
        { offerId, bidValue }: { offerId: number; bidValue: number },
        thunkApi,
      ) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          return thunkApi.rejectWithValue({
            message: "Access token not found",
          });
        }

        try {
          const response = await fetch(`${BASE_URL}/v1/bids`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ offerId, bidValue }),
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
        pending: (state: BidDataSliceState) => {
          state.status = "loading";
          state.error = undefined;
        },
        fulfilled: (state: BidDataSliceState, action) => {
          state.status = "success";
          state.data = action.payload;
        },
        rejected: (state: BidDataSliceState, action) => {
          state.status = "error";
          state.error = action.payload;
        },
      },
    ),
  }),
  selectors: {
    bid: (state) => state,
  },
});

export const bidSliceDataActions = bidSlice.actions;
export const bidSliceDataSelectors = bidSlice.selectors;
