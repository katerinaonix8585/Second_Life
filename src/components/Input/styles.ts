import styled from "@emotion/styled";

import { InputComponentProps } from "./types";

export const PasswordInput = styled.input<InputComponentProps>`
  width: 100%;
  height: 50px;
  padding: 12px 12px 12px 20px;
  outline: none;
  border: 1px solid ${(props) => (props.error ? "red" : "white")};
  border-radius: 20px;
  font-size: 16px;
  font-family: "LibreFranklin", sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: #6f6f6f;
  }

  &:focus {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: #000 !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const InputComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: fit-content;
`;

export const InputLabel = styled.label`
  font-size: 16px;
  padding-left: 15px;
  color: #56119c;
  font-weight: bold;
  font-family: "LibreFranklin", sans-serif;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  align-items: start;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 16px;
  height: 18px;
`;
