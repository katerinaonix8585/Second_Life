import styled from "@emotion/styled";

export const OfferCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  place-items: center;
`;

export const OfferCardContainer = styled.div`
  background-color: #dcdcdc30;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  height: 100%;
  width: 100%;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: bold;
  flex-direction: column;
`;

export const ImgContainer = styled.div``;

export const Image = styled.img`
  width: 200px;
  height: 200px;
`;

export const Description = styled.p``;

export const ButtonContainer = styled.div`
  width: 150px;
`;
