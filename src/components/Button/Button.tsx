import { ButtonComponent } from "./styles";
import { ButtonProps } from './types';

function Button({ name, type = "button", disabled=false, onButtonClick }: ButtonProps) {
  return (
    <ButtonComponent disabled={disabled} type={type} onClick={onButtonClick}>
      {name}
    </ButtonComponent>
  );
}

export default Button;
