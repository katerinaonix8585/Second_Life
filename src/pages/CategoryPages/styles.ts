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

export const Tile = styled.div`
  font-size: 30px;
  color: #56119c;
  font-family: "LXGW WenKai TC", cursive;
  font-weight: bold;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  align-items: center;
`;

export const PaginationButton = styled.button`
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  background-color: #fff;
  color: #56119c;
  border: none;
  &:hover {
    background-color: #56119c;
    color: #fff;
  }
`;

export const PaginationCurrentButton = styled.button`
  padding: 10px 20px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  background-color: #fff;
  color: #56119c;
  border: none;
  &:hover {
    background-color: #56119c;
    color: #fff;
  }
`;

export const PaginationEllipsis = styled.span`
  margin: 0 5px;
  font-size: 16px;
`;

export const TileLeer = styled.div`
  font-size: 16px;
  font-family: "LXGW WenKai TC", cursive;
  padding-left: 60px;
`;
