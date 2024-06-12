import { MdOutlineCalendarMonth, MdOutlineLocationCity } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FiType } from "react-icons/fi";
import { FaEuroSign } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GrStatusInfo } from "react-icons/gr";

import { OfferData } from "store/redux/offer/types.ts";
import { useAppDispatch, useAppSelector } from "store/hooks.ts";
import { locationsDataSliceSelectors } from "store/redux/location/locationSlice.ts";
import { categorysDataSliceSelectors } from "store/redux/category/categorySlice.ts";
import { typeOfferData } from "pages/CreateOffer/OffersData.ts";
import { offerDataSliceActions } from "store/redux/offer/offer.ts";

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
  LabelContainer,
  TextContainer,
  Status,
} from "./style.ts";

function OfferCardCopy({ offers }: { offers: OfferData[] }) {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const formatDate = (dateInput: string | Date | null) => {
    if (!dateInput) {
      return "Unknown date";
    }

    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;

    if (isNaN(date.getTime())) {
      return "Unknown date";
    }

    return date.toLocaleDateString();
  };

  const gettypeOfferById = (id: number) => {
    const typeOffer = typeOfferData.find((cat) => cat.id === id);
    return typeOffer ? typeOffer.value : "Unknown Location";
  };

  const handleCancelled = (offersId: number) => {
    dispatch(offerDataSliceActions.cancelledOfferById(String(offersId)))
      .then((response) => {
        console.log("rejectedOfferById response:", response);
      })
      .catch((error) => {
        console.error("rejectedOfferById error:", error);
      });
    navigate(`/offers/${offersId}`);
  };

  const handleBurout = (offersId: number) => {
    dispatch(offerDataSliceActions.burnoutOfferById(String(offersId)))
      .then((response) => {
        console.log("rejectedOfferById response:", response);
      })
      .catch((error) => {
        console.error("rejectedOfferById error:", error);
      });
    navigate(`/offers/${offersId}`);
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
                {formatDate(offer.auctionStartAt)}
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
              <Status>
                <GrStatusInfo />
                {offer.status}
              </Status>
            </DescriptionContainer>
            <ButtonWrapper>
              {offer.isFree === true ? (
                <PriceContainer>Free</PriceContainer>
              ) : (
                <LabelContainer>
                  <TextContainer>Current Price:</TextContainer>
                  <PriceContainer>
                    {offer.startPrice}
                    <FaEuroSign size={24} color="green" />
                  </PriceContainer>
                </LabelContainer>
              )}
              {userId !== null &&
              offer.ownerId !== null &&
              offer.ownerId === parseInt(userId) ? (
                // &&
                // (offer.status === "DRAFT" ||
                //   offer.status === "REJECTED" ||
                //   offer.status === "VERIFICATION" ||
                //   offer.status === "AUCTION_STARTED" ||
                //   offer.status === "QUALIFICATION")
                <ButtonContainer>
                  <Button
                    name="Cancel"
                    onButtonClick={() => handleCancelled(offer.id)}
                    background=" #0A5F38"
                  />
                </ButtonContainer>
              ) : (
                <>
                  {offer.isFree && (
                    // && offer.status === "AUCTION_STARTED"
                    <ButtonContainer>
                      <Button
                        name="Apply"
                        background=" #0A5F38"
                        onButtonClick={() => navigate(`/offers/${offer.id}`)}
                      />
                    </ButtonContainer>
                  )}
                  {!offer.isFree && (
                    // && offer.status === "AUCTION_STARTED"
                    <>
                      <ButtonContainer>
                        <Button
                          name="Apply"
                          background=" #0A5F38"
                          onButtonClick={() => navigate(`/offers/${offer.id}`)}
                        />
                      </ButtonContainer>
                      {offer.winBid !== null && (
                        <Button
                          name={
                            <>
                              <p>Buyout</p>
                              <p>{offer.winBid} €</p>{" "}
                            </>
                          }
                          onButtonClick={() => handleBurout(offer.id)}
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </ButtonWrapper>
          </OfferCardContainer>
        </Container>
      ))}
    </OfferCardWrapper>
  );
}

export default OfferCardCopy;
