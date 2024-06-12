import { createAppSlice } from "store/createAppSlice";

import { OffersDataSliceState } from "./types";

const offersInitialState: OffersDataSliceState = {
  isFirstPage: false,
  isLastPage: false,
  pageNumber: null,
  pageSize: null,
  totalElements: null,
  totalPages: null,
  data: [],
  statusOffer: "default",
  errorOffer: undefined,
};

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

export const offersSlice = createAppSlice({
  name: "OFFERS",
  initialState: offersInitialState,
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

        if (!response.ok) {
          thunkApi.rejectWithValue(result);
        } else {
          return result;
        }
      },
      {
        pending: (state: OffersDataSliceState) => {
          state.statusOffer = "loading";
          state.errorOffer = undefined;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fulfilled: (state: OffersDataSliceState, action: any) => {
          const {
            offers,
            isFirstPage,
            isLastPage,
            pageNumber,
            pageSize,
            totalElements,
            totalPages,
          } = action.payload;

          state.statusOffer = "success";
          state.data = offers;
          state.isFirstPage = isFirstPage;
          state.isLastPage = isLastPage;
          state.pageNumber = pageNumber;
          state.pageSize = pageSize;
          state.totalElements = totalElements;
          state.totalPages = totalPages;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rejected: (state: OffersDataSliceState, action: any) => {
          state.statusOffer = "error";
          state.errorOffer = action.payload;
        },
      },
    ),
    getAllUsersOffer: create.asyncThunk(
      async (
        {
          user,
          page,
          size,
          sortBy,
        }: { user: number; page: number; size: number; sortBy: string },
        thunkApi,
      ) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          return thunkApi.rejectWithValue({
            message: "Access token not found",
          });
        }

        try {
          const response = await fetch(
            `${BASE_URL}/v1/offers/user/${user}?page=${page}&size=${size}&sortBy=${sortBy}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );
          const result = await response.json();

          if (!response.ok) {
            thunkApi.rejectWithValue(result);
          } else {
            return result;
          }
        } catch (error) {
          console.error("Network error:", error);
          return thunkApi.rejectWithValue({ message: "Network error" });
        }
      },
      {
        pending: (state: OffersDataSliceState) => {
          state.statusOffer = "loading";
          state.errorOffer = undefined;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fulfilled: (state: OffersDataSliceState, action: any) => {
          const {
            offers,
            isFirstPage,
            isLastPage,
            pageNumber,
            pageSize,
            totalElements,
            totalPages,
          } = action.payload;

          state.statusOffer = "success";
          state.data = offers;
          state.isFirstPage = isFirstPage;
          state.isLastPage = isLastPage;
          state.pageNumber = pageNumber;
          state.pageSize = pageSize;
          state.totalElements = totalElements;
          state.totalPages = totalPages;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rejected: (state: OffersDataSliceState, action: any) => {
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

export const offersDataSliceActions = offersSlice.actions;
export const offersDataSliceSelectors = offersSlice.selectors;
