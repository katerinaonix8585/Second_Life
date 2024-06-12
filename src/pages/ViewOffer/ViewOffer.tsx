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
import { OfferData } from "store/redux/offer/types";
import Button from "components/Button/Button";
import { userDataSliceActions } from "store/redux/user/userSlice";
import MakeBid from "components/MakeBid/MakeBid";

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
  ContainerInfoPrice,
  PriceStatusContainer,
  StatusContainer,
  ButtonContainer,
  ButtonFreeContainer,
  ButtonBidContainer,
  ButtonWinBidContainer,
} from "./styles";

function ViewOffer() {
  const navigate = useNavigate();
  const { offersId = "" } = useParams<{ offersId?: string }>();
  const [offerData, setOfferData] = useState<OfferData | null>(null);
  const [isClickedBurout, setisClickedBurout] = useState(false);

  const userId = localStorage.getItem("userId");

  const dispatch = useAppDispatch();

  const locationsDataSlice = useAppSelector(
    locationsDataSliceSelectors.location,
  );
  const locationsData = locationsDataSlice.data;

  const getLocationNameById = (id: number) => {
    const location = locationsData.find((loc) => loc.id === id);
    return location ? location.name : "Unknown Location";
  };

  const { data: categoriesData } = useAppSelector(
    categorysDataSliceSelectors.category,
  );

  const getCategoryNameById = (id: number) => {
    const category = categoriesData.find((cat) => cat.id === id);
    return category ? category.name : "Unknown Category";
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
    return typeOffer ? typeOffer.value : "Unknown Type";
  };

  useEffect(() => {
    dispatch(userDataSliceActions.getUserData());
  }, [dispatch]);

  const renderBuyoutButton = (
    isFree: boolean,
    isOwner: boolean,
    isBurnOut: boolean,
  ) => {
    if (!isFree && !isOwner && isBurnOut) {
      return (
        <ButtonWinBidContainer>
          {offerData !== null && (
            <Button
              name={`Buyout ${offerData.winBid} `}
              onButtonClick={() => setisClickedBurout(true)}
              disabled={isClickedBurout}
            />
          )}
        </ButtonWinBidContainer>
      );
    } else {
      return null;
    }
  };

  const renderWinBidButton = (isFree: boolean, isOwner: boolean) => {
    if (!isOwner && !isFree) {
      return (
        <ButtonBidContainer>
          <MakeBid countValue={offerData?.startPrice ?? 0} />
          <ButtonContainer>
            <Button
              name="Apply"
              background="#0A5F38"
              onButtonClick={() => setisClickedBurout(true)}
              disabled={isClickedBurout}
            />
          </ButtonContainer>
          <ButtonContainer>
            <Button
              type="button"
              background="grey"
              name="Back"
              onButtonClick={handleCancel}
            />
          </ButtonContainer>
        </ButtonBidContainer>
      );
    } else {
      return null;
    }
  };

  const renderFreeButton = (isFree: boolean, isOwner: boolean) => {
    if (isFree && !isOwner) {
      return (
        <ButtonFreeContainer>
          <ButtonContainer>
            <Button
              name="Apply"
              background="#0A5F38"
              onButtonClick={() => setisClickedBurout(true)}
              disabled={isClickedBurout}
            />
          </ButtonContainer>
          <ButtonContainer>
            <Button
              type="button"
              background="grey"
              name="Back"
              onButtonClick={handleCancel}
            />
          </ButtonContainer>
        </ButtonFreeContainer>
      );
    } else {
      return null;
    }
  };

  const renderEditButton = (isOwner: boolean, isVisibleEdit: boolean) => {
    if (!isOwner) {
      return null;
    }

    return (
      <ButtonEditContainer>
        {isVisibleEdit && (
          <>
            <ButtonContainer>
              <Button
                background="#B00000"
                name="Cancel"
                onButtonClick={handleCancelled}
                disabled={isClickedBurout}
              />
            </ButtonContainer>

            <ButtonContainer>
              <Button
                background="#0A5F38"
                name="Edit"
                onButtonClick={() => navigate(`/offers/edit/${offersId}`)}
                disabled={isClickedBurout}
              />
            </ButtonContainer>
          </>
        )}
        <ButtonContainer>
          <Button
            type="button"
            background="grey"
            name="Back"
            onButtonClick={handleCancel}
          />
        </ButtonContainer>
      </ButtonEditContainer>
    );
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

    if (offerData?.auctionEndAt) {
      const targetDate = new Date(offerData.auctionEndAt).getTime();

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

  const isOwner =
    userId !== null &&
    offerData !== null &&
    offerData.ownerId !== null &&
    offerData.ownerId === parseInt(userId);

  const isVisibleEdit = offerData !== null && offerData.status === "DRAFT";

  const isBurnOut = offerData !== null && offerData.winBid !== null;

  const isFree = offerData?.isFree !== undefined && offerData?.isFree;

  const isVisibleAuction =
    offerData !== null &&
    offerData.status !== "DRAFT" &&
    offerData.status !== "VERIFICATION" &&
    offerData.status !== "REJECTED" &&
    offerData.status !== "CANCELLED" &&
    offerData.status !== "BLOCKED BY ADMIN";

  const handleCancel = () => {
    navigate(-1);
  };

  // const handleRejected = () => {
  //   dispatch(offerDataSliceActions.rejectedOfferById(offersId))
  //     .then((response) => {
  //       console.log("rejectedOfferById response:", response);
  //     })
  //     .catch((error) => {
  //       console.error("rejectedOfferById error:", error);
  //     });
  //   navigate(`/offers/${offersId}`);
  // };

  const handleCancelled = () => {
    dispatch(offerDataSliceActions.cancelledOfferById(offersId))
      .then((response) => {
        console.log("rejectedOfferById response:", response);
      })
      .catch((error) => {
        console.error("rejectedOfferById error:", error);
      });
    navigate(`/offers/${offersId}`);
  };

  return (
    <OfferWrapper>
      <OfferUpWrapper>
        <OfferInfoContainer>
          <OfferTitleInfoContainer>
            <OfferTitleContainer>
              <Tile>{offerData?.title || ""}</Tile>
              {offerData?.isFree ? (
                <PriceStatusContainer>
                  <PriceContainer>Free</PriceContainer>
                  <StatusContainer>
                    Status: {offerData?.status || ""}
                  </StatusContainer>
                </PriceStatusContainer>
              ) : (
                <PriceStatusContainer>
                  <PriceContainer>
                    Current price: {offerData?.startPrice}
                    <FaEuroSign size={24} color="green" />
                  </PriceContainer>
                  <StatusContainer>
                    Status: {offerData?.status || ""}
                  </StatusContainer>
                </PriceStatusContainer>
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
                        {offerData?.ownerFullName}
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
                      {offerData && offerData.isFree && isVisibleAuction && (
                        <ContainerInfoParticipant>
                          <FaUsers />? participants
                        </ContainerInfoParticipant>
                      )}
                    </ContainerInfoCommon>
                    {offerData && !offerData.isFree && (
                      <ContainerInfoNoFree>
                        <>
                          <ContainerInfoPrice>
                            Start price: {offerData.startPrice}
                            <FaEuroSign size={18} color="#7b001c" />
                          </ContainerInfoPrice>
                          {isVisibleAuction && (
                            <>
                              <ContainerInfoPrice>
                                Last bid price: {offerData.startPrice}
                                <FaEuroSign size={18} color="#7b001c" />
                              </ContainerInfoPrice>
                            </>
                          )}
                        </>
                      </ContainerInfoNoFree>
                    )}
                  </OfferInfoOfferWrapper>
                  {isVisibleAuction && (
                    <OfferInfoPriceWrapper>
                      <ContainerInfo>
                        Start: {formatDate(offerData?.auctionStartAt)}
                      </ContainerInfo>
                      <ContainerInfo>
                        End:{" "}
                        {offerData?.auctionEndAt
                          ? formatDate(offerData.auctionEndAt)
                          : "Unknown Date"}
                      </ContainerInfo>
                      <ContainerInfo>
                        Timer: {timeRemaining.days}d {timeRemaining.hours}h{" "}
                        {timeRemaining.minutes}m {timeRemaining.seconds}s
                      </ContainerInfo>
                      {!offerData.isFree && (
                        <ContainerInfo>Bids:</ContainerInfo>
                      )}
                    </OfferInfoPriceWrapper>
                  )}
                </OfferInfoWrapper>
              </OfferInfoTextContainer>
            </OfferInfoOfferContainer>
          </OfferTitleInfoContainer>
        </OfferInfoContainer>
        <OfferButtonWrapper>
          {renderBuyoutButton(isFree, isOwner, isBurnOut)}
          {renderWinBidButton(isFree, isOwner)}
          {renderFreeButton(isFree, isOwner)}
          {renderEditButton(isOwner, isVisibleEdit)}
        </OfferButtonWrapper>
      </OfferUpWrapper>
    </OfferWrapper>
  );
}

export default ViewOffer;
