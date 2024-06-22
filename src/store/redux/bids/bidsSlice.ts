import { createAppSlice } from "store/createAppSlice";

import { BidsResponseSlice } from "./types";

const BidInitialState: BidsResponseSlice = {
  bids: [],
  status: "default",
  error: undefined,
};

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

export const bidsSlice = createAppSlice({
  name: "BIDS",
  initialState: BidInitialState,
  reducers: (create) => ({
    getAllBid: create.asyncThunk(
      async ({ offerId }: { offerId: number }, thunkApi) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          return thunkApi.rejectWithValue({
            message: "Access token not found",
          });
        }

        try {
          const response = await fetch(`${BASE_URL}/v1/bids/offer/${offerId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
        pending: (state: BidsResponseSlice) => {
          state.status = "loading";
          state.error = undefined;
        },
        fulfilled: (state: BidsResponseSlice, action) => {
          state.status = "success";
          state.bids = action.payload.bids;
        },
        rejected: (state: BidsResponseSlice, action) => {
          state.status = "error";
          state.error = action.payload;
        },
      },
    ),
  }),
  selectors: {
    bids: (state) => state,
  },
});

export const bidsSliceDataActions = bidsSlice.actions;
export const bidsSliceDataSelectors = bidsSlice.selectors;
