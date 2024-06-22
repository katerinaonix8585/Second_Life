/* eslint-disable @typescript-eslint/no-explicit-any */
export interface OfferData {
  id: number;
  title: string;
  description: string;
  auctionStartAt: Date;
  auctionEndAt: Date;
  startPrice: null | number;
  winBid: null | number;
  isFree: boolean;
  ownerId: null | number;
  ownerFullName: string;
  status: string;
  winnerBidId: null | number;
  categoryId: number;
  locationId: number;
  auctionDurationDays: null | number;
  typeOffer: string;
  maxBidValue: number;
  bidsCount: number;
  isCurrentUserAuctionParticipant: boolean;
  images: {
    [key: string]: {
      "1024x1024": string;
      "320x320": string;
      "64x64": string;
    };
  };
}

export interface OfferDataSliceState {
  data: OfferData[];
  statusOffer: "default" | "loading" | "success" | "error";
  errorOffer: any;
}
