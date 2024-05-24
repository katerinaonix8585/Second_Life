import styled from "@emotion/styled";
interface ButtonComponent {
  disabled: boolean
}

export const ButtonComponent = styled.button<ButtonComponent>`
  width: 100%;
  height: 70px;
  outline: none;
  border: none;
  border-radius: 40px;
  padding: 20px;  
  background: ${({disabled})=>disabled?"grey" : "#4d418b"};
  color: white;
  font-size: 16px;
  cursor: pointer;
`;
