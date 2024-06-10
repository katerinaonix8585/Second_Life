import { useState } from "react";
import { MdOutlineCalendarMonth, MdOutlineLocationCity } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FiType } from "react-icons/fi";
import { FaEuroSign } from "react-icons/fa";
import { Link } from "react-router-dom";

import { OfferData } from "store/redux/offer/types.ts";
import { useAppSelector } from "store/hooks.ts";
import { locationsDataSliceSelectors } from "store/redux/location/locationSlice.ts";
import { categorysDataSliceSelectors } from "store/redux/category/categorySlice.ts";
import { typeOfferData } from "pages/CreateOffer/OffersData.ts";

import { Container } from "../../pages/Layout/styles.ts";
import Button from "../Button/Button.tsx";

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
  Category,
  Type00,
  Type01,
  Type02,
  PriceContainer,
  ButtonWrapper,
} from "./style.ts";

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

  const gettypeOfferById = (id: number) => {
    const typeOffer = typeOfferData.find((cat) => cat.id === id);
    return typeOffer ? typeOffer.value : "Unknown Location";
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
              <Link
                to={`/offers/${offer.id}`}
                style={{ textDecoration: "none" }}
              >
                <Title>{offer.title}</Title>
              </Link>
              <Description style={{ color: "black" }}>
                {offer.description}
              </Description>
              <Category style={{ color: "black" }}>
                <BiCategory />
                {getCategoryNameById(offer.categoryId)}
              </Category>
              <Location style={{ color: "black" }}>
                <MdOutlineLocationCity />
                {getLocationNameById(offer.locationId)}
              </Location>
              <StyledDate style={{ color: "black" }}>
                <MdOutlineCalendarMonth />
                {formatDate(offer.endAt)}
              </StyledDate>
              {offer.isFree ? (
                <Type00>
                  <FiType /> {gettypeOfferById(0)}
                </Type00>
              ) : offer.winBid === null ? (
                <Type01>
                  <FiType />
                  {gettypeOfferById(1)}
                </Type01>
              ) : (
                <Type02>
                  <FiType />
                  {gettypeOfferById(2)}: {offer.winBid}{" "}
                  <FaEuroSign size={16} color="blue" />
                </Type02>
              )}
            </DescriptionContainer>
            <ButtonWrapper>
              {offer.isFree === true ? (
                <PriceContainer>Free</PriceContainer>
              ) : (
                <PriceContainer>
                  {offer.startPrice}
                  <FaEuroSign size={24} color="green" />
                </PriceContainer>
              )}
              <ButtonContainer>
                <Button name="Apply" />
                {renderBuyoutButton(offer.winBid)}
              </ButtonContainer>
            </ButtonWrapper>
          </OfferCardContainer>
        </Container>
      ))}
    </OfferCardWrapper>
  );
}

export default OfferCardCopy;
