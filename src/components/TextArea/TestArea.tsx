import { InputProps } from "./types";
import {
  InputComponentContainer,
  InputWrapper,
  ErrorMessage,
  InputLabel,
  TextAreaContent,
} from "./styles";

function TextArea({
  name,
  placeholder,
  label,
  onInputChange,
  value,
  error,
  onBlur,
}: InputProps) {
  return (
    <InputComponentContainer>
      <InputWrapper>
        <InputLabel>{label}</InputLabel>
        <TextAreaContent
          name={name}
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

export default TextArea;
