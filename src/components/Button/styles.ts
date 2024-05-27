import styled from "@emotion/styled";
interface ButtonComponent {
  disabled: boolean;
}

export const ButtonComponent = styled.button<ButtonComponent>`
  width: auto;
  height: 60px;
  outline: none;
  border: none;
  border-radius: 20px;
  padding: 20px;
  background: ${({ disabled }) => (disabled ? "grey" : "#4d418b")};
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  font-family: "LibreFranklin", sans-serif;
`;
