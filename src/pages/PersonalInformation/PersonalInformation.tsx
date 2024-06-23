import { useEffect, useState } from "react";
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
  Image as StyledImage, // Renamed to avoid conflict with HTML Image element
  OfferInfoImageContainer,
  ContainerInfo,
  ContainerInfoCommon,
  UserInfoContainer,
  OfferInfoOfferWrapper,
  ButtonWrapper,
} from "./styles";

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

function PersonalInformation() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [baseName, setBaseName] = useState<string | null>(null); // State for storing baseName of the image
  const [error, setError] = useState<string | undefined>(undefined); // State for handling errors
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  console.log(error);

  const userDataSlice = useAppSelector(userDataSliceSelectors.user);
  const userData = userDataSlice.data;

  useEffect(() => {
    dispatch(userDataSliceActions.getUserData());
  }, [dispatch]);

  const handleFileRemove = async () => {
    setStatus("loading");
    setError(undefined);

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("Access token not found");
      setStatus("error");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/v1/images`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ baseName }),
      });

      if (!response.ok) {
        const result = await response.json();
        console.error("Fetch error:", result);
        setError(result.message || "Error deleting image");
        setStatus("error");
      } else {
        console.log("Image deleted successfully");
        setBaseName(null); // Clear baseName on successful deletion
        setStatus("idle");
      }
    } catch (fetchError) {
      console.error("Network error:", fetchError);
      setError("Network error");
      setStatus("error");
    }
  };

  // Function to handle navigation back
  const handleBackButtonClick = () => {
    navigate("/");
  };

  return (
    <OfferWrapper>
      <OfferUpWrapper>
        <OfferTitleContainer>
          <Tile>Personal Information</Tile>
        </OfferTitleContainer>
        <UserInfoContainer>
          {userData &&
          userData.images &&
          Object.keys(userData.images.values).length > 0 ? (
            <>
              <OfferInfoImageContainer>
                <StyledImage
                  src={
                    userData.images.values[
                      Object.keys(userData.images.values)[0]
                    ]["320x320"]
                  }
                  alt="User Image"
                />
              </OfferInfoImageContainer>
              <ButtonWrapper>
                <Button
                  onButtonClick={handleFileRemove}
                  type="button"
                  name="Remove Image"
                  disabled={status === "loading"} // Disable button during loading state
                />
              </ButtonWrapper>
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
            </>
          ) : (
            <>
              <OfferInfoImageContainer>
                <ImageUpload
                  setBaseNamesOfImages={(baseNames) =>
                    setBaseName(baseNames[0])
                  }
                  entityType="user"
                  entityId={userData ? userData.id : undefined}
                />
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
            </>
          )}
        </UserInfoContainer>
        <OfferInfoOfferWrapper>
          <OfferButtonWrapper>
            <Button
              type="button"
              background="grey"
              name="Back"
              onButtonClick={handleBackButtonClick}
            />
          </OfferButtonWrapper>
        </OfferInfoOfferWrapper>
      </OfferUpWrapper>
    </OfferWrapper>
  );
}

export default PersonalInformation;
