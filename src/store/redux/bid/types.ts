export interface BidData {
  offerId: number;
  bidValue: number;
}

export interface AddBidParams {
  offerId: string;
  bidValue: string;
}

export interface BidDataSliceState {
  data: BidData;
  status: "default" | "loading" | "success" | "error";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}
