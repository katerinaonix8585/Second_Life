import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import Select from "components/Select/Select";
import { SelectDataProps } from "components/Select/types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  locationsDataSliceActions,
  locationsDataSliceSelectors,
} from "store/redux/location/locationSlice";
import {
  categorysDataSliceActions,
  categorysDataSliceSelectors,
} from "store/redux/category/categorySlice";
import DropDownMenu from "components/DropDownMenu/DropDownMenu";
import { typeOfferData } from "pages/CreateOffer/OffersData";

import {
  LayoutWrapper,
  Container,
  Header,
  HeaderTitleContainer,
  NavContainer,
  Main,
  StyledNavLink,
  HeaderTitle,
  HeaderLogoContainer,
  HeaderLogo,
  IconsContainer,
  HeaderUserContainer,
  HeaderUser,
  HeaderLoginContainer,
  HeaderLogin,
  UpHeaderWrapper,
  DownWrapper,
  Footer,
  InfoContainer,
  InfoContainerText,
  InfoContainerWrapper,
  MailContainer,
  MailContainerText,
  SearchInput,
  SearchWrapper,
  SearchButton,
  FooterWrapper,
  LogoutButton,
  SearchSelectContainer,
  SelectWrapper,
} from "./styles";
import { LocationData } from "./types";

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken"),
  );
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string>(() => {
    const savedLocation = localStorage.getItem("selectedLocation");
    return savedLocation || "";
  });

  const { data: locationsData } = useAppSelector(
    locationsDataSliceSelectors.location,
  );
  const { data: catigoriesData } = useAppSelector(
    categorysDataSliceSelectors.category,
  );
  console.log(catigoriesData);

  useEffect(() => {
    dispatch(locationsDataSliceActions.getLocation());
  }, [dispatch]);

  useEffect(() => {
    dispatch(categorysDataSliceActions.getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (selectedLocation === "" && locationsData.length > 0) {
      setSelectedLocation(locationsData[0].name);
    }
  }, [selectedLocation, locationsData]);

  useEffect(() => {
    const handleTokenUpdate = () => {
      setAccessToken(localStorage.getItem("accessToken"));
      setLoading(false);
    };

    window.addEventListener("tokenUpdated", handleTokenUpdate);
    handleTokenUpdate();

    return () => {
      window.removeEventListener("tokenUpdated", handleTokenUpdate);
    };
  }, []);

  const locationOptions: SelectDataProps<string>[] = locationsData
    .map((location: LocationData) => ({
      selectData: {
        index: location.id,
        value: location.name,
      },
    }))
    .concat({
      selectData: {
        index: 0,
        value: "All Germany",
      },
    })
    .sort((a, b) => (a.selectData.index < b.selectData.index ? -1 : 1));

  const goToHomePage = () => navigate("/");

  const handleLogout = async () => {
    try {
      await sendLogoutRequest();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setAccessToken(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const sendLogoutRequest = async () => {
    try {
      const response = await fetch(`${BASE_URL}/v1/user/logout`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error as Error);
    }
  };

  const handleLocationChange = (selectedValue: string | undefined) => {
    setSelectedLocation(selectedValue as string);
    console.log("Selected location:", selectedValue);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LayoutWrapper>
      <Header>
        <Container>
          <UpHeaderWrapper>
            <HeaderTitleContainer onClick={goToHomePage}>
              <HeaderLogoContainer>
                <HeaderLogo />
              </HeaderLogoContainer>
              <HeaderTitle>SECOND LIFE</HeaderTitle>
            </HeaderTitleContainer>
            <SearchSelectContainer>
              <SearchWrapper>
                <SearchInput placeholder="Search..." />
                <SearchButton>
                  <FaSearch />
                </SearchButton>
              </SearchWrapper>
              <SelectWrapper>
                <Select
                  name="location"
                  options={locationOptions}
                  onChange={handleLocationChange}
                  value={selectedLocation}
                  borderRadius="25px"
                  height="40px"
                  isSelectOpen={false}
                />
              </SelectWrapper>
            </SearchSelectContainer>

            <IconsContainer>
              <HeaderUserContainer isActive={!!accessToken}>
                {accessToken && <HeaderUser />}
              </HeaderUserContainer>
              {accessToken ? (
                <HeaderLoginContainer>
                  <LogoutButton onClick={handleLogout}>
                    <HeaderLogin />
                  </LogoutButton>
                </HeaderLoginContainer>
              ) : (
                <Link to="/auth/user/login" style={{ textDecoration: "none" }}>
                  <HeaderLoginContainer>
                    <HeaderLogin />
                  </HeaderLoginContainer>
                </Link>
              )}
            </IconsContainer>
          </UpHeaderWrapper>
        </Container>
        <DownWrapper>
          <Container>
            <NavContainer>
              <StyledNavLink
                style={({ isActive }) => ({
                  textDecoration: isActive ? "underline" : "none",
                })}
                to="/"
              >
                Home
              </StyledNavLink>

              {/* <StyledNavLink
                style={({ isActive }) => ({
                  textDecoration: isActive ? "underline" : "none",
                })}
                to="/category"
              >
                Category
              </StyledNavLink> */}
              <DropDownMenu
                items={catigoriesData.map((category) => ({
                  id: category.id,
                  value: category.name,
                  to: `/category/id=${category.id}`,
                }))}
                label={"Category"}
                link={"/category"}
              />

              <DropDownMenu
                items={typeOfferData.map((typeOffer) => ({
                  id: typeOffer.id,
                  value: typeOffer.value,
                  to: `/offers/all/id=${typeOffer.id}`,
                }))}
                label={"Offers"}
                link={"/offers/all"}
              />

              {/* <StyledNavLink
                style={({ isActive }) => ({
                  textDecoration: isActive ? "underline" : "none",
                })}
                to="/offers/all"
              >
                Offers
              </StyledNavLink> */}

              <StyledNavLink
                style={({ isActive }) => ({
                  textDecoration: isActive ? "underline" : "none",
                })}
                to="/aboutUs"
              >
                About us
              </StyledNavLink>
            </NavContainer>
          </Container>
        </DownWrapper>
      </Header>
      <Main>
        <Outlet /> {/* Render child routes here */}
      </Main>

      <Footer>
        <Container>
          <FooterWrapper>
            <InfoContainerWrapper>
              <InfoContainer>
                <InfoContainerText>
                  Give a second life to your belongings with SecondLife - your
                  best partner in buying and selling quality goods!
                </InfoContainerText>
              </InfoContainer>
            </InfoContainerWrapper>
            <InfoContainerWrapper>
              <MailContainer>
                <MailContainerText>+3 333-333-333</MailContainerText>
              </MailContainer>
              <MailContainer>
                <MailContainerText>example@gmail.com</MailContainerText>
              </MailContainer>
            </InfoContainerWrapper>
          </FooterWrapper>
        </Container>
      </Footer>
    </LayoutWrapper>
  );
};

export default Layout;
