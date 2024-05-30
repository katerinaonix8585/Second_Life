import styled from "@emotion/styled";

export const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: auto;
`;

export const ButtonWrapper = styled.div`
  width: 200px;
  padding: 0 0 10px 0;
`;

export const WithoutImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  border-radius: 20px;
  border: 2px solid black;
  background-color: #dcdcdc30;
`;

export const IconWithoutImageWrapper = styled.div`
  width: 40px;
  height: 40px;
`;

export const ImageContainer = styled.div``;

export const Image = styled.img`
  margin-top: 10px;
  width: 300px;
  height: 300px;
  border-radius: 20px;
`;
