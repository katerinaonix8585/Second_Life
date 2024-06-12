import { CategoryData } from "components/CategoryCard/types";
import { LocationData } from "pages/Layout/types";

export interface TypeOfferData {
  id: number;
  value: string;
}

export interface OfferFormValues {
  title: string;
  description: string;
  type: TypeOfferData;
  durationAuction?: number | null;
  category: CategoryData;
  location: LocationData;
  startPrice?: number | null;
  winbid?: number | null;
  ownerId?: number | null;
}

export enum OFFER_DATA {
  TITLE = "title",
  DESCRIPTION = "description",
  TYPE = "type",
  LOCATION = "location",
  DURATIONAUCTION = "durationAuction",
  CATEGORY = "category",
  STARTPRICE = "startPrice",
  WINBID = "winbid",
}
