/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEuroSign } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { FiType } from "react-icons/fi";
import { MdOutlineLocationCity, MdOutlineCalendarMonth } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { locationsDataSliceSelectors } from "store/redux/location/locationSlice";
import { categorysDataSliceSelectors } from "store/redux/category/categorySlice";
import { typeOfferData } from "pages/CreateOffer/OffersData";
import { offerDataSliceActions } from "store/redux/offer/offer";
import { OfferData } from "store/redux/offers/types";
import {
  Category,
  StyledDate,
  Type00,
  Type01,
  Type02,
} from "components/OfferCard/style";
import Button from "components/Button/Button";

import {
  DescriptionContainer,
  Img,
  ImgContainer,
  OfferInfoWrapper,
  OfferTextAreaWrapper,
  OfferTitleWrapper,
  OfferUpWrapper,
  OfferWrapper,
  Location,
  PriceContainer,
  TextAreaWrapper,
  Tile,
  ButtonContainer,
  ButtonWrapper,
  NumberInput,
  NumberContainer,
  ContainerButton,
  BidAreaWrapper,
  InputContainer,
  TextContainer,
  ContainerBidButton,
} from "./styles";

function ViewOffer() {
  const navigate = useNavigate();
  const { offersId } = useParams<{ offersId?: string }>();
  const [offerData, setOfferData] = useState<OfferData | null>(null);
  const [isClickedCreateBid, setisClickedCreateBid] = useState(false);
  const [isClickedBurout, setisClickedBurout] = useState(false);
  const [value, setValue] = useState<number | string>("");

  console.log(value);

  const dispatch = useAppDispatch();

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (
      /^\d*\.?\d{0,2}$/.test(inputValue) &&
      offerData &&
      offerData.step !== null &&
      offerData.step !== undefined
    ) {
      const parsedValue = parseFloat(inputValue.replace(",", "."));
      const stepStr =
        typeof offerData.step === "number" ? offerData.step.toString() : "";
      const stepParts = stepStr.split(".");
      const stepDecimal = stepParts[1] ? parseFloat("." + stepParts[1]) : 0;
      setValue(parsedValue - 1 + parseFloat(stepParts[0]) + stepDecimal);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

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

  const renderBuyoutButton = (winBid: null | number) =>
    winBid !== null ? (
      <Button
        name="Buyout"
        onButtonClick={() => setisClickedBurout(true)}
        disabled={isClickedBurout}
      />
    ) : null;

  const [currentPrice, setCurrentPrice] = useState<number | null>(
    offerData?.startPrice ?? null,
  );

  useEffect(() => {
    if (offerData?.startPrice !== null && offerData?.startPrice !== undefined) {
      setCurrentPrice(offerData.startPrice);
      setValue(offerData.startPrice.toString());
    }
  }, [offerData]);

  const renderBidArea = (isFree?: boolean) =>
    isFree !== undefined && !isFree ? (
      <NumberContainer>
        <TextContainer>Place your bid. Step {offerData?.step}</TextContainer>
        <InputContainer>
          <NumberInput
            type="number"
            value={
              value !== undefined
                ? value
                : currentPrice !== null
                  ? currentPrice
                  : ""
            }
            onChange={handleChangeInput}
          />
          <Button
            name="Create Bid"
            onButtonClick={() => setisClickedCreateBid(true)}
            disabled={isClickedCreateBid}
          />
        </InputContainer>
      </NumberContainer>
    ) : null;

  useEffect(() => {
    if (offersId) {
      dispatch(offerDataSliceActions.getOfferById(offersId));
    }
  }, [dispatch, offersId]);

  useEffect(() => {
    console.log("Component mounted with offerId:", offersId);
    if (offersId) {
      dispatch(offerDataSliceActions.getOfferById(offersId))
        .then((response) => {
          console.log("getOfferById response:", response);
          setOfferData(response.payload);
        })
        .catch((error) => {
          console.error("getOfferById error:", error);
        });
    }
  }, [dispatch, offersId]);

  return (
    <OfferWrapper>
      <OfferUpWrapper>
        <OfferTitleWrapper>
          <Tile>{offerData?.title || ""}</Tile>
          {offerData?.isFree ? (
            <PriceContainer>Free</PriceContainer>
          ) : (
            <PriceContainer>
              {offerData?.startPrice}
              <FaEuroSign size={24} color="green" />
            </PriceContainer>
          )}
        </OfferTitleWrapper>
        <OfferInfoWrapper>
          <ImgContainer>
            <Img />
          </ImgContainer>
          <OfferTextAreaWrapper>
            <TextAreaWrapper>{offerData?.description || ""}</TextAreaWrapper>
          </OfferTextAreaWrapper>
        </OfferInfoWrapper>
        <BidAreaWrapper>
          <DescriptionContainer>
            <Category>
              <BiCategory />
              {offerData ? getCategoryNameById(offerData.categoryId) : ""}
            </Category>
            <Location>
              <MdOutlineLocationCity />
              {offerData ? getLocationNameById(offerData.locationId) : ""}
            </Location>
            <StyledDate style={{ color: "black" }}>
              <MdOutlineCalendarMonth />
              {offerData ? formatDate(offerData.endAt) : ""}
            </StyledDate>
            {offerData ? (
              offerData.isFree ? (
                <Type00>
                  <FiType /> {gettypeOfferById(0)}
                </Type00>
              ) : offerData.winBid === null ? (
                <Type01>
                  <FiType />
                  {gettypeOfferById(1)}
                </Type01>
              ) : (
                <Type02>
                  <FiType />
                  {gettypeOfferById(2)}: {offerData.winBid}{" "}
                  <FaEuroSign size={16} color="blue" />
                </Type02>
              )
            ) : (
              ""
            )}
          </DescriptionContainer>
          <ContainerBidButton>
            {renderBidArea(offerData?.isFree)}
          </ContainerBidButton>
        </BidAreaWrapper>
        <ButtonWrapper>
          <ButtonContainer>
            <ContainerButton>
              <Button name="Apply" />
            </ContainerButton>
            <ContainerButton>
              {renderBuyoutButton(offerData?.winBid ?? null)}
            </ContainerButton>
            <ContainerButton>
              <Button
                type="button"
                background="#EE4266"
                name="Cancel"
                onButtonClick={handleCancel}
              />
            </ContainerButton>
          </ButtonContainer>
        </ButtonWrapper>
      </OfferUpWrapper>
    </OfferWrapper>
  );
}

export default ViewOffer;
