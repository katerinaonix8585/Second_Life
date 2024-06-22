export interface BidDataOffer {
  id: number;
  bidValue: number;
  createdAt: string;
  offerId: number;
  userId: number;
  userNameShorted: string;
  userEmail: string;
}

export interface BidsResponseSlice {
  bids: BidDataOffer[];
  status: "default" | "loading" | "success" | "error";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}
