import { ReactNode } from "react";

interface LocationData {
  label: string;
  value: string;
  index: number;
}

export interface LocationDataProps {
  locationData: LocationData;
}

export interface SelectProps {
  options: LocationDataProps[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon?: ReactNode;
  iconDisable?: boolean;
  defaultIndex?: number;
}
