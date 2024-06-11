import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEuroSign, FaUser, FaUsers } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { MdOutlineLocationCity } from "react-icons/md";
import { FiType } from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { locationsDataSliceSelectors } from "store/redux/location/locationSlice";
import { categorysDataSliceSelectors } from "store/redux/category/categorySlice";
import { typeOfferData } from "pages/CreateOffer/OffersData";
import { offerDataSliceActions } from "store/redux/offer/offer";
import { OfferData } from "store/redux/offers/types";
import Button from "components/Button/Button";

import {
  OfferUpWrapper,
  OfferWrapper,
  OfferInfoContainer,
  OfferButtonWrapper,
  OfferInfoOfferContainer,
  OfferTitleContainer,
  OfferTitleInfoContainer,
  Tile,
  PriceContainer,
  OfferInfoImageContainer,
  OfferInfoTextContainer,
  ImgContainer,
  Img,
  TextAreaWrapper,
  OfferTextAreaWrapper,
  OfferInfoWrapper,
  OfferInfoOfferWrapper,
  OfferInfoPriceWrapper,
  ContainerInfo,
  Type00,
  Type01,
  Type02,
  ContainerInfoCommon,
  ContainerInfoNoFree,
  ContainerInfoParticipant,
  ButtonEditContainer,
  ButtonBidContainer,
  ButtonWinBidContainer,
} from "./styles";

