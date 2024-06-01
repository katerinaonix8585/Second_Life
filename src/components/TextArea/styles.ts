import styled from "@emotion/styled";

import { InputComponentProps } from "./types";

export const TextAreaContent = styled.textarea<InputComponentProps>`
  width: 100%;
  height: 100%;
  padding: 12px 12px 12px 20px;
  outline: none;
  border: 1px solid ${(props) => (props.error ? "red" : "white")};
  border-radius: 20px;
  font-size: 16px;
  font-family: "LibreFranklin", sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  resize: vertical;

  &::placeholder {
    color: #6f6f6f;
  }

  &:focus {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const InputComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 100%;
`;

export const InputLabel = styled.label`
  font-size: 16px;
  color: #6f6f6f;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 16px;
  height: 18px;
`;
