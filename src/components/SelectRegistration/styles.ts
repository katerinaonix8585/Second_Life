import styled from "@emotion/styled";

export const SelectComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: fit-content;    
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;  
  align-items: center;
`;

export const Icon = styled.div`
  position: absolute;
  left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const SelectComponent = styled.select`  
  width: 100%;
  height: 50px;
  padding: 12px 12px 20px 50px;   
  outline: none;
  border: 1px solid white;
  border-radius: 20px;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: #6f6f6f;
  }

  &:focus {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 16px;
  height: 18px;
`;