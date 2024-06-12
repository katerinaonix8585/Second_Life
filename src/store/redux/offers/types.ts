import { OfferData } from "../offer/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface OffersDataSliceState {
  isFirstPage: boolean;
  isLastPage: boolean;
  pageNumber: number | null;
  pageSize: number | null;
  totalElements: number | null;
  totalPages: number | null;
  data: OfferData[];
  statusOffer: "default" | "loading" | "success" | "error";
  errorOffer: any;
}
