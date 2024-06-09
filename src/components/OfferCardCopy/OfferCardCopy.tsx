import { useState } from "react";
import { MdOutlineCalendarMonth, MdOutlineLocationCity } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FiType } from "react-icons/fi";

import { OfferData } from "store/redux/offer/types";
import { useAppSelector } from "store/hooks.ts";
import { locationsDataSliceSelectors } from "store/redux/location/locationSlice.ts";
import { categorysDataSliceSelectors } from "store/redux/category/categorySlice.ts";

import { Container } from "../../pages/Layout/styles.ts";
import Button from "../Button/Button";

import {
  ButtonContainer,
  Description,
  ImgContainer,
  OfferCardContainer,
  OfferCardWrapper,
  Title,
  Location,
  StyledDate,
  DescriptionContainer,
  Image,
} from "./style";

function OfferCardCopy({ offers }: { offers: OfferData[] }) {
  const [isClicked, setIsClicked] = useState(false);

  const renderBuyoutButton = (winBid: null | number) =>
    winBid !== null ? (
      <Button
        name="Buyout"
        onButtonClick={() => setIsClicked(true)}
        disabled={isClicked}
      />
    ) : null;

  const locationsDataSlice = useAppSelector(
    locationsDataSliceSelectors.location,
  );
  const locationsData = locationsDataSlice.data;

  const getLocationNameById = (id: number) => {
    const location = locationsData.find((loc) => loc.id === id);
    return location ? location.name : "Unknown Location";
  };

  const categorysDataSlice = useAppSelector(
    categorysDataSliceSelectors.category,
  );
  const categoriesData = categorysDataSlice.data;

  const getCategoryNameById = (id: number) => {
    const category = categoriesData.find((cat) => cat.id === id);
    return category ? category.name : "Unknown Location";
  };

  const formatDate = (dateInput: string | Date) => {
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString();
  };

  return (
    <OfferCardWrapper>
      {offers.map((offer) => (
        <Container key={offer.id}>
          <OfferCardContainer>
            <ImgContainer>
              <Image />
            </ImgContainer>
            <DescriptionContainer>
              <Title>{offer.title}</Title>
              <Description style={{ color: "black" }}>
                {offer.description}
              </Description>
              <Location style={{ color: "black" }}>
                <BiCategory />
                {getLocationNameById(offer.locationId)}
              </Location>
              <Location style={{ color: "black" }}>
                <MdOutlineLocationCity />
                {getCategoryNameById(offer.categoryId)}
              </Location>
              <StyledDate style={{ color: "black" }}>
                <MdOutlineCalendarMonth />
                {formatDate(offer.endAt)}
              </StyledDate>
              <Location>
                <FiType />
                {offer.isFree
                  ? "Free Offer"
                  : offer.winBid === null
                    ? "Offer + Auction"
                    : "Offer + Auction with Win Bid"}
              </Location>
            </DescriptionContainer>
            <ButtonContainer>
              <Button name="Apply" />
              {renderBuyoutButton(offer.winBid)}
            </ButtonContainer>
          </OfferCardContainer>
        </Container>
      ))}
    </OfferCardWrapper>
  );
}

export default OfferCardCopy;
