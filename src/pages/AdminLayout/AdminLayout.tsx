import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  locationsDataSliceActions,
  locationsDataSliceSelectors,
} from "store/redux/location/locationSlice.ts";
import { useAppDispatch, useAppSelector } from "store/hooks.ts";
import {
  categorysDataSliceActions,
  categorysDataSliceSelectors,
} from "store/redux/category/categorySlice.ts";
import {
  rejectDataSliceActions,
  rejectDataSliceSelectors,
} from "store/redux/reject/rejectSlice.ts";

import Button from "../../components/Button/Button.tsx";
import { SideBarContainer } from "../AdminHomePage/style.ts";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";

import {
  LayoutWrapper,
  Container,
  Header,
  HeaderTitleContainer,
  Main,
  HeaderTitle,
  IconsContainer,
  HeaderLoginContainer,
  HeaderLogin,
  UpHeaderWrapper,
  ButtonContainer,
  MainContainer,
  LogoutButton,
} from "./styles";

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessAdminToken"),
  );
  const [loading, setLoading] = useState(true);

  const goToHomePage = () => {
    navigate("/");
  };

  const { data: locationsData } = useAppSelector(
    locationsDataSliceSelectors.location,
  );
  const { data: catigoriesData } = useAppSelector(
    categorysDataSliceSelectors.category,
  );
  const { rejects: rejectData } = useAppSelector(
    rejectDataSliceSelectors.reject,
  );

  console.log(locationsData);
  console.log(catigoriesData);
  console.log(rejectData);

  useEffect(() => {
    dispatch(locationsDataSliceActions.getLocation());
  }, [dispatch]);

  useEffect(() => {
    dispatch(categorysDataSliceActions.getCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(rejectDataSliceActions.getReject());
  }, [dispatch]);

  const isVisible = pathname !== "/admin/auth/admin/login";

  const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

  const handleLogout = async () => {
    console.log("Logout initiated");
    try {
      await sendLogoutRequest();
      localStorage.removeItem("accessAdminToken");
      localStorage.removeItem("refreshAdminToken");
      localStorage.removeItem("adminId");
      setAccessToken(null);
      navigate("auth/admin/login");
      console.log("Logout successful");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const sendLogoutRequest = async () => {
    try {
      const response = await fetch(`${BASE_URL}/v1/auth/admin/logout`, {
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

  useEffect(() => {
    const handleTokenUpdate = () => {
      setAccessToken(localStorage.getItem("accessAdminToken"));
    };

    window.addEventListener("tokenUpdated", handleTokenUpdate);
    handleTokenUpdate();
    setLoading(false);

    return () => {
      window.removeEventListener("tokenUpdated", handleTokenUpdate);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LayoutWrapper>
      <Header>
        <Container>
          <UpHeaderWrapper>
            <HeaderTitleContainer>
              <HeaderTitle>Second Life. Administrator panel.</HeaderTitle>
            </HeaderTitleContainer>
            <IconsContainer>
              <ButtonContainer>
                <Button
                  name="Visit website"
                  onButtonClick={goToHomePage}
                  isAdminButton={true}
                />
              </ButtonContainer>
              {accessToken ? (
                <HeaderLoginContainer>
                  <LogoutButton onClick={handleLogout}>
                    <HeaderLogin />
                  </LogoutButton>
                </HeaderLoginContainer>
              ) : (
                <Link to="auth/admin/login" style={{ textDecoration: "none" }}>
                  <HeaderLoginContainer>
                    <HeaderLogin />
                  </HeaderLoginContainer>
                </Link>
              )}
            </IconsContainer>
          </UpHeaderWrapper>
        </Container>
      </Header>
      <MainContainer>
        {isVisible && (
          <SideBarContainer>
            <Sidebar />
          </SideBarContainer>
        )}
        <Main>
          <Outlet />
        </Main>
      </MainContainer>
    </LayoutWrapper>
  );
};

export default AdminLayout;
