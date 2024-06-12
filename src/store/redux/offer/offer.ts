import { createAppSlice } from "store/createAppSlice";

import { OfferDataSliceState } from "./types";

const offerInitialState: OfferDataSliceState = {
  data: [],
  statusOffer: "default",
  errorOffer: undefined,
};

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

const fetchOfferById = async (
  offerId: string,
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thunkApi: any,
  method: string = "GET",
) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return thunkApi.rejectWithValue({ message: "Access token not found" });
  }

  try {
    console.log(`Fetching offer with ID: ${offerId} using ${method} method`);
    const response = await fetch(
      `${BASE_URL}/v1/offers/${offerId}${endpoint}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
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
};

export const offerSlice = createAppSlice({
  name: "OFFER",
  initialState: offerInitialState,
  reducers: (create) => ({
    getOfferById: create.asyncThunk(
      async (offerId: string, thunkApi) => {
        return fetchOfferById(offerId, "", thunkApi);
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
    rejectedOfferById: create.asyncThunk(
      async (offerId: string, thunkApi) => {
        return fetchOfferById(offerId, "/rejected", thunkApi, "DELETE");
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
    cancelledOfferById: create.asyncThunk(
      async (offerId: string, thunkApi) => {
        return fetchOfferById(offerId, "/cancel", thunkApi, "DELETE");
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
    burnoutOfferById: create.asyncThunk(
      async (offerId: string, thunkApi) => {
        return fetchOfferById(offerId, "/complete", thunkApi, "PATCH");
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
