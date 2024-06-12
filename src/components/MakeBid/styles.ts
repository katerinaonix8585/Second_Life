import styled from "@emotion/styled";

import { InputComponentProps } from "./types";

export const CounterWrapper = styled.div`
  width: 420px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  /* padding: 20px; */
  /* background: rgb(219, 210, 230); */
`;

export const ButtonControl = styled.div`
  width: 400px;
`;

export const CounterResult = styled.p`
  font-size: 32px;
  font-weight: bold;
  width: 50px;
`;

export const InputBid = styled.input<InputComponentProps>`
  width: 100%;
  height: 55px;
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

export const InputWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
