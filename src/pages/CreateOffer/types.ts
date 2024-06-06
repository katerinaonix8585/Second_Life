export interface TypeOfferData {
  id: number;
  value: string;
}

export interface OfferFormValues {
  title: string;
  description: string;
  type: string;
  durationAuction?: number;
  category: string;
  location: string;
  startPrice?: number;
  step?: number;
  winbid?: number;
}

export enum OFFER_DATA {
  TITLE = "title",
  DESCRIPTION = "description",
  TYPE = "type",
  LOCATION = "location",
  DURATIONAUCTION = "durationAuction",
  CATEGORY = "category",
  STARTPRICE = "startPrice",
  STEP = "step",
  WINBID = "winbid",
}
