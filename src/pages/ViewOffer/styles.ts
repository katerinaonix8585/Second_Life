import styled from "@emotion/styled";

import { defaultImage } from "../../assets/images/index.ts";

export const OfferWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  padding-bottom: 20px;
`;

export const OfferUpWrapper = styled.div`
  margin-top: 20px;
  padding-bottom: 20px;
  background-color: #dcdcdc30;
  border-radius: 20px;
  border: 1px solid #0000000d;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1270px;
  gap: 20px;
`;

export const OfferImageWrapper = styled.div`
  width: 40%;
  height: auto;
  display: flex;
  justify-content: left;
  padding: 0 20px 0 10px;
`;

export const OfferTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: left;
  padding: 20px 0 0 20px;
`;

export const OfferText = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: #56119c;
  font-family: "LibreFranklin", sans-serif;
`;

export const OfferSelectWrapper = styled.div`
  display: flex;
  width: 50%;
  justify-content: left;
  padding: 10px 10px 0 15px;
`;

export const OfferButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: right;
  padding-right: 20px;
`;

export const OfferButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
  width: 50%;
`;

export const OfferButtonWrapper = styled.div`
  width: 200px;
`;

export const Tile = styled.div`
  font-size: 30px;
  color: #56119c;
  font-family: "LXGW WenKai TC", cursive;
  font-weight: bold;
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  color: green;
  align-items: center;
  font-family: "LXGW WenKai TC", cursive;
  font-weight: bold;
  font-size: 26px;
`;

export const OfferTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 30px 0px 30px;
`;

export const ImgContainer = styled.div`
  padding: 0 0 0 15px;
`;

export const Img = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

Img.defaultProps = { src: defaultImage };

export const OfferTextAreaWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 300px;
  border: 2px solid black;
  border-radius: 20px;
`;

export const OfferInfoWrapper = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  height: 100%;
  justify-content: left;
  padding: 10px 15px 15px 10px;
`;

export const TextAreaWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: left;
  padding: 20px;
  font-size: 20px;
  font-style: italic;
  font-family: "DM Sans", sans-serif;
  width: 700px;
`;

export const DescriptionContainer = styled.div`
  gap: 18px;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-family: "DM Sans", sans-serif;
  width: 700px;
  padding: 0 0 0 45px;
`;

export const Category = styled.h5`
  gap: 5px;
  display: flex;
  align-items: center;
`;

export const Location = styled.h5`
  gap: 5px;
  display: flex;
  align-items: center;
  color: #49423d;
`;

export const StyledDate = styled.h5`
  gap: 5px;
  display: flex;
  align-items: center;
  color: #49423d;
`;

export const Type00 = styled.p`
  gap: 5px;
  display: flex;
  align-items: center;
  color: red;
  font-size: 16px !important;
`;

export const Type01 = styled.p`
  gap: 5px;
  display: flex;
  align-items: center;
  color: green;
  font-size: 16px !important;
`;

export const Type02 = styled.p`
  gap: 5px;
  display: flex;
  align-items: center;
  color: blue;
  font-size: 16px !important;
`;

export const ButtonContainer = styled.div`
  /* width: 140px; */
  display: flex;
  gap: 10px;
  /* flex-direction: column; */
  flex-grow: 1;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: end;
  padding: 20px;
`;

export const NumberInput = styled.input`
  width: 100%;
  height: 60px;
  border-radius: 15px;
  padding: 10px;
  font-size: 20px;
  font-family: "DM Sans", sans-serif;
`;

export const NumberContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

export const ContainerButton = styled.div`
  width: 200px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: end;
`;

export const ContainerBidButton = styled.div`
  width: 400px;
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

export const BidAreaWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 0;
`;

export const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

export const TextContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  font-size: 20px;
  color: #56119c;
  font-family: "LXGW WenKai TC", cursive;
  font-weight: bold;
`;
