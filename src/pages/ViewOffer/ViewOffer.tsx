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
import ModalWindow from "components/ModalWindow/ModalWindow";
import { WindowWrapper } from "components/OfferCard/style";
import { bidSliceDataActions } from "store/redux/bid/bidSlice";
import {
  bidsSliceDataActions,
  bidsSliceDataSelectors,
} from "store/redux/bids/bidsSlice";
import ModalWindowBids from "components/ModalWindowBids/ModalWindowBids";

import { defaultImage } from "../../assets/images/index.ts";

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
  BidsContainer,
  Image,
  BidsContainerOneBid,
} from "./styles";

function ViewOffer() {
  const navigate = useNavigate();
  const { offersId = "" } = useParams<{ offersId?: string }>();
  const [offerData, setOfferData] = useState<OfferData | null>(null);
  const [isClickedBurout, setisClickedBurout] = useState(false);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [pendingOfferId, setPendingOfferId] = useState<number | null>(null);
  const [pendingBidValue, setPendingBidValue] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModaWinnerlOpen, setIsModalWinnerOpen] = useState(false);
  const [selectedBidId, setSelectedBidId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  console.log(selectedUserId);

  const closeModalApply = () => setIsModalOpen(false);

  const closeModalWinnerApply = () => setIsModalWinnerOpen(false);

  const cancelBurnout = () => setConfirmModalOpen(false);

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
          {offerData !== null && isActiveAuction && (
            <Button
              name={`Buyout ${offerData.winBid} €`}
              onButtonClick={() => handleMakeABid(offerData?.winBid ?? 0)}
              disabled={isClickedBurout}
            />
          )}
        </ButtonWinBidContainer>
      );
    } else {
      return null;
    }
  };

  const isActiveBid = offerData?.status === "AUCTION_STARTED";

  const renderWinBidButton = (isFree: boolean, isOwner: boolean) => {
    if (!isOwner && !isFree) {
      const countValue = offerData?.maxBidValue ?? offerData?.startPrice ?? 0;
      const isFirst =
        offerData?.bidsCount === null && offerData?.bidsCount === 0;
      return (
        <ButtonBidContainer>
          {isActiveBid && (
            <MakeBid
              countValue={countValue}
              onMakeABid={handleMakeABid}
              isFirstBid={isFirst}
            />
          )}
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

  const handleMakeABid = (bidValue: number) => {
    console.log("Bid value:", bidValue);
    if (
      offerData?.winBid !== undefined &&
      offerData?.winBid !== null &&
      bidValue >= offerData?.winBid
    ) {
      openConfirmModal(offerData.id, bidValue);
    } else {
      const bidValueNum = bidValue !== null ? bidValue : 0;
      dispatch(
        bidSliceDataActions.addBid({
          offerId: offerData?.id ?? 0,
          bidValue: bidValueNum,
        }),
      )
        .then((response) => {
          console.log("BidCreate response:", response);
          setisClickedBurout(false);
          window.location.reload();
        })
        .catch((error) => {
          console.error("BidCreate error:", error);
        });
    }
  };

  const openConfirmModal = (offerId: number, bidValue: number | null) => {
    setPendingOfferId(offerId);
    setPendingBidValue(bidValue);
    setConfirmModalOpen(true);
  };

  const confirmBurnout = () => {
    if (pendingOfferId === null) return;

    const bidValueNum = pendingBidValue !== null ? pendingBidValue : 0;

    dispatch(
      bidSliceDataActions.addBid({
        offerId: pendingOfferId,
        bidValue: bidValueNum,
      }),
    )
      .then((response) => {
        console.log("BidCreate response:", response);
        setisClickedBurout(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("BidCreate error:", error);
      });

    setConfirmModalOpen(false);
  };

  const handleApplyFree = (offerId: number) => {
    const bidValueNum = 0;

    if (isParticipant) {
      openModalApply();
    } else {
      dispatch(bidSliceDataActions.addBid({ offerId, bidValue: bidValueNum }))
        .then((response) => {
          console.log("BidCreate response:", response);
          window.location.reload();
        })
        .catch((error) => {
          console.error("BidCreate error:", error);
        });
    }
  };

  const openModalApply = () => {
    setIsModalOpen(true);
  };

  const isActiveAuction = offerData?.status === "AUCTION_STARTED";
  const isParticipant = offerData?.isCurrentUserAuctionParticipant;
  const isWinner = offerData?.currentUser.isWinner;

  const renderFreeButton = (isFree: boolean, isOwner: boolean) => {
    if (isFree && !isOwner) {
      return (
        <ButtonFreeContainer>
          {isActiveAuction && (
            <ButtonContainer>
              <Button
                name="Apply"
                background={isParticipant ? "#999999" : "#0A5F38"}
                onButtonClick={() =>
                  offerData?.id && handleApplyFree(offerData.id)
                }
                disabled={isClickedBurout}
              />
            </ButtonContainer>
          )}
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

  const isActiveQualification = offerData?.status === "QUALIFICATION";

  const renderQualification = (isOwner: boolean) => {
    if (isOwner && isActiveQualification) {
      return (
        <ButtonFreeContainer>
          <ButtonContainer>
            <Button
              name="Choose winner"
              background="#0A5F38"
              onButtonClick={() => setIsModalWinnerOpen(true)}
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
                background="#0A5F38"
                name="Edit"
                onButtonClick={() => navigate(`/offers/edit/${offersId}`)}
                disabled={isClickedBurout}
              />
            </ButtonContainer>
          </>
        )}
        {isVisibleCancel && (
          <>
            <ButtonContainer>
              <Button
                background="#B00000"
                name="Cancel"
                onButtonClick={handleCancelled}
                disabled={isClickedBurout}
              />
            </ButtonContainer>
          </>
        )}
        {!isActiveQualification && (
          <ButtonContainer>
            <Button
              type="button"
              background="grey"
              name="Back"
              onButtonClick={handleCancel}
            />
          </ButtonContainer>
        )}
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

  const isVisibleEdit =
    offerData !== null &&
    (offerData.status === "DRAFT" || offerData?.status === "REJECTED");

  const isVisibleCancel =
    offerData !== null &&
    (offerData.status === "DRAFT" ||
      offerData?.status === "VERIFICATION" ||
      offerData?.status === "REJECTED" ||
      offerData?.status === "AUCTION_STARTED" ||
      offerData?.status === "QUALFICATION");

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

  const handleCancelled = () => {
    dispatch(offerDataSliceActions.cancelledOfferById(offersId))
      .then((response) => {
        console.log("rejectedOfferById response:", response);
        window.location.reload();
      })
      .catch((error) => {
        console.error("rejectedOfferById error:", error);
      });
    navigate(`/offers/${offersId}`);
  };

  const { bids } = useAppSelector(bidsSliceDataSelectors.bids);

  useEffect(() => {
    const offerIdNumber = Number(offersId);
    console.log(offerIdNumber);
    if (isNaN(offerIdNumber)) {
      console.error(`Invalid offerId: ${offersId}`);
      return; // Handle the error gracefully
    }

    dispatch(bidsSliceDataActions.getAllBid({ offerId: offerIdNumber }));
  }, [dispatch, offersId]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const setWinner = async (selectedUserId: number | null) => {
    if (selectedUserId !== null) {
      const offerId = offersId;
      const winnerBidId = selectedUserId;
      console.log(winnerBidId);
      try {
        const response = await dispatch(
          offerDataSliceActions.completedOfferById({
            offerId,
            winnerBidId,
          }),
        );
        console.log("SetWinner response:", response);
        setIsModalWinnerOpen(false);
        window.location.reload();
      } catch (error) {
        console.error("SetWinner error:", error);
      }
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const bidId = Number(event.target.value);
    setSelectedBidId(bidId);

    const selectedBid = bids.find((bid) => bid.id === bidId);
    console.log(selectedBid);
    if (selectedBid) {
      setSelectedUserId(selectedBid.userId);
      console.log(selectedUserId);
    }
  };

  const renderBids = () => {
    if (bids?.length === 0) {
      return <BidsContainer>No bids available</BidsContainer>;
    }

    return (
      <BidsContainer>
        {bids?.map((bid) => (
          <BidsContainerOneBid key={bid.id}>
            <input
              type="radio"
              id={`bid_${bid.id}`}
              name="bid"
              value={bid.id}
              checked={selectedBidId === bid.id}
              onChange={handleRadioChange}
            />
            <label htmlFor={`bid_${bid.id}`}>
              Bid by {bid.userNameShorted}
            </label>
            {!isFree && (
              <label htmlFor={`bid_${bid.id}`}>: {bid.bidValue} €</label>
            )}
            <p>E-mail: {bid.userEmail}</p>
          </BidsContainerOneBid>
        ))}
      </BidsContainer>
    );
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
                    Current price:{" "}
                    {offerData?.maxBidValue !== null
                      ? offerData?.maxBidValue
                      : offerData?.startPrice}
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
                  <Image
                    src={
                      offerData?.images?.values?.[
                        Object.keys(offerData?.images.values)[0]
                      ]?.["320x320"] || defaultImage
                    }
                  />
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
                          <FaUsers />
                          {offerData.bidsCount} participants
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
                            <ContainerInfoPrice>
                              Last bid price:{" "}
                              {offerData.maxBidValue !== null
                                ? offerData.maxBidValue
                                : offerData.startPrice}
                              <FaEuroSign size={18} color="#7b001c" />
                            </ContainerInfoPrice>
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
                      {isActiveAuction && (
                        <ContainerInfo>
                          Timer: {timeRemaining.days}d {timeRemaining.hours}h{" "}
                          {timeRemaining.minutes}m {timeRemaining.seconds}s
                        </ContainerInfo>
                      )}
                      {!offerData.isFree && (
                        <ContainerInfo>
                          Bids: {offerData.bidsCount}
                        </ContainerInfo>
                      )}
                      {offerData.status === "COMPLETED" && isOwner && (
                        <ContainerInfo>
                          Winner:{" "}
                          {offerData.winner.nameShorted !== null
                            ? offerData.winner.nameShorted
                            : "No winner"}
                        </ContainerInfo>
                      )}
                      {offerData.status === "COMPLETED" && isOwner && (
                        <ContainerInfo>
                          Winner e-mail:{" "}
                          {offerData.winner.email !== null
                            ? offerData.winner.email
                            : "No e-mail"}
                        </ContainerInfo>
                      )}
                      {offerData.status === "COMPLETED" &&
                        isParticipant &&
                        (isWinner ? (
                          <ContainerInfo>
                            You are winner with bid:{" "}
                            {offerData.winner.bidValue !== null
                              ? offerData.winner.bidValue
                              : " "}
                          </ContainerInfo>
                        ) : (
                          <>
                            <ContainerInfo>You are not winner.</ContainerInfo>
                            <ContainerInfo>
                              Winner bid:{" "}
                              {offerData.winner.bidValue !== null
                                ? offerData.winner.bidValue
                                : " "}
                            </ContainerInfo>
                            <ContainerInfo>
                              Your bid:{" "}
                              {offerData.currentUser.maxBidValue !== null
                                ? offerData.currentUser.maxBidValue
                                : " "}
                            </ContainerInfo>
                          </>
                        ))}
                      {offerData.status === "AUCTION_STARTED" &&
                      !isFree &&
                      isParticipant ? (
                        <>
                          <ContainerInfoPrice>
                            You are participant. Your last bid:{" "}
                            {offerData.currentUser.maxBidValue !== null
                              ? offerData.currentUser.maxBidValue
                              : " "}
                            <FaEuroSign size={18} color="#7b001c" />
                          </ContainerInfoPrice>
                        </>
                      ) : (
                        <></>
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
          {renderQualification(isOwner)}
        </OfferButtonWrapper>
        {confirmModalOpen && (
          <ModalWindow
            title="Confirm Action"
            onOk={confirmBurnout}
            onClose={cancelBurnout}
          >
            <WindowWrapper>
              You have set a buyout price for this offer. Upon confirmation, the
              offer will be considered purchased. Are you sure you want to
              proceed with this action?
            </WindowWrapper>
          </ModalWindow>
        )}
        {isModalOpen && (
          <ModalWindow
            title="Repeat bid"
            onOk={closeModalApply}
            onClose={closeModalApply}
          >
            <WindowWrapper>
              You have already placed a bid on this offer.
            </WindowWrapper>
          </ModalWindow>
        )}
        {isModaWinnerlOpen && (
          <ModalWindowBids
            title="Choose winner"
            onOk={() => {
              if (selectedBidId !== null) {
                setWinner(selectedBidId);
              }
              closeModalWinnerApply();
            }}
            onClose={closeModalWinnerApply}
          >
            <WindowWrapper>{renderBids()}</WindowWrapper>
          </ModalWindowBids>
        )}
      </OfferUpWrapper>
    </OfferWrapper>
  );
}

export default ViewOffer;
