import { InputProps } from "./types";
import {
  InputComponentContainer,
  InputWrapper,
  ErrorMessage,
  PasswordInput,
  IconWrapper,
  InputLabel,
} from "./styles";

function InputWithIcon({
  iconDisable,
  name,
  placeholder,
  label,
  onInputChange,
  value,
  error,
  onBlur,
  icon,
}: InputProps) {
  return (
    <InputComponentContainer>
      <InputWrapper>
        <InputLabel>{label}</InputLabel>
        <IconWrapper>{iconDisable && icon}</IconWrapper>
        <PasswordInput
          name={name}
          type={"text"}
          placeholder={placeholder}
          onChange={onInputChange}
          value={value}
          error={error}
          onBlur={onBlur}
        />
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputComponentContainer>
  );
}

export default InputWithIcon;
