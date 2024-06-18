import { useEffect, useState } from "react";
import { MdOutlineCalendarMonth, MdOutlineLocationCity } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FiType } from "react-icons/fi";
import { FaEuroSign } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GrStatusInfo } from "react-icons/gr";

import { Container } from "pages/Layout/styles";

import { OfferData } from "../../store/redux/offer/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { locationsDataSliceSelectors } from "../../store/redux/location/locationSlice";
import { categorysDataSliceSelectors } from "../../store/redux/category/categorySlice";
import { typeOfferData } from "../../pages/CreateOffer/OffersData";
import { offerDataSliceActions } from "../../store/redux/offer/offer";
import ModalWindow from "../ModalWindow/ModalWindow";
import { bidSliceDataActions } from "../../store/redux/bid/bidSlice";
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
  Category,
  Type00,
  Type01,
  Type02,
  PriceContainer,
  ButtonWrapper,
  LabelContainer,
  TextContainer,
  Status,
  WindowWrapper,
} from "./style";

interface Props {
  offers: OfferData[];
}

const OfferCardCopy: React.FC<Props> = ({ offers }) => {
  // Данные для проверки, является ли текущий пользователь собственником оффера
  const userId = localStorage.getItem("userId");
  // Данные для проверки, является ли текущий пользователь авторизованным
  const accessToken = localStorage.getItem("accessToken");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  // const [isBurnout, setBurnOut] = useState(true);
  // const [isApply, setApply] = useState(true);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [pendingOfferId, setPendingOfferId] = useState<number | null>(null);
  const [pendingBidValue, setPendingBidValue] = useState<number | null>(null);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const closeModalOk = () => {
    setModalVisible(false);
    navigate("/auth/user/login");
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
    return category ? category.name : "Unknown Category";
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
    return typeOffer ? typeOffer.value : "Unknown Type";
  };

  const handleCancelled = (offerId: number) => {
    if (!accessToken) {
      openModal();
      return;
    }

    dispatch(offerDataSliceActions.cancelledOfferById(String(offerId)))
      .then((response) => {
        console.log("cancelledOfferById response:", response);
      })
      .catch((error) => {
        console.error("cancelledOfferById error:", error);
      });
  };

  const openConfirmModal = (offerId: number, bidValue: number | null) => {
    setPendingOfferId(offerId);
    setPendingBidValue(bidValue);
    setConfirmModalOpen(true);
  };

  const handleBurnout = (offerId: number, bidValue: number | null) => {
    if (!accessToken) {
      openModal();
      return;
    }

    openConfirmModal(offerId, bidValue);
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
        // setBurnOut(false);
      })
      .catch((error) => {
        console.error("BidCreate error:", error);
      });

    setConfirmModalOpen(false);
  };

  const cancelBurnout = () => {
    setConfirmModalOpen(false);
  };

  const handleApplyFree = (offerId: number) => {
    if (!accessToken) {
      openModal();
      return;
    }

    const bidValueNum = 0;

    dispatch(bidSliceDataActions.addBid({ offerId, bidValue: bidValueNum }))
      .then((response) => {
        console.log("BidCreate response:", response);
        // setApply(false);
      })
      .catch((error) => {
        console.error("BidCreate error:", error);
      });
  };

  const handleApply = (offerId: number) => {
    if (!accessToken) {
      openModal();
      return;
    }
    navigate(`/offers/${offerId}`);
  };

  useEffect(() => {
    console.log("Offers updated:", offers);
  }, [offers]);

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
                to={accessToken ? `/offers/${offer.id}` : "#"}
                onClick={(e) => {
                  if (!accessToken) {
                    e.preventDefault();
                    openModal();
                  }
                }}
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
                    {offer.winBid === null ? offer.startPrice : offer.winBid}
                    <FaEuroSign size={24} color="green" />
                  </PriceContainer>
                </LabelContainer>
              )}
              {userId !== null &&
              offer.ownerId !== null &&
              offer.ownerId === parseInt(userId) &&
              (offer.status === "DRAFT" ||
                offer.status === "REJECTED" ||
                offer.status === "VERIFICATION" ||
                offer.status === "AUCTION_STARTED" ||
                offer.status === "QUALIFICATION") ? (
                <>
                  <ButtonContainer>
                    <Button
                      name="Cancel"
                      onButtonClick={() => handleCancelled(offer.id)}
                      background="#960018"
                    />
                  </ButtonContainer>
                </>
              ) : (
                <></>
              )}
              {userId !== null &&
              offer.ownerId !== null &&
              offer.ownerId !== parseInt(userId) &&
              offer.status === "AUCTION_STARTED" ? (
                <>
                  <ButtonContainer>
                    <Button
                      name="Apply"
                      // background={isApply ? "#0A5F38" : "#999"}
                      background="#0A5F38"
                      onButtonClick={() =>
                        offer.isFree
                          ? handleApplyFree(offer.id)
                          : handleApply(offer.id)
                      }
                    />
                  </ButtonContainer>
                </>
              ) : (
                <></>
              )}
              {userId !== null &&
              offer.ownerId !== null &&
              offer.ownerId !== parseInt(userId) &&
              offer.status === "AUCTION_STARTED" &&
              offer.winBid !== null ? (
                <>
                  <ButtonContainer>
                    <Button
                      // background={isBurnout ? "#960018" : "#999999"}
                      background="#960018"
                      name={
                        <>
                          <p>Buyout</p>
                          <p>{offer.winBid} €</p>
                        </>
                      }
                      onButtonClick={() =>
                        handleBurnout(offer.id, offer.winBid)
                      }
                    />
                  </ButtonContainer>
                </>
              ) : (
                <></>
              )}
            </ButtonWrapper>
          </OfferCardContainer>
        </Container>
      ))}
      {confirmModalOpen && (
        <ModalWindow
          title="Confirm Action"
          onOk={confirmBurnout}
          onClose={cancelBurnout}
        >
          <WindowWrapper>
            You have set a buyout price for this offer. Upon confirmation, the
            offer will be considered purchased. Are you sure you want to proceed
            with this action?
          </WindowWrapper>
        </ModalWindow>
      )}
      {modalVisible && (
        <ModalWindow
          title="Access Denied"
          onOk={closeModalOk}
          onClose={closeModal}
        >
          <WindowWrapper>
            You need to be logged in to perform this action
          </WindowWrapper>
        </ModalWindow>
      )}
    </OfferCardWrapper>
  );
};

export default OfferCardCopy;
