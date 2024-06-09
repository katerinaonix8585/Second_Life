import { ChangeEvent, FocusEvent, ReactNode } from "react";

export interface InputComponentProps {
  error?: string;
}

export interface InputProps {
  iconDisable?: boolean;
  name: string;
  placeholder: string;
  label?: string;
  onInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  error?: string | undefined;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  icon?: ReactNode;
  onClick?: () => void;
  onFocus?: () => void;
  required?: boolean;
}
