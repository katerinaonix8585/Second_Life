import { InputProps } from "./types";
import {
  InputComponentContainer,
  InputWrapper,
  ErrorMessage,
  InputLabel,
  TextAreaContent,
  LabelContainer,
} from "./styles";

function TextArea({
  name,
  placeholder,
  label,
  onInputChange,
  value,
  error,
  onBlur,
  required = false,
}: InputProps) {
  return (
    <InputComponentContainer>
      <InputWrapper>
        <LabelContainer>
          <InputLabel>
            {label}
            {required && <span style={{ color: "red" }}> *</span>}
          </InputLabel>
        </LabelContainer>
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
