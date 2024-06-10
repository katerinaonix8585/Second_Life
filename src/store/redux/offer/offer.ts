import { createAppSlice } from "store/createAppSlice";

import { OfferDataSliceState } from "./types";

const offerInitialState: OfferDataSliceState = {
  data: [],
  statusOffer: "default",
  errorOffer: undefined,
};

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

export const offerSlice = createAppSlice({
  name: "OFFER",
  initialState: offerInitialState,
  reducers: (create) => ({
    getOfferById: create.asyncThunk(
      async (offerId: string, thunkApi) => {
        try {
          console.log(`Fetching offer with ID: ${offerId}`);
          const response = await fetch(`${BASE_URL}/v1/offers/${offerId}`);
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
        pending: (state: OfferDataSliceState) => {
          console.log("Fetching offer - pending");
          state.statusOffer = "loading";
          state.errorOffer = undefined;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fulfilled: (state: OfferDataSliceState, action: any) => {
          console.log(
            "Fetching offer - fulfilled with payload:",
            action.payload,
          );
          state.statusOffer = "success";
          state.data = action.payload;
          state.errorOffer = undefined;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rejected: (state: OfferDataSliceState, action: any) => {
          console.error(
            "Fetching offer - rejected with payload:",
            action.payload,
          );
          state.statusOffer = "error";
          state.errorOffer = action.payload;
        },
      },
    ),
  }),
  selectors: {
    offer: (state) => state,
  },
});

export const offerDataSliceActions = offerSlice.actions;
export const offerDataSliceSelectors = offerSlice.selectors;
