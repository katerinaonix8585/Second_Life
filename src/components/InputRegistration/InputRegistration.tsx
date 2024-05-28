import { ErrorMessage, InputComponent, InputComponentContainer, InputWrapper, Icon } from "./styles";
import { InputProps } from "./types";

function InputRegistration({ name, type = "text", placeholder, onInputChange, value, error, onBlur, icon }: InputProps) {
  return (
    <InputComponentContainer>
      <InputWrapper>
        {icon && <Icon>{icon}</Icon>}
        <InputComponent
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onInputChange}
          value={value}
          onBlur={onBlur}
        />
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputComponentContainer>
  );
}

export default InputRegistration;
