import { CategoryCard } from "components/CategoryCard/types";
import { LocationData } from "pages/Layout/types";

export interface TypeOffer {
  id: number;
  name: string;
}

export interface OfferFormValues {
  title: string;
  description: string;
  type: TypeOffer;
  durationAuction?: number;
  category: CategoryCard;
  location: LocationData;
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
