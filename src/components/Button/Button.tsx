import { ButtonComponent } from "./styles";
import { ButtonProps } from "./types";

function Button({
  name,
  type = "button",
  disabled = false,
  background = "#4d418b",
  onButtonClick,
  isAdminButton = false,
}: ButtonProps) {
  return (
    <ButtonComponent
      disabled={disabled}
      background={background}
      type={type}
      onClick={onButtonClick}
      isAdminButton={isAdminButton}
    >
      {name}
    </ButtonComponent>
  );
}

export default Button;
