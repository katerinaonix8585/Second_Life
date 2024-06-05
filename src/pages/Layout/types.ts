import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface LocationData {
  id: number;
  value: string;
  selectedData?: { id: number; value: string };
}
