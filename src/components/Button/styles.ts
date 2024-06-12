import styled from "@emotion/styled";

interface ButtonComponentProps {
  disabled: boolean;
  background: string;
  isAdminButton: boolean;
}

export const ButtonComponent = styled.button<ButtonComponentProps>`
  width: 100%;
  outline: none;
  border: none;
  padding: 20px;
  background: ${({ disabled, background }) => (disabled ? "grey" : background)};
  border-radius: ${({ isAdminButton }) => (isAdminButton ? "10px" : "20px")};
  background-color: ${({ isAdminButton }) =>
    isAdminButton ? "white" : "default"};
  color: ${({ isAdminButton }) => (isAdminButton ? "#4d418b" : "white")};
  height: ${({ isAdminButton }) => (isAdminButton ? "50px" : "60px")};
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  font-family: "DM Sans", sans-serif;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.5;
`;
