import styled from "@emotion/styled";

export const LoginPageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 0 40px 0;
`;

export const SignInFormWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #9796f0, #fde8ed);
`;

export const SignUpFormWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
`;

export const SignUpFormName = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: #ee4266;
  font-family: "LibreFranklin", sans-serif;
`;

export const SignUpTextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;

export const SignUpText = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  font-family: "Chivo", sans-serif;
  font-style: italic;
  color: #4d418b;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
`;

export const PartPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
