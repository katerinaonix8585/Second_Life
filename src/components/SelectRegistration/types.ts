import { ChangeEvent, FocusEvent, ReactNode } from "react";

export interface SelectProps {
  name: string,
  type?: string,
  placeholder: string,
  label?: string,
  onInputChange: (event: ChangeEvent<HTMLSelectElement>) => void,
  value: string;
  error?: string | undefined;
  onBlur?: (e: FocusEvent<any, Element>) => void,
  icon?: ReactNode; 
  options?: { value: string; label: string }[]; 
}
