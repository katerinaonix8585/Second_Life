import styled from "@emotion/styled";

export const LoginFormComponent = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 45px;
  width: 590px;
  height: 100%;
  padding: 60px;
`;

export const LoginFormName = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: #56119c;
  font-family: "LibreFranklin", sans-serif;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
`;
