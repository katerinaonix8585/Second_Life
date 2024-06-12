type ButtonType = "button" | "submit" | "reset" | undefined;

export interface ButtonProps {
  name: React.ReactNode;
  type?: ButtonType;
  disabled?: boolean;
  background?: string;
  onButtonClick?: () => void;
  onSubmit?: () => void;
  isAdminButton?: boolean;
}