function ViewOffer() {
  const navigate = useNavigate();
  const { offersId } = useParams<{ offersId?: string }>();
  const [offerData, setOfferData] = useState<OfferData | null>(null);
  const [isClickedBurout, setisClickedBurout] = useState(false);

  const dispatch = useAppDispatch();

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

  const formatDate = (dateInput?: string | Date) => {
    if (!dateInput) return "Unknown Date";
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  const gettypeOfferById = (id: number) => {
    const typeOffer = typeOfferData.find((cat) => cat.id === id);
    return typeOffer ? typeOffer.value : "Unknown Location";
  };

  const renderBuyoutButton = (
    winBid: null | number,
    ownerId: null | number,
  ) => {
    const userId = localStorage.getItem("userId");

    if (winBid !== null && userId !== null && ownerId === parseInt(userId)) {
      return (
        <ButtonWinBidContainer>
          <Button
            name="Buyout"
            onButtonClick={() => setisClickedBurout(true)}
            disabled={isClickedBurout}
          />
        </ButtonWinBidContainer>
      );
    } else {
      return null;
    }
  };

  const renderEditButton = (ownerId: null | number) => {
    const userId = localStorage.getItem("userId");

    if (userId !== null && ownerId !== null && ownerId === parseInt(userId)) {
      return (
        <ButtonEditContainer>
          <Button
            name="Edit"
            onButtonClick={() => navigate(`/offers/edit/${offersId}`)}
            disabled={isClickedBurout}
          />
          <Button
            type="button"
            background="#EE4266"
            name="Cancel"
            onButtonClick={handleCancel}
          />
        </ButtonEditContainer>
      );
    } else {
      return null;
    }
  };

  const renderWinBidButton = (
    winBid: null | number,
    ownerId: null | number,
  ) => {
    const userId = localStorage.getItem("userId");

    if (winBid !== null && userId !== null && ownerId === parseInt(userId)) {
      return (
        <ButtonBidContainer>
          <Button
            name="Make a bid"
            onButtonClick={() => setisClickedBurout(true)}
            disabled={isClickedBurout}
          />
          <Button
            name="Apply"
            background="#0A5F38"
            onButtonClick={() => setisClickedBurout(true)}
            disabled={isClickedBurout}
          />
          <Button
            type="button"
            background="#EE4266"
            name="Cancel"
            onButtonClick={handleCancel}
          />
        </ButtonBidContainer>
      );
    } else {
      return null;
    }
  };

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

  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    if (offerData?.endAt) {
      const targetDate = new Date(offerData.endAt).getTime();

      timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
          clearInterval(timerInterval);
          setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setTimeRemaining({ days, hours, minutes, seconds });
        }
      }, 1000);
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [offerData]);

  return (
    <OfferWrapper>
      <OfferUpWrapper>
        <OfferInfoContainer>
          <OfferTitleInfoContainer>
            <OfferTitleContainer>
              <Tile>{offerData?.title || ""}</Tile>
              {offerData?.isFree ? (
                <PriceContainer>Free</PriceContainer>
              ) : (
                <PriceContainer>
                  Current price: {offerData?.startPrice}
                  <FaEuroSign size={24} color="green" />
                </PriceContainer>
              )}
            </OfferTitleContainer>
            <OfferInfoOfferContainer>
              <OfferInfoImageContainer>
                <ImgContainer>
                  <Img />
                </ImgContainer>
              </OfferInfoImageContainer>
              <OfferInfoTextContainer>
                <OfferTextAreaWrapper>
                  <TextAreaWrapper>
                    {offerData?.description || ""}
                  </TextAreaWrapper>
                </OfferTextAreaWrapper>
                <OfferInfoWrapper>
                  <OfferInfoOfferWrapper>
                    <ContainerInfoCommon>
                      <ContainerInfo>
                        <FaUser />
                        Information
                      </ContainerInfo>
                      <ContainerInfo>
                        <BiCategory />
                        {offerData
                          ? getCategoryNameById(offerData.categoryId)
                          : ""}
                      </ContainerInfo>
                      <ContainerInfo>
                        <MdOutlineLocationCity />
                        {offerData
                          ? getLocationNameById(offerData.locationId)
                          : ""}
                      </ContainerInfo>
                      <ContainerInfo>
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
                              {gettypeOfferById(2)}
                            </Type02>
                          )
                        ) : (
                          ""
                        )}
                      </ContainerInfo>
                      {offerData && offerData.isFree && (
                        <ContainerInfoParticipant>
                          <FaUsers />? participants
                        </ContainerInfoParticipant>
                      )}
                    </ContainerInfoCommon>
                    {offerData && !offerData.isFree && (
                      <ContainerInfoNoFree>
                        <>
                          <ContainerInfo>
                            Start price: {offerData.startPrice}
                            <FaEuroSign size={18} color="#56119c" />
                          </ContainerInfo>
                          <ContainerInfo>
                            Step: {offerData.step}
                            <FaEuroSign size={18} color="#56119c" />
                          </ContainerInfo>
                          <ContainerInfo>
                            Last bid price: {offerData.step}
                            <FaEuroSign size={18} color="#56119c" />
                          </ContainerInfo>
                        </>
                      </ContainerInfoNoFree>
                    )}
                  </OfferInfoOfferWrapper>
                  <OfferInfoPriceWrapper>
                    <ContainerInfo>
                      Start: {formatDate(offerData?.endAt)}
                    </ContainerInfo>
                    <ContainerInfo>
                      End:{" "}
                      {offerData?.endAt
                        ? formatDate(offerData.endAt)
                        : "Unknown Date"}
                    </ContainerInfo>
                    <ContainerInfo>
                      Timer: {timeRemaining.days}d {timeRemaining.hours}h{" "}
                      {timeRemaining.minutes}m {timeRemaining.seconds}s
                    </ContainerInfo>
                    <ContainerInfo>Bids:</ContainerInfo>
                  </OfferInfoPriceWrapper>
                </OfferInfoWrapper>
              </OfferInfoTextContainer>
            </OfferInfoOfferContainer>
          </OfferTitleInfoContainer>
        </OfferInfoContainer>
        <OfferButtonWrapper>
          {renderBuyoutButton(
            offerData?.winBid ?? null,
            offerData?.ownerId ?? null,
          )}
          {renderWinBidButton(
            offerData?.winBid ?? null,
            offerData?.ownerId ?? null,
          )}
          {renderEditButton(offerData?.ownerId ?? null)}
        </OfferButtonWrapper>
      </OfferUpWrapper>
    </OfferWrapper>
  );
}

export default ViewOffer;
