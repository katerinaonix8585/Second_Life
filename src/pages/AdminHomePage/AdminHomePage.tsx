import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { HomeContainer, HomeWrapper, TW, Title } from "./style.ts";

function AdminHomePage() {
  const navigate = useNavigate();
  const accessAdminToken = localStorage.getItem("accessAdminToken");

  useEffect(() => {
    if (!accessAdminToken) {
      navigate("auth/admin/login");
    }
  }, [accessAdminToken, navigate]);

  return (
    <HomeWrapper>
      <HomeContainer>
        <Title>Welcome to the Administrator Portal!</Title>
        <TW>
          Manage your system with ease and efficiency. Access powerful tools
          designed to streamline operations and enhance productivity. Whether
          you're overseeing user management, analyzing data, or optimizing
          workflows, our platform provides the tools you need to succeed. Dive
          into a seamless administrative experience tailored to meet your
          organization's unique needs. Begin your journey towards operational
          excellence today.
        </TW>
      </HomeContainer>
    </HomeWrapper>
  );
}

export default AdminHomePage;
