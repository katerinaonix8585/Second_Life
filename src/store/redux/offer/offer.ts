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
    getAllOffer: create.asyncThunk(
      async (
        { page, size, sortBy }: { page: number; size: number; sortBy: string },
        thunkApi,
      ) => {
        const response = await fetch(
          `${BASE_URL}/v1/offers/all?page=${page}&size=${size}&sortBy=${sortBy}`,
        );
        const result = await response.json();
        console.log(result);

        if (!response.ok) {
          thunkApi.rejectWithValue(result);
        } else {
          return result;
        }
      },
      {
        pending: (state: OfferDataSliceState) => {
          console.log("pending");
          state.statusOffer = "loading";
          state.errorOffer = undefined;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fulfilled: (state: OfferDataSliceState, action: any) => {
          console.log("fulfilled");
          console.log(action);

          const { offers } = action.payload;

          state.statusOffer = "success";
          state.data = offers;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rejected: (state: OfferDataSliceState, action: any) => {
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

export const offersDataSliceActions = offerSlice.actions;
export const offersDataSliceSelectors = offerSlice.selectors;
