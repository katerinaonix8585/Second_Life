import React from "react";
import { Outlet } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Select from "components/Select/Select";
import { SelectDataProps } from "components/Select/types";

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

  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken"),
  );
  const [selectedLocation, setSelectedLocation] = useState<string>(() => {
    const savedLocation = localStorage.getItem("selectedLocation");
    return savedLocation || locationsData[1].name;
  });

  const [locationsData, setLocationsData] = useState<LocationData[]>([]);

  useEffect(() => {
    const handleTokenUpdate = () => {
      setAccessToken(localStorage.getItem("accessToken"));
      window.location.reload();
    };

    window.addEventListener("tokenUpdated", handleTokenUpdate);

    return () => {
      window.removeEventListener("tokenUpdated", handleTokenUpdate);
    };
  }, []);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch(`${BASE_URL}/v1/locations`);
      const data = await response.json();
      setLocationsData(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    if (!selectedLocation) {
      setSelectedLocation(locationsData[0].name);
    } else {
      localStorage.setItem("selectedLocation", selectedLocation);
    }
  }, [selectedLocation]);

  const locationOptions: SelectDataProps<string>[] = locationsData
    .map((location) => ({
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
    .sort((a, b) => {
      if (a.selectData.index < b.selectData.index) {
        return -1;
      }
      if (a.selectData.index > b.selectData.index) {
        return 1;
      }
      return 0;
    });

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

              <StyledNavLink
                style={({ isActive }) => ({
                  textDecoration: isActive ? "underline" : "none",
                })}
                to="/category"
              >
                Category
              </StyledNavLink>

              <StyledNavLink
                style={({ isActive }) => ({
                  textDecoration: isActive ? "underline" : "none",
                })}
                to="/offers/all"
              >
                Offers
              </StyledNavLink>

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
