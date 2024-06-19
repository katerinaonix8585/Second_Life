import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdOutlineAlternateEmail, MdOutlineLocationCity } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  userDataSliceActions,
  userDataSliceSelectors,
} from "store/redux/user/userSlice";
import ImageUpload from "components/ImageUpload/ImageUpload";
import Button from "components/Button/Button";

import {
  OfferUpWrapper,
  OfferWrapper,
  OfferButtonWrapper,
  OfferTitleContainer,
  Tile,
  OfferInfoImageContainer,
  ContainerInfo,
  ContainerInfoCommon,
  UserInfoContainer,
  OfferInfoOfferWrapper,
} from "./styles";

function PersonalInformation() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userDataSlice = useAppSelector(userDataSliceSelectors.user);
  const userData = userDataSlice.data;

  useEffect(() => {
    dispatch(userDataSliceActions.getUserData());
  }, [dispatch]);

  // const handleCancel = () => {
  //   navigate(-1);
  // };

  // const location = localStorage.getItem("selectedLocation");

  return (
    <OfferWrapper>
      <OfferUpWrapper>
        <OfferTitleContainer>
          <Tile>Personal Information</Tile>
        </OfferTitleContainer>
        <UserInfoContainer>
          <OfferInfoImageContainer>
            <ImageUpload />
          </OfferInfoImageContainer>
          <ContainerInfoCommon>
            <ContainerInfo>
              <FaUser />
              {userData.firstName + " " + userData.lastName}
            </ContainerInfo>
            <ContainerInfo>
              <MdOutlineAlternateEmail />
              {userData.email}
            </ContainerInfo>
            <ContainerInfo>
              <MdOutlineLocationCity />
              {userData.locationId}
            </ContainerInfo>
          </ContainerInfoCommon>
        </UserInfoContainer>
        <OfferInfoOfferWrapper>
          <OfferButtonWrapper>
            <Button
              type="button"
              background="grey"
              name="Back"
              onButtonClick={() => navigate(-1)}
            />
          </OfferButtonWrapper>
        </OfferInfoOfferWrapper>
      </OfferUpWrapper>
    </OfferWrapper>
  );
}

export default PersonalInformation;
