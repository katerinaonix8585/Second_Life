import styled from "@emotion/styled";

interface ButtonComponentProps {
  disabled: boolean;
  background: string;
}

export const ButtonComponent = styled.button<ButtonComponentProps>`
  width: 100%;
  height: 60px;
  outline: none;
  border: none;
  border-radius: 20px;
  padding: 20px;
  background: ${({ disabled, background }) => (disabled ? "grey" : background)};
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  font-family: "LibreFranklin", sans-serif;
`;
