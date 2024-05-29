import Button from "../Button/Button.tsx";
import { Container } from "../../pages/Layout/styles.ts";

import {
  ButtonContainer,
  Description,
  Image,
  ImgContainer,
  OfferCardContainer,
  OfferCardWrapper,
} from "./style.ts";
import { offerCardData } from "./OfferCardData.ts";
import { OfferCardProps } from "./types.ts";

function OfferCard() {
  return (
    <OfferCardWrapper>
      {offerCardData.map((offerCardItem: OfferCardProps) => (
        <Container>
          <OfferCardContainer>
            <ImgContainer>
              <Image src={offerCardItem.image} />
            </ImgContainer>
            <Description>{offerCardItem.description}</Description>
            <ButtonContainer>
              <Button name="" />
            </ButtonContainer>
          </OfferCardContainer>
        </Container>
      ))}
    </OfferCardWrapper>
  );
}

export default OfferCard;
