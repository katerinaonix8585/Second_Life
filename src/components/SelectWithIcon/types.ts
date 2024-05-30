import { Key, ReactNode } from "react";

interface SelectData<T> {
  index?: number;
  label: string;
  value: T;
}

export interface SelectDataProps<T> {
  selectData: SelectData<T>;
}

export interface SelectProps<T extends Key> {
  options: SelectDataProps<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder: string;
  icon?: ReactNode;
  iconDisable?: boolean;
  defaultIndex?: number;
}
