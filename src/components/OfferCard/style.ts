import styled from "@emotion/styled";

export const OfferCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  gap: 30px;
`;

export const OfferCardContainer = styled.div`
  background-color: #dcdcdc30;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  height: 100%;
  width: 1270px;
  align-items: center;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: bold;
  justify-content: space-between;
`;

export const ImgContainer = styled.div``;

export const Image = styled.img`
  width: 200px;
  height: 200px;
`;

export const DescriptionContainer = styled.div`
  gap: 18px;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  color: #56119c;
  font-family: "DM Sans", sans-serif;
  width: 700px;
`;

export const TitleContainer = styled.div``;

export const Title = styled.h3``;

export const Description = styled.h5``;

export const Location = styled.h5`
  gap: 5px;
  display: flex;
  align-items: center;
`;

export const Date = styled.h5`
  gap: 5px;
  display: flex;
  align-items: center;
`;

export const Type = styled.h4``;

export const ButtonContainer = styled.div`
  width: 140px;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;
