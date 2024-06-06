import styled from "@emotion/styled";

export const SelectComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  width: 100%;
  height: 100%;
`;

export const InputLabel = styled.label`
  font-size: 16px;
  padding: 20px;
  color: #56119c;
  font-weight: bold;
  font-family: "LibreFranklin", sans-serif;
`;

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const LabelContainer = styled.div`
  width: 100%;
  padding-bottom: 10px;
`;

export const SelectWrapper = styled.div<{
  hasError: string;
  borderRadius: string;
  height: string;
}>`
  position: relative;
  display: flex;
  height: ${({ height }) => height};
  align-items: center;
  padding: 0 20px;
  background-color: white;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "white")};
  border-radius: ${({ borderRadius }) => borderRadius};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const SelectLabel = styled.span`
  flex-grow: 1;
  font-family: "DM Sans", sans-serif;
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 16px;
  cursor: pointer;
`;

export const OptionsList = styled.ul<{ borderRadius: string }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  max-height: 280px;
  overflow-y: auto;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: ${({ borderRadius }) => borderRadius};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 10;
`;

export const OptionItem = styled.li`
  padding: 10px 20px;
  font-family: "LibreFranklin", sans-serif;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
