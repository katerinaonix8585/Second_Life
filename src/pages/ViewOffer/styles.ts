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
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1270px;
  gap: 20px;
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

export const OfferInfoContainer = styled.div`
  width: 100%;
`;

export const OfferTitleInfoContainer = styled.div`
  width: 100%;
`;

export const OfferTitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px 0 30px;
`;

export const OfferInfoOfferContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 20px 20px 0;
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

export const OfferInfoImageContainer = styled.div`
  width: 40%;
  height: auto;
  display: flex;
  justify-content: left;
`;

export const OfferInfoTextContainer = styled.div`
  width: 100%;
`;

export const OfferTextAreaWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 300px;
  border: 2px solid black;
  border-radius: 20px;
`;

export const TextAreaWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  padding: 20px;
  font-size: 20px;
  font-style: italic;
  font-family: "DM Sans", sans-serif;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  padding: 20px;
  resize: none;
  /* pointer-events: none; */
  background-color: #f9f9f9;
  font-size: 20px;
  font-style: italic;
  font-family: "DM Sans", sans-serif;
`;

export const OfferInfoWrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
`;

export const OfferInfoOfferWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const OfferInfoPriceWrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ContainerInfo = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  font-family: "LXGW WenKai TC", cursive;
  color: #4d418b;
  font-weight: 700;
  font-size: 18px;
`;

export const ContainerInfoPrice = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  font-family: "LXGW WenKai TC", cursive;
  color: #7b001c;
  font-weight: 700;
  font-size: 18px;
`;

export const ContainerInfoParticipant = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  font-family: "LXGW WenKai TC", cursive;
  color: #0a5f38;
  font-weight: 700;
  font-size: 18px;
`;

export const Type00 = styled.p`
  gap: 5px;
  display: flex;
  align-items: center;
  color: red;
`;

export const Type01 = styled.p`
  gap: 5px;
  display: flex;
  align-items: center;
  color: green;
`;

export const Type02 = styled.p`
  gap: 5px;
  display: flex;
  align-items: center;
  color: blue;
`;

export const ContainerInfoCommon = styled.div`
  width: 100%;
  padding: 20px 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ContainerInfoNoFree = styled.div`
  width: 100%;
  padding: 0 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-family: "LXGW WenKai TC", cursive;
  color: #4d418b;
  font-weight: 700;
  font-size: 18px;
`;

export const OfferButtonWrapper = styled.div`
  width: 100%;
  /* border: 2px solid black; */
  display: flex;
  /* gap: 400px; */
  padding: 30px 30px 30px 70px;
  justify-content: flex-end;
  align-items: center;
`;

export const ButtonWinBidContainer = styled.div`
  width: 200px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

export const ButtonEditContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: flex-end;
  justify-content: end;
`;

export const ButtonContainer = styled.div`
  width: 200px;
  display: flex;
  gap: 20px;
  align-items: flex-end;
  justify-content: end;
`;

export const ButtonBidContainer = styled.div`
  width: 1000px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: end;
`;

export const ButtonFreeContainer = styled.div`
  width: 400px;
  display: flex;
  gap: 20px;
  align-items: flex-end;
  justify-content: end;
`;

export const ButtonCommonContainer = styled.div`
  width: 200px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: end;
`;

export const NewPriceArea = styled.div`
  border: 2px solid black;
`;

export const PriceStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: end;
  padding: 0 20px 0 0;
`;

export const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  color: blue;
  align-items: center;
  font-family: "LXGW WenKai TC", cursive;
  font-weight: bold;
  font-size: 20px;
`;

export const BidsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`;

export const BidsContainerOneBid = styled.div`
  display: flex;
  gap: 10px;
`;

export const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;
