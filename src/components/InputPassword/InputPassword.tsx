import { RiLockPasswordLine } from "react-icons/ri";
import styled from "@emotion/styled";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

import { InputProps } from "./types";
import {
  InputComponentContainer,
  InputWrapper,
  ErrorMessage,
  PasswordInput,
  PasswordVisibilityToggle,
  IconWrapper,
} from "./styles";

const LockIcon = styled(RiLockPasswordLine)``;

function InputPassword({
  iconDisable,
  name,
  placeholder,
  onInputChange,
  value,
  error,
  onBlur,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputComponentContainer>
      <InputWrapper>
        {/* <InputLabel>{label}</InputLabel> */}
        <IconWrapper>{iconDisable && <LockIcon />}</IconWrapper>
        <PasswordInput
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          onChange={onInputChange}
          value={value}
          error={error}
          onBlur={onBlur}
        />
        <PasswordVisibilityToggle
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <HiEye /> : <HiEyeOff />}
        </PasswordVisibilityToggle>
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputComponentContainer>
  );
}

export default InputPassword;
