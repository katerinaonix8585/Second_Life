import { Link, Outlet, useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button.tsx";

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
} from "./styles";

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <LayoutWrapper>
      <Header>
        <Container>
          <UpHeaderWrapper>
            <HeaderTitleContainer>
              <HeaderTitle>Admin</HeaderTitle>
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
      <Main>
        <Outlet />
      </Main>
    </LayoutWrapper>
  );
};

export default AdminLayout;
