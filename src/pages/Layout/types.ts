import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface LocationData {
  label: string;
  value: string;
  index: number;
}

export interface LocationDataProps {
  locationData: LocationData;
}
