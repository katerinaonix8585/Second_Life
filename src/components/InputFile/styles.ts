import styled from "@emotion/styled";

export const CustomFileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const StyledLabel = styled.label`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const FileName = styled.div`
  margin-top: 10px;
  color: #6f6f6f;
  font-size: 14px;
`;

export const ButtonWrapper = styled.div`
  width: 200px;
  padding: 0px 0 10px 0;
`;
