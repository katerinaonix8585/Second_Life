/* eslint-disable @typescript-eslint/no-explicit-any */
export interface OfferData {
  id: number;
  title: string;
  image: string;
  description: string;
  locationId: number;
  categoryId: number;
  data: string;
  typeOffer: string;
  is_active: boolean;
  isFree: boolean;
  startPrice: null | number;
  step: null | number;
  winBid: null | number;
  endAt: Date;
}

export interface OfferDataSliceState {
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
