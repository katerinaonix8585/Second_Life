import { v4 } from "uuid";
import { useState } from "react";
import { MdOutlineCalendarMonth, MdOutlineLocationCity } from "react-icons/md";

import Button from "../Button/Button.tsx";
import { Container } from "../../pages/Layout/styles.ts";

import {
  ButtonContainer,
  Description,
  Image,
  ImgContainer,
  OfferCardContainer,
  OfferCardWrapper,
  Title,
  Location,
  Date,
  DescriptionContainer,
  Type,
} from "./style.ts";
import { offerCardData } from "./OfferCardData.ts";
import { OfferCardDataProps } from "./types.ts";

function OfferCard() {
  const [isClicked, setIsClicked] = useState(false);

  const renderBuyoutButton = (winBid: null | number) =>
    winBid !== null ? (
      <Button
        name="Buyout"
        onButtonClick={() => setIsClicked(true)}
        disabled={isClicked}
      />
    ) : null;

  return (
    <OfferCardWrapper>
      {offerCardData.map((offerCardItem: OfferCardDataProps) => (
        <Container key={v4()}>
          <OfferCardContainer>
            <ImgContainer>
              <Image src={offerCardItem.image} />
            </ImgContainer>
            <DescriptionContainer>
              <Title>{offerCardItem.title}</Title>
              <Description style={{ color: "black" }}>
                {offerCardItem.description}
              </Description>
              <Location style={{ color: "black" }}>
                <MdOutlineLocationCity />
                {offerCardItem.location}
              </Location>
              <Date style={{ color: "black" }}>
                <MdOutlineCalendarMonth />
                {offerCardItem.data}
              </Date>
              <Type>{offerCardItem.typeOffer}</Type>
            </DescriptionContainer>
            <ButtonContainer>
              <Button name="Apply" />
              {renderBuyoutButton(offerCardItem.win_bid)}
            </ButtonContainer>
          </OfferCardContainer>
        </Container>
      ))}
    </OfferCardWrapper>
  );
}

export default OfferCard;
