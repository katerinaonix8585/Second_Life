export interface OfferCardDataProps {
  title: string;
  image: string;
  description: string;
  location: string;
  data: string;
  typeOffer: string;
  is_active: boolean;
  is_free: boolean;
  start_price: null | number;
  step: null | number;
  win_bid: null | number;
}
