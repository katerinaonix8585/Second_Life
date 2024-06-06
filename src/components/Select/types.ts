import { ReactNode } from "react";

interface SelectData<T> {
  index?: number;
  // label: string;
  value: T | undefined;
}

export interface SelectDataProps<T> {
  selectData: SelectData<T>;
}

export interface SelectProps<T extends React.Key> {
  label?: string;
  name: string;
  options: SelectDataProps<T>[];
  value: T | undefined;
  onChange: (value: T | undefined) => void;
  placeholder?: string;
  icon?: ReactNode;
  error?: string | undefined;
  iconDisable?: boolean;
  defaultIndex?: number;
  borderRadius?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  height?: string;
}
