import { Key, ReactNode } from "react";

interface SelectData<T> {
  index?: number;
  label: string;
  value: T | undefined;
}

export interface SelectDataProps<T> {
  selectData: SelectData<T>;
}

export interface SelectProps<T extends Key> {
  label?: string;
  name: string;
  options: SelectDataProps<T>[];
  value: T | undefined;
  onChange: (value: T | undefined) => void;
  placeholder: string;
  icon?: ReactNode;
  iconDisable?: boolean;
  defaultIndex?: number;
}
