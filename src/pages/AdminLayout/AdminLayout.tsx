import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

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
} from "./styles";

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
  };
  const { pathname } = useLocation();

  const isVisible = pathname !== "/admin/auth/admin/login";

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
              <Link
                to="/admin/auth/admin/login"
                style={{ textDecoration: "none" }}
              >
                <HeaderLoginContainer>
                  <HeaderLogin />
                </HeaderLoginContainer>
              </Link>
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
