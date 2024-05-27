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
  padding-top: 40px;
`;

export const CategoryTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 0 0 50px;
  width: auto;
`;

export const CategoryText = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: #56119c;
  font-family: "LibreFranklin", sans-serif;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 16px;
  width: auto;
  box-sizing: border-box;
`;
