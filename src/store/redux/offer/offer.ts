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
  accessToken: string,
  rejectionReasonId?: number,
) => {
  const token =
    accessToken === "accessAdminToken"
      ? localStorage.getItem("accessAdminToken")
      : localStorage.getItem("accessToken");

  if (!token) {
    return thunkApi.rejectWithValue({ message: "Access token not found" });
  }

  try {
    console.log(`Fetching offer with ID: ${offerId} using ${method} method`);
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: Record<string, any> = {};

    if (rejectionReasonId !== undefined) {
      body.rejectionReasonId = rejectionReasonId;
    }

    const response = await fetch(
      `${BASE_URL}/v1/offers/${offerId}${endpoint}`,
      {
        method,
        headers,
        body: method === "PATCH" ? JSON.stringify(body) : undefined, // Преобразуем body в строку JSON для PATCH запроса
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
        return fetchOfferById(offerId, "", thunkApi, "GET", "accessToken");
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
    completedOfferById: create.asyncThunk(
      async (offerId: string, thunkApi) => {
        return fetchOfferById(
          offerId,
          "/complete",
          thunkApi,
          "PATCH",
          "accessToken",
        );
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
      async (
        {
          offerId,
          rejectionReasonId,
        }: { offerId: string; rejectionReasonId: number },
        thunkApi,
      ) => {
        return fetchOfferById(
          offerId,
          "/reject",
          thunkApi,
          "PATCH",
          "accessAdminToken",
          rejectionReasonId,
        );
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
    blockedOfferById: create.asyncThunk(
      async (offerId: string, thunkApi) => {
        return fetchOfferById(
          offerId,
          "/block-by-admin",
          thunkApi,
          "DELETE",
          "accessAdminToken",
        );
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
    verifyOfferById: create.asyncThunk(
      async (offerId: string, thunkApi) => {
        return fetchOfferById(
          offerId,
          "/start-auction",
          thunkApi,
          "PATCH",
          "accessAdminToken",
        );
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
        return fetchOfferById(
          offerId,
          "/cancel",
          thunkApi,
          "DELETE",
          "accessAdminToken",
        );
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
        return fetchOfferById(
          offerId,
          "/complete",
          thunkApi,
          "PATCH",
          "accessAdminToken",
        );
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
