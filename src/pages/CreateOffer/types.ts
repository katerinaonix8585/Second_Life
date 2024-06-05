import { CategoryData } from "components/CategoryCard/types";
import { LocationData } from "pages/Layout/types";

export interface TypeOfferData {
  id: number | null;
  value: string;
  selectedData?: { id: number; name: string };
}

export interface OfferFormValues {
  title: string;
  description: string;
  type: TypeOfferData | null;
  durationAuction?: number;
  category: CategoryData | null;
  location: LocationData | null;
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
