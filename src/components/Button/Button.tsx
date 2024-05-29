import { ButtonComponent } from "./styles";
import { ButtonProps } from "./types";

function Button({
  name,
  type = "button",
  disabled = false,
  background = "#4d418b",
  onButtonClick,
}: ButtonProps) {
  return (
    <ButtonComponent
      disabled={disabled}
      background={background}
      type={type}
      onClick={onButtonClick}
    >
      {name}
    </ButtonComponent>
  );
}

export default Button;
