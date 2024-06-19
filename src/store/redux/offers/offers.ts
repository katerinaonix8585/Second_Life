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
        {
          page,
          size,
          sortBy,
          isAsc,
          category_id,
          status,
          free,
        }: {
          page: number;
          size: number;
          sortBy: string;
          isAsc: boolean;
          category_id?: number;
          status?: string;
          free?: boolean;
        },
        thunkApi,
      ) => {
        const queryParams = [
          `page=${page}`,
          `size=${size}`,
          `sortBy=${sortBy}`,
          `isAsc=${isAsc}`,
        ];

        if (category_id !== undefined) {
          queryParams.push(`category_id=${category_id}`);
        }
        if (status !== undefined) {
          queryParams.push(`status=${status}`);
        }
        if (free !== undefined) {
          queryParams.push(`free=${free}`);
        }

        const queryString = queryParams.join("&");

        const response = await fetch(
          `${BASE_URL}/v1/offers/all?${queryString}`,
        );
        const result = await response.json();

        if (!response.ok) {
          return thunkApi.rejectWithValue(result);
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
            return thunkApi.rejectWithValue(result);
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
    searchOffer: create.asyncThunk(
      async (
        {
          pattern,
          page,
          size,
          sortBy,
          isAsc,
          location_id,
        }: {
          pattern: string;
          page: number;
          size: number;
          sortBy: string;
          isAsc: boolean;
          location_id?: number;
        },
        thunkApi,
      ) => {
        const queryParams = [
          `pattern=${pattern}`,
          `page=${page}`,
          `size=${size}`,
          `sortBy=${sortBy}`,
          `isAsc=${isAsc}`,
        ];

        if (location_id !== undefined) {
          queryParams.push(`location_id=${location_id}`);
        }

        const queryString = queryParams.join("&");

        const response = await fetch(
          `${BASE_URL}/v1/offers/search?${queryString}`,
        );
        const result = await response.json();

        if (!response.ok) {
          return thunkApi.rejectWithValue(result);
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
  }),
  selectors: {
    offer: (state) => state,
  },
});

export const offersDataSliceActions = offersSlice.actions;
export const offersDataSliceSelectors = offersSlice.selectors;
