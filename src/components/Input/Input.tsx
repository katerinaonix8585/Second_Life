import { InputProps } from "./types";
import {
  InputComponentContainer,
  InputWrapper,
  ErrorMessage,
  PasswordInput,
  InputLabel,
} from "./styles";

function Input({
  name,
  placeholder,
  label,
  onInputChange,
  value,
  error,
  onBlur,
  height,
  required = false,
}: InputProps) {
  return (
    <InputComponentContainer>
      <InputWrapper>
        <InputLabel htmlFor={name}>
          {label}
          {required && <span style={{ color: "red" }}> *</span>}
        </InputLabel>
        <PasswordInput
          id={name}
          name={name}
          type={"text"}
          placeholder={placeholder}
          onChange={onInputChange}
          value={String(value)}
          error={error}
          onBlur={onBlur}
          height={height}
        />
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputComponentContainer>
  );
}

export default Input;
