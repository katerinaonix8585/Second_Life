import styled from "@emotion/styled";

export const CardWrapper = styled.div`
  background-color: gainsboro;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: bold;
`;

export const CardTextContainer = styled.p`
  font-size: 18px;
  font-weight: bold;
  font-family: 'LibreFranklin', sans-serif;
`;

export const CardImageContainer = styled.div`
  width: 300px;
  height: 300px; 
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
`;


