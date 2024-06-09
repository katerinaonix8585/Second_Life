import styled from "@emotion/styled";

export const CategoryPageWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  font-family: "DM Sans", sans-serif;
`;

export const OffersWrapper = styled.div`
  justify-content: center;
  display: flex;
  margin: 30px 0;
  flex-wrap: wrap;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const PaginationButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #56119c;
  background-color: #fff;
  color: #56119c;
  &:hover {
    background-color: #56119c;
    color: #fff;
  }
`;

export const Tile = styled.div`
  font-size: 30px;
  color: #56119c;
  font-family: "LXGW WenKai TC", cursive;
  font-weight: bold;
`;
