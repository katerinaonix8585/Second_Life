import styled from "@emotion/styled";

export const LoginPageWrapper = styled.div`
  display: flex;
  height: 100%;
  width: auto;
`;

export const SignInFormWrapper = styled.div`
  display: flex;
  width: 50%;
  background: linear-gradient(to right, #9796f0, #fde8ed);
  justify-content: right;
`;

export const SignUpFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 50%;
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
  gap: 60px;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const PartPageContainerLeft = styled.div`
  max-width: 635px;
  margin-right: 50px;
`;

export const PartPageContainerRight = styled.div`
  max-width: 635px;
  margin-left: 50px;
`;
