import styled from "@emotion/styled";

export const CategoryPageWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CategoryWrapper = styled.div`
  width: auto;
  padding: 40px 0;
`;

export const CategoryTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0 20px 0;
  width: auto;
`;

export const CategoryText = styled.p`
  font-size: 30px;
  color: #56119c;
  font-family: "DM Sans", sans-serif;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 16px;
  width: auto;
  box-sizing: border-box;
`;
