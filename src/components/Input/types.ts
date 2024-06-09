import { ChangeEvent, FocusEvent, ReactNode } from "react";

export interface InputComponentProps {
  error?: string;
}

export interface InputProps {
  iconDisable?: boolean;
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number | undefined | null;
  error?: string | undefined;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  icon?: ReactNode;
  onClick?: () => void;
  required?: boolean;
}
